import Loading from '@/components/Loading'
import Show from '@/components/Show'
import endPoints from '@/constants/apiEndpoints'
import HTTPMethods from '@/constants/httpMethods'
import { AppContext } from '@/context/appStateProvider'
import useFetchRealtime from '@/hooks/useFetchRealtime'
import { DocDetails } from '@/types/Types'
import withAuth from '@/utils/withAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import moment from 'moment'
import { NextPage } from 'next'
import { ChangeEvent, Fragment, useContext } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { toast } from 'react-hot-toast'

const IcelakeHomePage: NextPage = () => {
    const [{ userState }] = useContext(AppContext)
    const queryClient = useQueryClient()
    const documentList = useFetchRealtime('list-docs', endPoints.icelakeGetAllDocEndpoint, HTTPMethods.POST)

    const documentsToDisplay = documentList?.data?.documents?.map((doc: any) => {
        return (
            <tr key={doc._id}>
                <td><i className='fa-solid fa-folder'></i> {doc.title}</td>
                <td>{moment(doc.createdAt).format('MMM, Do YYYY, h:mm a')}</td>
                <td><i className="fa-solid fa-circle-arrow-down" onClick={() => saveDocument(doc._id)}></i></td>
                <td><i className='fa-solid fa-archive' onClick={() => archiveItemMutation.mutate(doc._id)}></i></td>
            </tr>
        )
    })

    const readFile = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            e.preventDefault()
            const files = e.target.files
            const fileCount = files?.length || 0

            for (let index = 0; index < fileCount; index++) {
                const file = files && files[index]

                if (file && file.size < 1000000) {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)

                    reader.onload = () => {
                        const content = reader.result?.toString() || ''
                        const title = file.name
                        const apiKey = userState.apiKey
                        const docDetails: DocDetails = { title, content, apiKey }
                        uploadFileMutation.mutate(docDetails)
                    }

                    reader.onerror = () => {
                        toast.error('File Size Too Large')
                    }
                }

                else {
                    toast.error('File Size Too Large')
                }
            }
        }

        catch (error) {
            toast.error('File Size Too Large')
        }
    }

    const uploadFile = async (docDetails: DocDetails) => {
        try {
            const { title, content, apiKey } = docDetails
            await axios.post(endPoints.icelakeCreateDocEndpoint, { title, content, apiKey })
            toast.success('Document Uploaded')
        }

        catch (error: any) {
            if (error.response && error.response.data.msg) {
                toast.error(error.response.data.msg)
            }

            else {
                toast.error('Unknown error, please try again')
            }
        }
    }

    const archiveFile = async (docId: string) => {
        try {
            await axios.delete(`${endPoints.icelakeArchiveDocEndpoint}/${docId}`)
            toast.success('Document Archived')
        }

        catch (error: any) {
            toast.error('Unable to archive the document')
        }
    }

    const saveDocument = async (docId: string) => {
        try {
            const response = await axios.post(`${endPoints.icelakeSaveDocEndpoint}/${docId}`)
            const element = document.createElement('a')
            const url = response.data.document.content
            fetch(url).then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], 'File name')
                    element.href = URL.createObjectURL(file)
                    element.download = response.data.document.title
                    document.body.appendChild(element)
                    element.click()
                })
        }

        catch (error) {
            toast.error('Unknon Error')
        }
    }

    const archiveItemMutation = useMutation(archiveFile, {
        onSuccess: () => {
            queryClient.invalidateQueries()
        },
    })

    const uploadFileMutation = useMutation(uploadFile, {
        onSuccess: () => {
            queryClient.invalidateQueries()
        },
    })

    return (
        <Fragment>
            <Show when={!documentList.isLoading}>
                <Container>
                    <div className='mb-3'>
                        <label htmlFor="file-upload" className="file-button">Upload<i className='fa-solid fa-circle-arrow-up'></i></label>
                        <input id="file-upload" className="file-input" type="file" multiple onChange={readFile} />
                    </div>
                    <Show when={documentList?.data?.documents?.length > 0}>
                        <Button className='tag-chip'>My Documents</Button>
                        <Table responsive hover variant='dark'>
                            <thead>
                                <tr>
                                    <th>Doc Name</th>
                                    <th>Created At</th>
                                    <th>Save Doc</th>
                                    <th>Archive</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documentsToDisplay}
                            </tbody>
                        </Table>
                    </Show>
                    <Show when={documentList?.data?.documents?.length === 0}>
                        <div className='box'>
                            <p className='branding'>Documents <i className='fa-solid fa-folder'></i></p>
                            <p className='lead'>No Docs to display</p>
                        </div>
                    </Show>
                </Container>
            </Show>
            <Show when={documentList.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default withAuth(IcelakeHomePage)
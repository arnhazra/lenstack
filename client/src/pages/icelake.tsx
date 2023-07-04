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
import { ChangeEvent, Fragment, useContext, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { toast } from 'react-hot-toast'

const IcelakeHomePage: NextPage = () => {
    const [{ userState }] = useContext(AppContext)
    const queryClient = useQueryClient()
    const documentList = useFetchRealtime('list-docs', endPoints.icelakeGetAllDocEndpoint, HTTPMethods.POST)

    const documentsToDisplay = documentList?.data?.documents?.map((doc: any) => {
        return (
            <tr key={doc._id}>
                <td>{doc.title}</td>
                <td>{moment(doc.date).format('MMM, Do YYYY, h:mm a')}</td>
                <td onClick={() => saveDocument(doc._id)}>Save</td>
                <td><i className='fa-solid fa-trash' onClick={() => deleteItemMutation.mutate(doc._id)}></i></td>
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

    let uploadFile = async (docDetails: DocDetails) => {
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

    const deleteFile = async (docId: string) => {
        try {
            await axios.delete(`${endPoints.icelakeDeleteDocEndpoint}/${docId}`)
            toast.success('Document Deleted')
        }

        catch (error: any) {
            toast.error('Unable to delete the document')
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

    const deleteItemMutation = useMutation(deleteFile, {
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
                    <div className='jumbotron ps-4 pt-4 pb-2'>
                        <h4>Upload & access your documents from here</h4>
                        <Row>
                            <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                                <Form.Group controlId='formFileLg' className='mb-3'>
                                    <Form.Control type='file' size='lg' onChange={readFile} multiple />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <Show when={documentList?.data?.documents?.length > 0}>
                        <p className='lead text-center text-white'>My Documents</p>
                        <Table responsive hover variant='light'>
                            <thead>
                                <tr>
                                    <th>Doc Name</th>
                                    <th>Last Modified Date</th>
                                    <th>Save Doc</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documentsToDisplay}
                            </tbody>
                        </Table>
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
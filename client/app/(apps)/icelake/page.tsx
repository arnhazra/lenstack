"use client"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import { AppContext } from "@/_context/appStateProvider"
import useFetchRealtime from "@/_hooks/useFetchRealtime"
import { DocDetails } from "@/_types/Types"
import withAuth from "@/_utils/withAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import moment from "moment"
import { ChangeEvent, Fragment, useContext } from "react"
import { Container, Table } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { FileTextIcon, DownloadIcon, ArchiveIcon, UploadIcon } from "@radix-ui/react-icons"
import useConfirm from "@/_hooks/useConfirm"

function Page() {
    const [{ userState }] = useContext(AppContext)
    const queryClient = useQueryClient()
    const { confirm, confirmDialog } = useConfirm()
    const documentList = useFetchRealtime("list-docs", endPoints.icelakeGetAllDocEndpoint, HTTPMethods.POST)

    const documentsToDisplay = documentList?.data?.documents?.map((doc: any) => {
        return (
            <tr key={doc._id}>
                <td><FileTextIcon className="icon-left" /> {doc.title}</td>
                <td>{moment(doc.createdAt).format("MMM, Do YYYY, h:mm a")}</td>
                <td><DownloadIcon onClick={() => saveDocument(doc._id)} /></td>
                <td><ArchiveIcon onClick={() => archiveItemMutation.mutate(doc._id)} /></td>
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
                        const content = reader.result?.toString() || ""
                        const title = file.name
                        const apiKey = userState.apiKey
                        const docDetails: DocDetails = { title, content, apiKey }
                        uploadFileMutation.mutate(docDetails)
                    }

                    reader.onerror = () => {
                        toast.error("File Size Too Large")
                    }
                }

                else {
                    toast.error("File Size Too Large")
                }
            }
        }

        catch (error) {
            toast.error("File Size Too Large")
        }
    }

    const uploadFile = async (docDetails: DocDetails) => {
        try {
            const { title, content, apiKey } = docDetails
            await axios.post(endPoints.icelakeCreateDocEndpoint, { title, content, apiKey })
            toast.success("Document Uploaded")
        }

        catch (error: any) {
            if (error.response && error.response.data.msg) {
                toast.error(error.response.data.msg)
            }

            else {
                toast.error("Unknown error, please try again")
            }
        }
    }

    const archiveFile = async (docId: string) => {
        const userConsent = await confirm("Are you sure to archive this document?")

        if (userConsent) {
            try {
                await axios.delete(`${endPoints.icelakeArchiveDocEndpoint}/${docId}`)
                toast.success("Document Archived")
            }

            catch (error: any) {
                toast.error("Unable to archive the document")
            }
        }
    }

    const saveDocument = async (docId: string) => {
        try {
            const response = await axios.post(`${endPoints.icelakeSaveDocEndpoint}/${docId}`)
            const element = document.createElement("a")
            const url = response.data.document.content
            fetch(url).then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], "File name")
                    element.href = URL.createObjectURL(file)
                    element.download = response.data.document.title
                    document.body.appendChild(element)
                    element.click()
                })
        }

        catch (error) {
            toast.error("Unknon Error")
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
                    <div className="mb-3">
                        <label htmlFor="file-upload" className="file-button"><UploadIcon className="icon-left" />Upload</label>
                        <input id="file-upload" className="file-input" type="file" multiple onChange={readFile} />
                    </div>
                    <Show when={documentList?.data?.documents?.length > 0}>
                        <h4 className="text-white text-center">Documents</h4>
                        <Table responsive hover variant="light">
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
                        <div className="box">
                            <p className="branding">Documents</p>
                            <p className="lead">No Docs to display</p>
                        </div>
                    </Show>
                    {confirmDialog()}
                </Container>
            </Show>
            <Show when={documentList.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default withAuth(Page)
"use client"
import Loading from "@/components/Loading"
import Show from "@/components/Show"
import endPoints from "@/constants/apiEndpoints"
import withAuth from "@/utils/withAuth"
import Web3 from "web3"
import { NextPage } from "next"
import Link from "next/link"
import { Fragment, useContext, useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { AppContext } from "@/context/appStateProvider"
import { prototypeABI } from "@/bin/prototypeABI"
import moment from "moment"
import ArchiveModal from "@/components/ArchiveModal"
import HTTPMethods from "@/constants/httpMethods"
import useFetch from "@/hooks/useFetch"
import { FileIcon, OpenInNewWindowIcon, ArchiveIcon } from "@radix-ui/react-icons"

const SnowlakePrototypes: NextPage = () => {
    const contractAddress = useFetch("contract-address", endPoints.getContractAddressList, HTTPMethods.POST)
    const web3Provider = new Web3(`${endPoints.infuraEndpoint}/${contractAddress?.data?.infuraApiKey}`)
    const [{ userState }] = useContext(AppContext)
    const [prototypeList, setPrototypeList] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isArchiveModalOpened, setArchiveModalOpened] = useState(false)
    const [isArchiveProcessing, setArchiveProcessing] = useState(false)
    const [archiveId, setArchiveId] = useState(0)
    const [refreshId, setRefreshId] = useState("")

    useEffect(() => {
        (async () => {
            if (!contractAddress.isLoading) {
                const prototypeContract: any = new web3Provider.eth.Contract(prototypeABI as any, contractAddress?.data?.prototypeContractAddress)
                setLoading(true)
                const { privateKey } = userState
                const { address: owner } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)

                try {
                    const getPrototypesByOwnerData = await prototypeContract.methods.getPrototypesByOwner().call({ from: owner })
                    setPrototypeList(getPrototypesByOwnerData)
                }

                catch (error: any) {
                    toast.error("Could not get the list")
                }

                finally {
                    setLoading(false)
                }
            }
        })()
    }, [refreshId, contractAddress?.data])

    const archivePrototype = async (id: any) => {
        try {
            const prototypeContract: any = new web3Provider.eth.Contract(prototypeABI as any, contractAddress?.data?.prototypeContractAddress)
            setArchiveProcessing(true)
            const { privateKey } = userState
            const { address: owner } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
            const archiveTxData = await prototypeContract.methods.archivePrototype(id).encodeABI()
            const archiveTx = {
                from: owner,
                to: contractAddress?.data?.prototypeContractAddress,
                data: archiveTxData,
                gasPrice: await web3Provider.eth.getGasPrice(),
                gas: 500000,
            }
            const signedArchiveTx = await web3Provider.eth.accounts.signTransaction(archiveTx, privateKey)

            if (signedArchiveTx.rawTransaction) {
                await web3Provider.eth.sendSignedTransaction(signedArchiveTx.rawTransaction)
            }
            toast.success("Prototype archived")
            setRefreshId(Math.random().toString())
        }

        catch (error) {
            toast.error("Could not archive this prototype")
        }

        finally {
            setArchiveProcessing(false)
            setArchiveModalOpened(false)
        }
    }

    const prototypesToDisplay = prototypeList?.map((prototype: any) => {
        return (
            <tr key={prototype.id}>
                <td><FileIcon className="icon-left" /> {prototype.name}</td>
                <td>{prototype.description}</td>
                <td>{moment(Number(prototype.createdAt) * 1000).format("MMM, Do YYYY, h:mm a")}</td>
                <td><Link href={`${prototype.link}`} passHref target="_blank"><OpenInNewWindowIcon /></Link></td>
                <td><ArchiveIcon onClick={() => { setArchiveModalOpened(true); setArchiveId(prototype.id) }} /></td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Show when={!isLoading && !contractAddress.isLoading}>
                <Container>
                    <Show when={prototypeList.length > 0}>
                        <h4 className="text-white text-center">Prototypes</h4>
                        <Table responsive hover variant="light">
                            <thead>
                                <tr>
                                    <th>Prototype Name</th>
                                    <th>Description</th>
                                    <th>Created At</th>
                                    <th>View Link</th>
                                    <th>Archive</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prototypesToDisplay}
                            </tbody>
                        </Table>
                    </Show>
                    <Show when={prototypeList.length === 0}>
                        <div className="box">
                            <p className="branding">Prototypes</p>
                            <p className="lead">No Prototypes to display</p>
                        </div>
                    </Show>
                </Container>
            </Show>
            <Show when={isLoading || contractAddress.isLoading}>
                <Loading />
            </Show>
            <ArchiveModal isOpened={isArchiveModalOpened} closeModal={() => setArchiveModalOpened(false)} isTxProcessing={isArchiveProcessing} doAction={() => archivePrototype(archiveId)} />
        </Fragment>
    )
}

export default withAuth(SnowlakePrototypes)
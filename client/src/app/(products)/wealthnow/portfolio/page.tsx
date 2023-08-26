"use client"
import Error from "@/components/ErrorComp"
import Loading from "@/components/Loading"
import Show from "@/components/Show"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import useConfirm from "@/hooks/useConfirm"
import useFetchRealtime from "@/hooks/useFetchRealtime"
import withAuth from "@/utils/withAuth"
import { ArchiveIcon, ExternalLinkIcon, IdCardIcon, ReaderIcon } from "@radix-ui/react-icons"
import axios from "axios"
import moment from "moment"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment } from "react"
import { Button, Container, Table } from "react-bootstrap"

const WealthnowViewPortfolioPage: NextPage = () => {
    const searchParams = useSearchParams()
    const portfolioId = searchParams.get("id")
    const portfolio = useFetchRealtime("view portfolio", endPoints.wealthnowViewPortfolioEndpoint, HTTPMethods.POST, { portfolioId })
    const router = useRouter()
    const { confirmDialog, confirm } = useConfirm()

    const deleteAsset = async (assetId: string) => {
        const userConsent = await confirm("Are you sure to delete this asset?")

        if (userConsent) {
            await axios.delete(`${endPoints.wealthnowDeleteAssetEndpoint}/${assetId}`)
        }
    }

    const assetsToDisplay = portfolio?.data?.assets?.map((asset: any) => {
        return (
            <tr key={asset._id}>
                <td>{asset.principalAmount}</td>
                <td>{asset.rateOfInterest}</td>
                <td>{asset.tenure}</td>
                <td>{asset.maturityAmount}</td>
                <td>{moment(asset.createdAt).format("MMM, Do YYYY, h:mm a")}</td>
                <td><Link href={`/wealthnow/portfolio/editasset?assetId=${asset._id}`}>Link<ExternalLinkIcon className="icon-right" /></Link></td>
                <td><ArchiveIcon onClick={() => deleteAsset(asset._id)} /></td>
            </tr>
        )
    })

    const archivePortfolio = async () => {
        const userConsent = await confirm("Are you sure to archive this portfolio?")

        if (userConsent) {
            await axios.delete(`${endPoints.wealthnowDeletePortfolioEndpoint}/${portfolioId}`)
            router.push("/wealthnow")
        }
    }

    return (
        <Fragment>
            <Show when={!portfolio?.isLoading}>
                <Show when={!portfolio.error}>
                    <Container>
                        <div className="jumbotron p-4">
                            <p className="display-6 text-capitalize">{portfolio?.data?.portfolio?.name}</p>
                            <p className="lead mt-3">Created On {moment(portfolio?.data?.portfolio?.createdAt).format("MMM, Do YYYY, h:mm a")}</p>
                            <Button onClick={archivePortfolio}>Archive Portfolio<ArchiveIcon className="icon-right" /></Button>
                            <Button onClick={() => router.push("/apireference")}>API Reference<ReaderIcon className="icon-right" /></Button>
                            <Button onClick={() => router.push(`/wealthnow/portfolio/addasset?portfolioId=${portfolioId}`)}>Add New Asset<IdCardIcon className="icon-right" /></Button>
                        </div>
                        <Show when={!!portfolio?.data?.assets.length}>
                            <h4 className="text-white text-center">Assets</h4>
                            <Table responsive hover variant="light">
                                <thead>
                                    <tr>
                                        <th>Principal Amount</th>
                                        <th>ROI</th>
                                        <th>Tenure</th>
                                        <th>Maturity Amount</th>
                                        <th>Opening Date</th>
                                        <th>Edit Asset</th>
                                        <th>Delete Asset</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assetsToDisplay}
                                </tbody>
                            </Table>
                        </Show>
                        {confirmDialog()}
                    </Container>
                </Show>
                <Show when={portfolio.error}>
                    <Error />
                </Show>
            </Show>
            <Show when={portfolio?.isLoading}>
                <Loading />
            </Show>
        </Fragment >
    )
}

export default withAuth(WealthnowViewPortfolioPage)
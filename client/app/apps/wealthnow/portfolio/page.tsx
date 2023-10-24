"use client"
import Error from "@/_components/ErrorComp"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import Constants from "@/_constants/appConstants"
import HTTPMethods from "@/_constants/httpMethods"
import useConfirm from "@/_hooks/useConfirm"
import useFetchRealtime from "@/_hooks/useFetchRealtime"
import { ArchiveIcon, CopyIcon, ExternalLinkIcon, IdCardIcon } from "@radix-ui/react-icons"
import axios from "axios"
import moment from "moment"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { toast } from "sonner"

export default function Page() {
  const searchParams = useSearchParams()
  const portfolioId = searchParams.get("portfolioid")
  const portfolio = useFetchRealtime("view portfolio", `${endPoints.wealthnowViewPortfolioEndpoint}?portfolioId=${portfolioId}`, HTTPMethods.POST)
  const router = useRouter()
  const { confirmDialog, confirm } = useConfirm()

  const deleteAsset = async (assetId: string) => {
    const userConsent = await confirm("Are you sure to delete this asset?")

    if (userConsent) {
      await axios.delete(`${endPoints.wealthnowDeleteAssetEndpoint}?assetId=${assetId}`)
    }
  }

  const copyPortfolioId = (): void => {
    navigator.clipboard.writeText(`${portfolioId}`)
    toast.success(Constants.CopiedToClipBoard)
  }

  const assetsToDisplay = portfolio?.data?.assets?.map((asset: any) => {
    return (
      <tr key={asset._id}>
        <td>{asset.principalAmount}</td>
        <td>{asset.rateOfInterest}</td>
        <td>{asset.tenure}</td>
        <td>{asset.maturityAmount}</td>
        <td>{moment(asset.createdAt).format("MMM, Do YYYY, h:mm a")}</td>
        <td><Link href={`/apps/wealthnow/portfolio/editasset?assetid=${asset._id}`}>Link<ExternalLinkIcon className="icon-right" /></Link></td>
        <td><ArchiveIcon onClick={() => deleteAsset(asset._id)} /></td>
      </tr>
    )
  })

  const archivePortfolio = async () => {
    const userConsent = await confirm("Are you sure to archive this portfolio?")

    if (userConsent) {
      await axios.delete(`${endPoints.wealthnowDeletePortfolioEndpoint}?portfolioId=${portfolioId}`)
      router.push("/apps/wealthnow")
    }
  }

  return (
    <Fragment>
      <Show when={!portfolio?.isLoading}>
        <Show when={!portfolio.error && !!portfolioId}>
          <Container>
            <div className="jumbotron p-4">
              <p className="display-6 text-capitalize">{portfolio?.data?.portfolio?.name}</p>
              <p className="lead mt-3">Created On {moment(portfolio?.data?.portfolio?.createdAt).format("MMM, Do YYYY, h:mm a")}</p>
              <p className="lead text-capitalize">Total Asset</p>
              <p className="display-4 text-capitalize">₹ {portfolio?.data?.totalAssetUnderPortfolio.toLocaleString()}</p>
              <Button onClick={copyPortfolioId}>Copy Portfolio Id<CopyIcon className="icon-right" /></Button>
              <Button onClick={archivePortfolio}>Archive Portfolio<ArchiveIcon className="icon-right" /></Button>
              <Button onClick={() => router.push(`/apps/wealthnow/portfolio/addasset?portfolioid=${portfolioId}`)}>Add New Asset<IdCardIcon className="icon-right" /></Button>
            </div>
            <Show when={!!portfolio?.data?.assets.length}>
              <h4 className="text-white">Assets</h4>
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
        <Show when={portfolio.error || !portfolioId}>
          <Error />
        </Show>
      </Show>
      <Show when={portfolio?.isLoading}>
        <Loading />
      </Show>
    </Fragment >
  )
}

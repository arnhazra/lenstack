"use client"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import Web3 from "web3"
import Link from "next/link"
import { Fragment, useContext, useEffect, useState } from "react"
import { Badge, Container, Row } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { AppContext } from "@/_context/appStateProvider"
import { nftABI } from "@/_bin/nftABI"
import moment from "moment"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import GenericAppCard from "@/_components/GenericAppCard"
import { GenericAppCardInterface } from "@/_types/Types"

export default function Page() {
  const contractAddress = useFetch("contract-address", endPoints.getSecretConfig, HTTPMethods.POST)
  const web3Provider = new Web3(`${endPoints.infuraEndpoint}/${contractAddress?.data?.infuraSecret}`)
  const [{ userState }] = useContext(AppContext)
  const [nftList, setNFTList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)

  const selectedApp = apps?.data?.find((app: any) => {
    return app.appName === "snowlake"
  })

  useEffect(() => {
    (async () => {
      if (!contractAddress.isLoading) {
        const nftContract: any = new web3Provider.eth.Contract(nftABI as any, contractAddress?.data?.nftContractAddress)
        setLoading(true)
        const { privateKey } = userState
        const { address: owner } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)

        try {
          const getNFTsByOwnerData = await nftContract.methods.getNFTsByOwner().call({ from: owner })
          setNFTList(getNFTsByOwnerData)
        }

        catch (error: any) {
          toast.error("Could not get the list")
        }

        finally {
          setLoading(false)
        }
      }
    })()
  }, [contractAddress?.data])

  const nftsToDisplay = nftList?.map((nft: any) => {
    const genericAppCardProps: GenericAppCardInterface = {
      badgeText: "NFT",
      className: "snowlake",
      headerText: nft.name,
      footerText: `This NFT was minted by you using Snowlake"s NFT minter on ${moment(Number(nft.createdAt) * 1000).format("MMM, Do YYYY, h:mm a")}. To check more click on this card.`,
      redirectUri: `/apps/snowlake/nft?nftId=${nft.id}`
    }

    return (
      <GenericAppCard key={nft.id} genericAppCardProps={genericAppCardProps} />
    )
  })

  return (
    <Fragment>
      <Show when={!isLoading && !contractAddress.isLoading}>
        <Container>
          <div className="jumbotron p-4">
            <p className="branding">{selectedApp?.appName}</p>
            <p className="muted-text mt-3">{selectedApp?.largeDescription}</p>
            <div className="mb-2">
              <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.dbRegion}</Badge>
              <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.appStatus}</Badge>
            </div>
            <Link className="btn" href={"/apps/snowlake/mintnft"}><PlusCircledIcon className="icon-left" />Mint New NFT</Link>
          </div>
          <Show when={nftList.length > 0}>
            <h4 className="text-white">My Collection</h4>
            <Row className="mt-2 mb-2">
              {nftsToDisplay}
            </Row>
          </Show>
          <Show when={nftList.length === 0}>
            <h4 className="text-white">No NFTs to display</h4>
          </Show>
        </Container>
      </Show>
      <Show when={isLoading || contractAddress.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}

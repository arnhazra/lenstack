"use client"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import Web3 from "web3"
import Link from "next/link"
import { Fragment, useContext, useEffect, useState } from "react"
import { Container, Row } from "react-bootstrap"
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
  const web3Provider = new Web3(`${endPoints.infuraEndpoint}/${contractAddress?.data?.infuraApiKey}`)
  const [{ userState }] = useContext(AppContext)
  const [nftList, setNFTList] = useState([])
  const [isLoading, setLoading] = useState(false)

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
          console.log(getNFTsByOwnerData.filter((item: any) => item.id == 3))
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
      footerText: `This NFT was minted by you using Snowlake's NFT minter on ${moment(Number(nft.createdAt) * 1000).format("MMM, Do YYYY, h:mm a")}. To check more click on this card.`,
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
          <Link className="btn" href={"/apps/snowlake/mintnft"}><PlusCircledIcon className="icon-left" />Mint New NFT</Link>
          <Show when={nftList.length > 0}>
            <h4 className="text-white">My Collection</h4>
            <Row className="mt-4 mb-2">
              {nftsToDisplay}
            </Row>
          </Show>
          <Show when={nftList.length === 0}>
            <div className="box">
              <p className="branding">My Collection</p>
              <p className="lead">No NFTs to display</p>
            </div>
          </Show>
        </Container>
      </Show>
      <Show when={isLoading || contractAddress.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}

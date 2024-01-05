"use client"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import Web3 from "web3"
import Link from "next/link"
import { Fragment, useCallback, useContext, useEffect, useState } from "react"
import { Badge, Col, Container, Row } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { GlobalContext } from "@/context/globalstate.provider"
import { nftABI } from "@/bin/nft-abi"
import moment from "moment"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import Card, { CardInterface } from "@/components/card"
import Hero from "@/components/hero"
import { uiConstants } from "@/constants/global-constants"

export default function Page() {
  const nftContractAddress = useQuery(["nftcontract"], endPoints.nftstudioGetContractAddress, HTTPMethods.GET)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=nftstudio`, HTTPMethods.GET)
  const web3Provider = new Web3(endPoints.nftstudioSignTransactionGateway)
  const [{ userState, globalSearchString }] = useContext(GlobalContext)
  const [nftList, setNFTList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "nftstudio")

  useEffect(() => {
    (async () => {
      if (!nftContractAddress.isLoading) {
        const nftContract: any = new web3Provider.eth.Contract(nftABI as any, nftContractAddress?.data?.nftContractAddress)
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
  }, [nftContractAddress?.data])

  const displayNfts = useCallback(() => {
    const nftsToDisplay = nftList?.filter((nft: any) =>
      nft.name.toLowerCase().includes(globalSearchString)
    )?.map((nft: any) => {
      const cardProps: CardInterface = {
        badgeText: "NFT",
        className: "decentralized",
        headerText: nft.name,
        footerText: `This NFT was minted by you using NFT Studio on ${moment(Number(nft.createdAt) * 1000).format("MMM, Do YYYY, h:mm a")}. To check more click on this card.`,
        redirectUri: `/products/nftstudio/nft?nftId=${nft.id}`
      }

      return <Card key={nft.id} cardProps={cardProps} />
    })

    return (
      <Suspense condition={!!nftsToDisplay?.length} fallback={<h4 className="text-white">No NFTs to display</h4>}>
        <h4 className="text-white">My Collection</h4>
        <Row xs={1} sm={1} md={2} lg={3} xl={4}>
          {nftsToDisplay}
        </Row>
      </Suspense>
    )
  }, [globalSearchString, nftList])

  return (
    <Suspense condition={!isLoading && !nftContractAddress.isLoading && !products.isLoading} fallback={<Loading />}>
      <Container>
        <Hero>
          <p className="branding">{uiConstants.brandName} {selectedProduct?.displayName}</p>
          <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
          <div className="mb-2">
            <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
            <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
          </div>
          <Link className="btn btn-primary" href={"/products/nftstudio/mintnft"}><PlusCircledIcon className="icon-left" />Mint New NFT</Link>
        </Hero>
        {displayNfts()}
      </Container>
    </Suspense>
  )
}

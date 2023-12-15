"use client"
import Loading from "@/components/loading-component"
import Show from "@/components/show-component"
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
import useFetch from "@/hooks/use-fetch"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import ProductCard from "@/components/productcard-component"
import { ProductCardInterface } from "@/types/Types"
import Hero from "@/components/hero-component"
import { uiConstants } from "@/constants/global-constants"

export default function Page() {
  const nftContractAddress = useFetch("secret-config", endPoints.nftstudioGetContractAddress, HTTPMethods.POST)
  const web3Provider = new Web3(endPoints.nftstudioSignTransactionGateway)
  const [{ userState, globalSearchString }] = useContext(GlobalContext)
  const [nftList, setNFTList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const products = useFetch("get-products", endPoints.getProductConfig, HTTPMethods.POST, { searchQuery: "nftstudio" })
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
      const productCardProps: ProductCardInterface = {
        badgeText: "NFT",
        className: "decentralized",
        headerText: nft.name,
        footerText: `This NFT was minted by you using NFT Studio on ${moment(Number(nft.createdAt) * 1000).format("MMM, Do YYYY, h:mm a")}. To check more click on this card.`,
        redirectUri: `/products/nftstudio/nft?nftId=${nft.id}`
      }

      return (
        <Col xs={12} sm={6} md={6} lg={4} xl={3} className="mb-4">
          <ProductCard key={nft.id} productCardProps={productCardProps} />
        </Col>
      )
    })

    return (
      <Row className="mt-2 mb-2">
        <Show when={!!nftsToDisplay?.length}>
          <h4 className="text-white">My Collection</h4>
          {nftsToDisplay}
        </Show >
        <Show when={!nftsToDisplay?.length}>
          <h4 className="text-white">No NFTs to display</h4>
        </Show>
      </Row>
    )
  }, [globalSearchString, nftList])

  return (
    <Fragment>
      <Show when={!isLoading && !nftContractAddress.isLoading && !products.isLoading}>
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
      </Show>
      <Show when={isLoading || nftContractAddress.isLoading || products.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}

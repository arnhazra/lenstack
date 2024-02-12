"use client"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import Web3 from "web3"
import Link from "next/link"
import { Fragment, useCallback, useContext, useEffect, useState } from "react"
import { Badge, Col, Container, Row } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { nftABI } from "@/bin/nft-abi"
import { formatDistanceToNow } from "date-fns"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import Hero from "@/components/hero"
import { uiConstants } from "@/constants/global-constants"
import Error from "@/components/error"
import { GenericCard, GenericCardProps } from "@/components/card"
import Grid from "@/components/grid"

export default function Page() {
  const nftContractAddress = useQuery(["nftcontract"], endPoints.nftstudioGetContractAddress, HTTPMethods.GET)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=nftstudio`, HTTPMethods.GET)
  const web3Provider = new Web3(endPoints.infuraTransactionGateway)
  const [{ userState, appState }] = useContext(GlobalContext)
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
      nft.name.toLowerCase().includes(appState.globalSearchString)
    )?.map((nft: any) => {
      const nftCardProps: GenericCardProps = {
        header: nft.name,
        footer: <Fragment>
          <Badge color="white" bg="light" pill className="ps-3 pe-3 p-2 ps-3 pe-3 p-2 align-self-start mb-4">ERC-721</Badge>
          <p className="muted-text">This NFT was minted using NFT Studio on {formatDistanceToNow(new Date(Number(nft.createdAt) * 1000), { addSuffix: true })}. To check more click on this card.</p>
        </Fragment>
      }

      return (
        <Col key={nft.id} className="mb-3">
          <Link href={`/products/nftstudio/nft?nftId=${nft.id}`}>
            <GenericCard {...nftCardProps} />
          </Link>
        </Col>
      )
    })

    return (
      <Suspense condition={!!nftsToDisplay?.length} fallback={<h4 className="text-white">No NFTs to display</h4>}>
        <h4 className="text-white">My Collection</h4>
        <Grid>
          {nftsToDisplay}
        </Grid>
      </Suspense>
    )
  }, [appState.globalSearchString, nftList])

  return (
    <Suspense condition={!isLoading && !nftContractAddress.isLoading && !products.isLoading} fallback={<Loading />}>
      <Suspense condition={!nftContractAddress.error && !products.error} fallback={<Error />}>
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
    </Suspense>
  )
}

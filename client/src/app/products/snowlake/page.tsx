"use client"
import Loading from "@/components/Loading"
import Show from "@/components/Show"
import endPoints from "@/constants/apiEndpoints"
import Web3 from "web3"
import Link from "next/link"
import { Fragment, useCallback, useContext, useEffect, useState } from "react"
import { Badge, Container, Row } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { GlobalContext } from "@/context/globalStateProvider"
import { nftABI } from "@/bin/nftABI"
import moment from "moment"
import HTTPMethods from "@/constants/httpMethods"
import useFetch from "@/hooks/useFetch"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import GenericProductCard from "@/components/GenericProductCard"
import { GenericProductCardInterface } from "@/types/Types"
import GenericHero from "@/components/GenericHero"

export default function Page() {
  const contractAddress = useFetch("contract-address", endPoints.getSecretConfig, HTTPMethods.POST)
  const web3Provider = new Web3(`${endPoints.infuraEndpoint}/${contractAddress?.data?.infuraSecret}`)
  const [{ userState, globalSearchString }] = useContext(GlobalContext)
  const [nftList, setNFTList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const products = useFetch("get-products", endPoints.getProductConfigEndpoint, HTTPMethods.POST, { searchQuery: "snowlake" })
  const selectedProduct = products?.data?.find((product: any) => product.productName === "snowlake")

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

  const displayNfts = useCallback(() => {
    const nftsToDisplay = nftList?.filter((nft: any) =>
      nft.name.toLowerCase().includes(globalSearchString)
    )?.map((nft: any) => {
      const genericProductCardProps: GenericProductCardInterface = {
        badgeText: "NFT",
        className: "decentralized",
        headerText: nft.name,
        footerText: `This NFT was minted by you using Snowlake NFT minter on ${moment(Number(nft.createdAt) * 1000).format("MMM, Do YYYY, h:mm a")}. To check more click on this card.`,
        redirectUri: `/products/snowlake/nft?nftId=${nft.id}`
      }

      return (
        <GenericProductCard key={nft.id} genericProductCardProps={genericProductCardProps} />
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
      <Show when={!isLoading && !contractAddress.isLoading && !products.isLoading}>
        <Container>
          <GenericHero>
            <p className="branding">{selectedProduct?.productName}</p>
            <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
              <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
            </div>
            <Link className="btn" href={"/products/snowlake/mintnft"}><PlusCircledIcon className="icon-left" />Mint New NFT</Link>
          </GenericHero>
          {displayNfts()}
        </Container>
      </Show>
      <Show when={isLoading || contractAddress.isLoading || products.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}

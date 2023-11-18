"use client"
import { nftABI } from "@/bin/nft.abi"
import Error from "@/components/error.component"
import ProductCard from "@/components/productcard.component"
import Hero from "@/components/hero.component"
import Loading from "@/components/loading.component"
import Show from "@/components/show.component"
import { endPoints } from "@/constants/api.endpoints"
import Constants from "@/constants/global.constants"
import HTTPMethods from "@/constants/http.methods"
import { GlobalContext } from "@/context/globalstate.provider"
import useConfirm from "@/hooks/useConfirm"
import useFetch from "@/hooks/useFetch"
import { ProductCardInterface } from "@/types/Types"
import { ArchiveIcon, CopyIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons"
import moment from "moment"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment, useContext, useEffect, useState } from "react"
import { Badge, Button, Col, Container, Row } from "react-bootstrap"
import toast from "react-hot-toast"
import Web3 from "web3"

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const nftId = searchParams.get("nftId")
  const secretConfig = useFetch("secret-config", endPoints.getSecretConfig, HTTPMethods.POST)
  const web3Provider = new Web3(secretConfig?.data?.quicknodeGateway)
  const [{ userState }] = useContext(GlobalContext)
  const [selectedNft, setSelectedNft] = useState<any>()
  const [nftList, setNFTList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)
  const [hasImage, setHasImage] = useState(false)
  const [isArchiving, setArchiving] = useState(false)
  const { confirm, confirmDialog } = useConfirm()

  useEffect(() => {
    (async () => {
      if (!secretConfig.isLoading) {
        const nftContract: any = new web3Provider.eth.Contract(nftABI as any, secretConfig?.data?.nftContractAddress)
        setLoading(true)
        const { privateKey } = userState
        const { address: owner } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)

        try {
          const getNFTsByOwnerData = await nftContract.methods.getNFTsByOwner().call({ from: owner })
          setNFTList(getNFTsByOwnerData)
          const selected = getNFTsByOwnerData.find((item: any) => item.id == nftId)

          if (selected) {
            setSelectedNft(getNFTsByOwnerData.find((item: any) => item.id == nftId))
          }

          else {
            setError(true)
          }
        }

        catch (error: any) {
          setError(true)
          toast.error("Could not get the list")
        }

        finally {
          setLoading(false)
        }
      }
    })()
  }, [nftId, secretConfig?.data])

  const archiveNFT = async (nftId: any) => {
    const userConsent = await confirm("Are you sure to archive this NFT?")

    if (userConsent) {
      try {
        setArchiving(true)
        const nftContract: any = new web3Provider.eth.Contract(nftABI as any, secretConfig?.data?.nftContractAddress)
        const { privateKey } = userState
        const { address: owner } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
        const archiveTxData = await nftContract.methods.archiveNFT(nftId).encodeABI()
        const archiveTx = {
          from: owner,
          to: secretConfig?.data?.nftContractAddress,
          data: archiveTxData,
          gasPrice: await web3Provider.eth.getGasPrice(),
          gas: 500000,
        }
        const signedArchiveTx = await web3Provider.eth.accounts.signTransaction(archiveTx, privateKey)

        if (signedArchiveTx.rawTransaction) {
          await web3Provider.eth.sendSignedTransaction(signedArchiveTx.rawTransaction)
        }
        toast.success("NFT archived")
        router.push("/products/nftstudio")
      }

      catch (error) {
        toast.error("Could not archive this NFT")
      }

      finally {
        setArchiving(false)
      }
    }
  }

  const nftsToDisplay = nftList?.map((nft: any) => {
    const productCardProps: ProductCardInterface = {
      badgeText: "NFT",
      className: "decentralized",
      headerText: nft.name,
      footerText: `This NFT was minted by you using NFT Studio on ${moment(Number(nft.createdAt) * 1000).format("MMM, Do YYYY, h:mm a")}. To check more click on this card.`,
      redirectUri: `/products/nftstudio/nft?nftId=${nft.id}`
    }

    return (
      <ProductCard key={nft.id} productCardProps={productCardProps} />
    )
  })

  const showAddress = (address: string) => {
    const displayAddress = `(${address?.substring(0, 3)}...${address?.substring(address.length - 3)})`
    return displayAddress
  }

  const copyAddress = (address: string): void => {
    navigator.clipboard.writeText(`${address}`)
    toast.success(Constants.CopiedToClipBoard)
  }

  useEffect(() => {
    const verifyImage = (url: string): Promise<boolean> => {
      const img = new Image()
      img.src = url

      return new Promise((resolve) => {
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
      })
    }

    verifyImage(selectedNft?.link).then((res) => setHasImage(res))
  }, [selectedNft])

  return (
    <Fragment>
      <Show when={!secretConfig.isLoading && !isLoading && !isArchiving}>
        <Show when={!hasError}>
          <Container>
            <Hero>
              <Row>
                <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                  <img
                    src={hasImage ? selectedNft?.link : Constants.DefaultNftImage}
                    width={300}
                    height={300}
                    alt="Picture of the NFT"
                    className="image-container"
                  />
                </Col>
                <Col xs={12} sm={12} md={6} lg={8} xl={9}>
                  <p className="branding text-capitalize">{selectedNft?.name}</p>
                  <p className="muted-text">{selectedNft?.description}</p>
                  <p className="lead">NFT Contract: {showAddress(secretConfig?.data?.nftContractAddress)}<CopyIcon className="icon-right" onClick={(): void => copyAddress(secretConfig?.data?.nftContractAddress)} /></p>
                  <p className="lead">Owner: {showAddress(selectedNft?.owner)}<CopyIcon className="icon-right" onClick={(): void => copyAddress(selectedNft?.owner)} /></p>
                  <div className="mb-3">
                    <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">NFT</Badge>
                    <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">ERC-721</Badge>
                    <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">#{nftId}</Badge>
                  </div>
                  <Link className="btn" href={selectedNft?.link ?? ""} passHref target="_blank">View Link<OpenInNewWindowIcon className="icon-right" /></Link>
                  <Link className="btn" href={`${Constants.PolygonScanBaseUri}/${secretConfig?.data?.nftContractAddress}/${selectedNft?.id}`} passHref target="_blank">PolygonScan<OpenInNewWindowIcon className="icon-right" /></Link>
                  <Link className="btn" href={`${Constants.OpenseaBaseUri}/${secretConfig?.data?.nftContractAddress}/${selectedNft?.id}`} passHref target="_blank">OpenSea<OpenInNewWindowIcon className="icon-right" /></Link>
                  <Button onClick={() => archiveNFT(nftId)}>Archive NFT<ArchiveIcon className="icon-right" /></Button>
                </Col>
              </Row>
            </Hero>
            <Row>
              <h4 className="text-white">Other NFTs in my collection</h4>
              {nftsToDisplay}
            </Row>
          </Container>
        </Show>
        <Show when={hasError}>
          <Error />
        </Show>
      </Show>
      <Show when={secretConfig.isLoading || isLoading || isArchiving}>
        <Loading />
      </Show>
      {confirmDialog()}
    </Fragment >
  )
}
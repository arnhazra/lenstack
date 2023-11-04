"use client"
import { nftABI } from "@/_bin/nftABI"
import Error from "@/_components/ErrorComp"
import GenericAppCard from "@/_components/GenericAppCard"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import Constants from "@/_constants/appConstants"
import HTTPMethods from "@/_constants/httpMethods"
import { AppContext } from "@/_context/appStateProvider"
import useConfirm from "@/_hooks/useConfirm"
import useFetch from "@/_hooks/useFetch"
import { GenericAppCardInterface } from "@/_types/Types"
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
  const contractAddress = useFetch("contract-address", endPoints.getSecretConfig, HTTPMethods.POST)
  const web3Provider = new Web3(`${endPoints.infuraEndpoint}/${contractAddress?.data?.infuraSecret}`)
  const [{ userState }] = useContext(AppContext)
  const [selectedNft, setSelectedNft] = useState<any>()
  const [nftList, setNFTList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)
  const [hasImage, setHasImage] = useState(false)
  const [isArchiving, setArchiving] = useState(false)
  const { confirm, confirmDialog } = useConfirm()

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
  }, [nftId, contractAddress?.data])

  const archiveNFT = async (nftId: any) => {
    const userConsent = await confirm("Are you sure to archive this NFT?")

    if (userConsent) {
      try {
        setArchiving(true)
        const nftContract: any = new web3Provider.eth.Contract(nftABI as any, contractAddress?.data?.nftContractAddress)
        const { privateKey } = userState
        const { address: owner } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
        const archiveTxData = await nftContract.methods.archiveNFT(nftId).encodeABI()
        const archiveTx = {
          from: owner,
          to: contractAddress?.data?.nftContractAddress,
          data: archiveTxData,
          gasPrice: await web3Provider.eth.getGasPrice(),
          gas: 500000,
        }
        const signedArchiveTx = await web3Provider.eth.accounts.signTransaction(archiveTx, privateKey)

        if (signedArchiveTx.rawTransaction) {
          await web3Provider.eth.sendSignedTransaction(signedArchiveTx.rawTransaction)
        }
        toast.success("NFT archived")
        router.push("/apps/snowlake")
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

  const showAddress = (address: string) => {
    const displayAddress = `(${address?.substring(0, 3)}...${address?.substring(address.length - 3)})`
    return displayAddress
  }

  const copyAddress = (address: string): void => {
    navigator.clipboard.writeText(`${address}`)
    toast.success(Constants.CopiedToClipBoard)
  }

  const verifyImage = (url: string) => {
    const img = new Image()
    img.src = url

    return new Promise((resolve) => {
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
    })
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
      <Show when={!contractAddress.isLoading && !isLoading && !isArchiving}>
        <Show when={!hasError}>
          <Container>
            <div className="jumbotron p-4">
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
                  <p className="lead">{selectedNft?.description}</p>
                  <p className="lead">NFT Contract: {showAddress(contractAddress?.data?.nftContractAddress)}<CopyIcon className="icon-right" onClick={(): void => copyAddress(contractAddress?.data?.nftContractAddress)} /></p>
                  <p className="lead">Owner: {showAddress(selectedNft?.owner)}<CopyIcon className="icon-right" onClick={(): void => copyAddress(selectedNft?.owner)} /></p>
                  <div className="mb-3">
                    <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">NFT</Badge>
                    <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">ERC-721</Badge>
                    <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">#{nftId}</Badge>
                  </div>
                  <Link className="btn" href={selectedNft?.link ?? ""} passHref target="_blank">View Link<OpenInNewWindowIcon className="icon-right" /></Link>
                  <Link className="btn" href={`${Constants.PolygonScanBaseUri}/${contractAddress?.data?.nftContractAddress}/${selectedNft?.id}`} passHref target="_blank">PolygonScan<OpenInNewWindowIcon className="icon-right" /></Link>
                  <Link className="btn" href={`${Constants.OpenseaBaseUri}/${contractAddress?.data?.nftContractAddress}/${selectedNft?.id}`} passHref target="_blank">OpenSea<OpenInNewWindowIcon className="icon-right" /></Link>
                  <Button onClick={() => archiveNFT(nftId)}>Archive NFT<ArchiveIcon className="icon-right" /></Button>
                </Col>
              </Row>
            </div>
            <Row>
              <h4 className="text-white mb-4">Other NFTs in my collection</h4>
              {nftsToDisplay}
            </Row>
          </Container>
        </Show>
        <Show when={hasError}>
          <Error />
        </Show>
      </Show>
      <Show when={contractAddress.isLoading || isLoading || isArchiving}>
        <Loading />
      </Show>
      {confirmDialog()}
    </Fragment >
  )
}
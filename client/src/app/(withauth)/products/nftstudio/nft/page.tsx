"use client"
import { nftABI } from "@/bin/nft-abi"
import Error from "@/components/error"
import Card, { CardInterface } from "@/components/card"
import Hero from "@/components/hero"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import { GlobalContext } from "@/context/globalstate.provider"
import useConfirm from "@/hooks/use-confirm"
import useQuery from "@/hooks/use-query"
import { ArchiveIcon, IdCardIcon, OpenInNewWindowIcon, PersonIcon } from "@radix-ui/react-icons"
import moment from "moment"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Fragment, useCallback, useContext, useEffect, useState } from "react"
import { Badge, Button, Col, Container, Row } from "react-bootstrap"
import toast from "react-hot-toast"
import Web3 from "web3"
import SensitiveInfoPanel from "@/components/sensitive-infopanel"

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const nftId = searchParams.get("nftId")
  const nftContractAddress = useQuery(["nftcontract"], endPoints.nftstudioGetContractAddress, HTTPMethods.GET)
  const web3Provider = new Web3(endPoints.nftstudioSignTransactionGateway)
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
      if (!nftContractAddress.isLoading) {
        const nftContract: any = new web3Provider.eth.Contract(nftABI as any, nftContractAddress?.data?.nftContractAddress)
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
  }, [nftId, nftContractAddress?.data])

  const archiveNFT = async (nftId: any) => {
    const userConsent = await confirm("Are you sure to archive this NFT?")

    if (userConsent) {
      try {
        setArchiving(true)
        const nftContract: any = new web3Provider.eth.Contract(nftABI as any, nftContractAddress?.data?.nftContractAddress)
        const { privateKey } = userState
        const { address: owner } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
        const archiveTxData = await nftContract.methods.archiveNFT(nftId).encodeABI()
        const archiveTx = {
          from: owner,
          to: nftContractAddress?.data?.nftContractAddress,
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

  const displayNfts = useCallback(() => {
    const nftsToDisplay = nftList?.map((nft: any) => {
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
      <Fragment>
        <h4 className="text-white">Other NFTs in my collection</h4>
        <Row xs={1} sm={1} md={2} lg={3} xl={4}>
          {nftsToDisplay}
        </Row>
      </Fragment>
    )
  }, [nftList])

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
      <Suspense condition={!nftContractAddress.isLoading && !isLoading && !isArchiving} fallback={<Loading />}>
        <Suspense condition={!hasError} fallback={<Error />}>
          <Container>
            <Hero>
              <Row>
                <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                  <img
                    src={hasImage ? selectedNft?.link : uiConstants.defaultNftImage}
                    width={270}
                    height={270}
                    alt="Picture of the NFT"
                    className="image-container"
                  />
                </Col>
                <Col xs={12} sm={12} md={6} lg={8} xl={9}>
                  <p className="branding">{selectedNft?.name}</p>
                  <p className="muted-text">{selectedNft?.description}</p>
                  <SensitiveInfoPanel credentialIcon={<IdCardIcon />} credentialName="NFT Contract Address" credentialValue={nftContractAddress?.data?.nftContractAddress} />
                  <SensitiveInfoPanel credentialIcon={<PersonIcon />} credentialName="Owner Wallet Address" credentialValue={selectedNft?.owner} />
                  <div className="mb-3">
                    <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">NFT</Badge>
                    <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">ERC-721</Badge>
                    <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">#{nftId}</Badge>
                  </div>
                  <Link className="btn btn-primary" href={selectedNft?.link ?? ""} passHref target="_blank">View Link<OpenInNewWindowIcon className="icon-right" /></Link>
                  <Link className="btn btn-secondary" href={`${uiConstants.polygonScanBaseUri}/${nftContractAddress?.data?.nftContractAddress}/${selectedNft?.id}`} passHref target="_blank">PolygonScan<OpenInNewWindowIcon className="icon-right" /></Link>
                  <Link className="btn btn-secondary" href={`${uiConstants.openseaBaseUri}/${nftContractAddress?.data?.nftContractAddress}/${selectedNft?.id}`} passHref target="_blank">OpenSea<OpenInNewWindowIcon className="icon-right" /></Link>
                  <Button variant="danger" onClick={() => archiveNFT(nftId)}>Archive NFT<ArchiveIcon className="icon-right" /></Button>
                </Col>
              </Row>
            </Hero>
            {displayNfts()}
          </Container>
        </Suspense>
      </Suspense>
      {confirmDialog()}
    </Fragment>
  )
}
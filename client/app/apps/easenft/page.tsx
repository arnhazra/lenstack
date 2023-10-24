"use client"
import { Fragment, useContext, useEffect, useState } from "react"
import endPoints from "@/_constants/apiEndpoints"
import Show from "@/_components/Show"
import { Button, Container, Table } from "react-bootstrap"
import Loading from "@/_components/Loading"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import moment from "moment"
import { ExternalLinkIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { AppContext } from "@/_context/appStateProvider"
import Web3 from "web3"
import { toast } from "sonner"
import axios from "axios"
import { nftABI } from "@/_bin/nftABI"
import Link from "next/link"
import useFetchRealtime from "@/_hooks/useFetchRealtime"

export default function Page() {
  const [{ userState }] = useContext(AppContext)
  const secretConfig = useFetch("contract-address", endPoints.getSecretConfig, HTTPMethods.POST)
  const myNfts = useFetchRealtime("get-my-nfts", endPoints.easenftGetMyNftsEndpoint, HTTPMethods.POST)
  const web3Provider = new Web3(`${endPoints.infuraEndpoint}/${secretConfig?.data?.infuraApiKey}`)
  const [isMintingNft, setMintingNft] = useState(false)

  const nftsToDisplay = myNfts?.data?.myNftList?.map((nft: any) => {
    return (
      <tr key={nft._id}>
        <td>{moment(nft.createdAt).format("MMM, Do YYYY, h:mm a")}</td>
        <td><Link target="_blank" passHref href={`https://mumbai.polygonscan.com/tx/${nft.txId}`}>View NFT<ExternalLinkIcon className=" icon-right" /></Link></td>
      </tr >
    )
  })

  const mintNft = async (e: any) => {
    e.preventDefault()
    setMintingNft(true)
    const { privateKey } = userState
    const { address: owner } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
    const nftContract: any = new web3Provider.eth.Contract(nftABI as any, secretConfig?.data?.nftContractAddress)

    try {
      const newNftData = nftContract.methods.mintNFT().encodeABI()

      const newNftTx = {
        from: owner,
        to: secretConfig?.data?.nftContractAddress,
        data: newNftData,
        gasPrice: await web3Provider.eth.getGasPrice(),
        gas: 500000,
      }

      const signedNewNftTx = await web3Provider.eth.accounts.signTransaction(newNftTx, privateKey)
      if (signedNewNftTx.rawTransaction) {
        await web3Provider.eth.sendSignedTransaction(signedNewNftTx.rawTransaction)
        await axios.post(endPoints.easenftCreateTxEndpoint, { apiKey: userState.apiKey, txId: signedNewNftTx.transactionHash })
        toast.success("Nft Created, will reflect in list soon")
      }
    }

    catch (error: any) {
      toast.error("Fund your wallet & try again")
    }

    finally {
      setMintingNft(false)
    }
  }

  return (
    <Fragment>
      <Show when={!myNfts.isLoading}>
        <Container>
          <div className="mb-3">
            <Button onClick={mintNft} disabled={isMintingNft}>
              <Show when={!isMintingNft}>
                <PlusCircledIcon className="icon-left" />Mint New NFT
              </Show>
              <Show when={isMintingNft}>
                Minting NFT <i className="fas fa-circle-notch fa-spin"></i>
              </Show>
            </Button>
          </div>
          <Show when={myNfts?.data?.myNftList?.length > 0}>
            <h4 className="text-white">My NFTs</h4>
            <Table responsive hover variant="light">
              <thead>
                <tr>
                  <th>Created At</th>
                  <th>Polygonscan Link</th>
                </tr>
              </thead>
              <tbody>
                {nftsToDisplay}
              </tbody>
            </Table>
          </Show>
          <Show when={myNfts?.data?.myNftList?.length === 0}>
            <div className="box">
              <p className="branding">nfts</p>
              <p className="lead">No nfts to display</p>
            </div>
          </Show>
        </Container>
      </Show>
      <Show when={myNfts.isLoading}>
        <Loading />
      </Show>
    </Fragment >
  )
}

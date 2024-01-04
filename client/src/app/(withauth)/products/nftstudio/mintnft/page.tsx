"use client"
import { nftABI } from "@/bin/nft-abi"
import Show from "@/components/show"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { GlobalContext } from "@/context/globalstate.provider"
import useQuery from "@/hooks/use-query"
import Link from "next/link"
import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { toast } from "react-hot-toast"
import Web3 from "web3"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useRouter } from "next/navigation"
import { uiConstants } from "@/constants/global-constants"

export default function Page() {
  const nftContractAddress = useQuery("secret-config", endPoints.nftstudioGetContractAddress, HTTPMethods.GET)
  const web3Provider = new Web3(endPoints.nftstudioSignTransactionGateway)
  const [{ userState }] = useContext(GlobalContext)
  const router = useRouter()
  const [state, setState] = useState({ name: "", description: "", link: "", isLoading: false })

  const mintNFT = async (e: any) => {
    e.preventDefault()
    setState({ ...state, isLoading: true })
    const { privateKey } = userState
    const { address: owner } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
    const nftContract: any = new web3Provider.eth.Contract(nftABI as any, nftContractAddress?.data?.nftContractAddress)

    try {
      await axios.post(endPoints.nftstudioCreateTx)
      const { name, description, link } = state
      const isArchived = false
      const newNFTData = nftContract.methods.createNFT(name, description, link, isArchived).encodeABI()

      const newNFTTx = {
        from: owner,
        to: nftContractAddress?.data?.nftContractAddress,
        data: newNFTData,
        gasPrice: await web3Provider.eth.getGasPrice(),
        gas: 500000,
      }

      const signedNewNFTTx = await web3Provider.eth.accounts.signTransaction(newNFTTx, privateKey)
      if (signedNewNFTTx.rawTransaction) {
        await web3Provider.eth.sendSignedTransaction(signedNewNFTTx.rawTransaction)
        toast.success("NFT Minting Success")
        setState({ ...state, isLoading: false })
        router.push("/products/nftstudio")
      }
    }

    catch (error: any) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message)
      }

      else {
        toast.error(uiConstants.transactionError)
      }
    }

    finally {
      setState({ ...state, isLoading: false })
    }
  }

  return (
    <form className="box" onSubmit={mintNFT}>
      <p className="branding">Mint NFT</p>
      <Form.Group controlId="floatingtext">
        <Form.Label>NFT Name</Form.Label>
        <Form.Control disabled={state.isLoading} type="text" placeholder="Acme NFT" onChange={(e) => setState({ ...state, name: e.target.value })} required autoComplete={"off"} minLength={4} maxLength={20} />
      </Form.Group>
      <Form.Group controlId="floatingtext" className="mt-2">
        <Form.Label>Short Description</Form.Label>
        <Form.Control disabled={state.isLoading} type="text" placeholder="Lorem Ipsum Dolor ..." onChange={(e) => setState({ ...state, description: e.target.value })} required autoComplete={"off"} minLength={4} maxLength={20} />
      </Form.Group>
      <Form.Group controlId="floatingtext" className="mt-2">
        <Form.Label>NFT Link/Image URI</Form.Label>
        <Form.Control disabled={state.isLoading} type="url" placeholder="https://acme.com/" onChange={(e) => setState({ ...state, link: e.target.value })} required autoComplete={"off"} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={state.isLoading} className="mt-3 btn-block">
        <Show when={!state.isLoading}>Mint NFT <ArrowRightIcon className="icon-right" /></Show>
        <Show when={state.isLoading}><i className="fas fa-circle-notch fa-spin"></i> Minting NFT</Show>
      </Button>
      <Link href={"/products/nftstudio"} className="lead-link">View My NFTs</Link>
    </form>
  )
}

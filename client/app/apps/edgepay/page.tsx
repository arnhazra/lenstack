"use client"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import Constants from "@/_constants/appConstants"
import HTTPMethods from "@/_constants/httpMethods"
import { AppContext } from "@/_context/appStateProvider"
import useFetch from "@/_hooks/useFetch"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { toast } from "react-hot-toast"
import Web3 from "web3"

export default function Page() {
  const contractAddress = useFetch("contract-address", endPoints.getSecretConfig, HTTPMethods.POST)
  const web3Provider = new Web3(`${endPoints.infuraEndpoint}/${contractAddress?.data?.infuraSecret}`)
  const [{ userState }] = useContext(AppContext)
  const [matic, setMatic] = useState(0)
  const [receiverAddress, setReceiverAddress] = useState("")
  const [isLoading, setLoading] = useState(false)
  const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(userState.privateKey)

  const sendMatic = async (e: any) => {
    e.preventDefault()

    try {
      setLoading(true)
      await axios.post(endPoints.edgepayCreateTxEndpoint)
      const gasPrice = await web3Provider.eth.getGasPrice()

      const transactionObject = {
        from: walletAddress,
        to: receiverAddress,
        value: web3Provider.utils.toWei(matic.toString(), "ether"),
        gas: 40000,
        gasPrice: gasPrice,
      }

      const signedApprovalTx = await web3Provider.eth.accounts.signTransaction(transactionObject, userState.privateKey)

      if (signedApprovalTx.rawTransaction) {
        await web3Provider.eth.sendSignedTransaction(signedApprovalTx.rawTransaction)
        toast.success(Constants.TransactionSuccess)
      }

      else {
        toast.error(Constants.TransactionError)
      }
    }

    catch (error: any) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message)
      }

      else {
        toast.error(Constants.TransactionError)
      }
    }

    finally {
      setLoading(false)
    }
  }

  return (
    <form className="box" onSubmit={sendMatic}>
      <p className="branding">EdgePay</p>
      <p className="muted-text">Enter the wallet address to send matic</p>
      <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
        <Form.Label>Wallet address</Form.Label>
        <Form.Control disabled={isLoading} autoFocus type="text" placeholder="Ethereum Wallet Address" onChange={(e) => setReceiverAddress(e.target.value)} required autoComplete={"off"} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>MATIC Amount</Form.Label>
        <Form.Control disabled={isLoading} type="text" placeholder="MATIC Amount" onChange={(e) => setMatic(Number(e.target.value))} required autoComplete={"off"} />
      </Form.Group>
      <Button type="submit" disabled={isLoading || !userState.apiKey} className="mt-2 btn-block">
        <Show when={!isLoading}>Send {matic} MATIC <ArrowRightIcon className="icon-right" /></Show>
        <Show when={isLoading}><i className="fas fa-circle-notch fa-spin"></i> Sending MATIC</Show>
      </Button>
    </form >
  )
}

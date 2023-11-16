"use client"
import GenericHero from "@/components/GenericHero"
import Loading from "@/components/Loading"
import Show from "@/components/Show"
import { endPoints } from "@/constants/endPoints"
import Constants from "@/constants/globalConstants"
import HTTPMethods from "@/constants/httpMethods"
import { GlobalContext } from "@/context/globalStateProvider"
import useFetch from "@/hooks/useFetch"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useContext, useState } from "react"
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap"
import { toast } from "react-hot-toast"
import Web3 from "web3"

export default function Page() {
  const products = useFetch("get-products", endPoints.getProductConfig, HTTPMethods.POST, { searchQuery: "edgepay" })
  const selectedProduct = products?.data?.find((product: any) => product.productName === "edgepay")
  const secretConfig = useFetch("secret-config", endPoints.getSecretConfig, HTTPMethods.POST)
  const web3Provider = new Web3(secretConfig?.data?.infuraGateway)
  const [{ userState }] = useContext(GlobalContext)
  const [matic, setMatic] = useState(0)
  const [receiverAddress, setReceiverAddress] = useState("")
  const [isLoading, setLoading] = useState(false)
  const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(userState.privateKey)

  const sendMatic = async (e: any) => {
    e.preventDefault()

    try {
      setLoading(true)
      await axios.post(endPoints.edgepayCreateTx)
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
    <Container>
      <Show when={!products.isLoading}>
        <GenericHero>
          <p className="branding">{selectedProduct?.productName}</p>
          <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
          <div className="mb-2">
            <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
            <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
          </div>
          <form onSubmit={sendMatic}>
            <p className="muted-text mt-4">Enter the details to send matic</p>
            <Row className="g-2">
              <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                  <Form.Label>Wallet address</Form.Label>
                  <Form.Control disabled={isLoading} autoFocus type="text" placeholder="Ethereum Wallet Address" onChange={(e) => setReceiverAddress(e.target.value)} required autoComplete={"off"} />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>MATIC Amount</Form.Label>
                  <Form.Control disabled={isLoading} type="text" placeholder="MATIC Amount" onChange={(e) => setMatic(Number(e.target.value))} required autoComplete={"off"} />
                </Form.Group>
              </Col>
            </Row>
            <Col xs={12} sm={12} md={12} lg={8} xl={6}>
              <Button type="submit" disabled={isLoading || !userState.apiKey} className="mt-2 btn-block">
                <Show when={!isLoading}>Send {matic} MATIC <ArrowRightIcon className="icon-right" /></Show>
                <Show when={isLoading}><i className="fas fa-circle-notch fa-spin"></i> Sending MATIC</Show>
              </Button>
            </Col>
          </form>
        </GenericHero>
      </Show>
      <Show when={!!products.isLoading}>
        <Loading />
      </Show>
    </Container>
  )
}

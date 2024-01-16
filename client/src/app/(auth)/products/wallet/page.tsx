"use client"
import Error from "@/components/error"
import Hero from "@/components/hero"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import { GlobalContext } from "@/context/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useContext, useState } from "react"
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap"
import { toast } from "react-hot-toast"
import Web3 from "web3"

export default function Page() {
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=wallet`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "wallet")
  const web3Provider = new Web3(endPoints.infuraTransactionGateway)
  const [{ userState }] = useContext(GlobalContext)
  const [matic, setMatic] = useState(0)
  const [receiverAddress, setReceiverAddress] = useState("")
  const [isLoading, setLoading] = useState(false)
  const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(userState.privateKey)

  const sendMatic = async (e: any) => {
    e.preventDefault()

    try {
      setLoading(true)
      await axios.post(endPoints.walletCreateTx)
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
        toast.success(uiConstants.transactionSuccess)
      }

      else {
        toast.error(uiConstants.transactionError)
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
      setLoading(false)
    }
  }

  return (
    <Container>
      <Suspense condition={!products.isLoading} fallback={<Loading />}>
        <Suspense condition={!products.error} fallback={<Error />}>
          <Hero>
            <p className="branding">{uiConstants.brandName} {selectedProduct?.displayName}</p>
            <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
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
                <Button variant="primary" type="submit" disabled={isLoading} className="mt-2 btn-block">
                  <Suspense condition={!isLoading} fallback={<><i className="fas fa-circle-notch fa-spin"></i> Sending MATIC</>}>
                    Send {matic} MATIC <ArrowRightIcon className="icon-right" />
                  </Suspense>
                </Button>
              </Col>
            </form>
          </Hero>
        </Suspense>
      </Suspense>
    </Container>
  )
}

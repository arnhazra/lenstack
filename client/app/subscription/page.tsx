"use client"
import { Fragment, useContext, useState } from "react"
import { AppContext } from "@/_context/appStateProvider"
import Show from "@/_components/Show"
import useFetch from "@/_hooks/useFetch"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import Loading from "@/_components/Loading"
import { Col, Form, Row, Button } from "react-bootstrap"
import Web3 from "web3"
import axios from "axios"
import { toast } from "sonner"
import Constants from "@/_constants/appConstants"
import { ArrowRightIcon, CubeIcon, PaperPlaneIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

export default function Page() {
  const [{ userState }] = useContext(AppContext)
  const router = useRouter()
  const secretConfig = useFetch("secrets", endPoints.getSecretConfig, HTTPMethods.POST)
  const pricingDetails = useFetch("pricing", endPoints.getSubscriptionConfigEndpoint, HTTPMethods.POST)
  const [selectedPlan] = useState("Pro")
  const web3Provider = new Web3(`${endPoints.infuraEndpoint}/${secretConfig?.data?.infuraApiKey}`)
  const [isTxProcessing, setTxProcessing] = useState(false)
  const [displayTrialButton, setDisplayTrialButton] = useState(userState.trialAvailable)
  const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(userState.privateKey)

  const activateTrial = async () => {
    try {
      await axios.post(endPoints.activateTrialEndpoint)
      setDisplayTrialButton(false)
      toast.success(Constants.ToastSuccess)
    } catch (error) {
      toast.error(Constants.ToastError)
    }
  }

  const activatePro = async (e: any) => {
    e.preventDefault()

    try {
      setTxProcessing(true)
      const gasPrice = await web3Provider.eth.getGasPrice()

      const transactionObject = {
        from: walletAddress,
        to: secretConfig?.data?.lenstackNpaWalletAddress,
        value: web3Provider.utils.toWei(pricingDetails?.data?.proSubscriptionConfig?.price.toString(), "ether"),
        gas: 40000,
        gasPrice: gasPrice,
      }

      const signedApprovalTx = await web3Provider.eth.accounts.signTransaction(transactionObject, userState.privateKey)

      if (signedApprovalTx.rawTransaction) {
        const res = await web3Provider.eth.sendSignedTransaction(signedApprovalTx.rawTransaction)
        const { transactionHash } = res
        await axios.post(`${endPoints.subscribeEndpoint}`, { selectedPlan, transactionHash })
        toast.success(Constants.TransactionSuccess)
      }

      else {
        toast.error(Constants.TransactionError)
      }
    }

    catch (error) {
      toast.error(Constants.TransactionError)
    }

    finally {
      setTxProcessing(false)
      router.push("/usage")
    }
  }

  return (
    <Fragment>
      <Show when={!pricingDetails.isLoading}>
        <div className="box">
          <p className="branding">Subscription</p>
          <div className="plans mt-2">
            <p className="boxtext ms-2 mt-2">This plan, offers all apps subscriptions with {pricingDetails.data?.proSubscriptionConfig?.grantedTokens} Tokens</p>
          </div>
          <Fragment>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row className="mb-2">
                <Col className="categorycol">
                  <PaperPlaneIcon />
                </Col>
                <Col>
                  <p className="boxcategorytext">From</p>
                  <p className="boxcategorytext">
                    {userState.name}
                  </p>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col className="categorycol">
                  <CubeIcon />
                </Col>
                <Col>
                  <p className="boxcategorytext">To</p>
                  <p className="boxcategorytext">
                    Lenstack
                  </p>
                </Col>
              </Row>
            </Form.Group>
            <Show when={displayTrialButton}>
              <Button className="btn-block" onClick={activateTrial}>Activate Trial<ArrowRightIcon className="icon-right" /></Button>
            </Show>
            <Button className="btn-block" type="submit" disabled={isTxProcessing || userState.selectedPlan === "Pro"} onClick={activatePro}>
              <Show when={!isTxProcessing}>Activate Pro {pricingDetails.data?.proSubscriptionConfig?.price} MATIC<ArrowRightIcon className="icon-right" /></Show>
              <Show when={isTxProcessing}><i className="fas fa-circle-notch fa-spin"></i> Processing Payment</Show>
            </Button>
          </Fragment >
        </div>
      </Show>
      <Show when={pricingDetails.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}

"use client"
import { Fragment, useContext, useState } from "react"
import { AppContext } from "@/context/appStateProvider"
import Show from "@/components/Show"
import withAuth from "@/utils/withAuth"
import { NextPage } from "next"
import useFetch from "@/hooks/useFetch"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import Loading from "@/components/Loading"
import { useEffect } from "react"
import { Col, Form, Row, Button } from "react-bootstrap"
import Web3 from "web3"
import axios from "axios"
import { tokenABI } from "@/bin/tokenABI"
import { toast } from "react-hot-toast"
import Constants from "@/constants/appConstants"
import { nftABI } from "@/bin/nftABI"
import { vendorABI } from "@/bin/vendorABI"
import { ArrowRightIcon, CheckCircledIcon, CrossCircledIcon, CubeIcon, ModulzLogoIcon, PaperPlaneIcon } from "@radix-ui/react-icons"
import useFetchRealtime from "@/hooks/useFetchRealtime"

const SubscribePage: NextPage = () => {
    const [{ userState }] = useContext(AppContext)
    const pricingDetails = useFetch("pricing", endPoints.getSubscriptionConfigEndpoint, HTTPMethods.POST)
    const paymentStatus = useFetchRealtime("get payment status", endPoints.getPaymentStatusEndpoint, HTTPMethods.POST, {}, 2000)
    const [selectedPlan] = useState("Pro")
    const price = pricingDetails.data?.proSubscriptionConfig?.price * 10000
    const contractAddress = useFetch("contract-address", endPoints.getContractAddressList, HTTPMethods.POST)
    const web3Provider = new Web3(`${endPoints.infuraEndpoint}/${contractAddress?.data?.infuraApiKey}`)
    const [step, setStep] = useState(1)
    const [ether, setEther] = useState(price / 10000)
    const [isTxProcessing, setTxProcessing] = useState(false)
    const [txError, setTxError] = useState(false)

    useEffect(() => {
        setStep(1)
        setTxProcessing(false)
        setTxError(false)
    }, [])

    useEffect(() => {
        setEther(price / 10000)
    }, [price])

    useEffect(() => {
        axios.post(endPoints.togglePaymentStatusOffEndpoint)
    }, [])

    const subscribe = async () => {
        try {
            setTxProcessing(true)
            const { privateKey } = userState
            const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
            const tokenId = Math.floor(1000000 + Math.random() * 9000000)

            const tokenContract: any = new web3Provider.eth.Contract(tokenABI as any, contractAddress?.data?.tokenContractAddress)
            const approvalData = tokenContract.methods.approve(contractAddress?.data?.nftContractAddress, web3Provider.utils.toWei(price.toString(), "ether")).encodeABI()

            const approvalTx = {
                from: walletAddress,
                to: contractAddress?.data?.tokenContractAddress,
                data: approvalData,
                gasPrice: await web3Provider.eth.getGasPrice(),
                gas: await tokenContract.methods
                    .approve(contractAddress?.data?.nftContractAddress, web3Provider.utils.toWei(price.toString(), "ether"))
                    .estimateGas({ from: walletAddress }),
            }

            const signedApprovalTx = await web3Provider.eth.accounts.signTransaction(approvalTx, privateKey)
            if (signedApprovalTx.rawTransaction) {
                await web3Provider.eth.sendSignedTransaction(signedApprovalTx.rawTransaction)
            }

            const nftcontract: any = new web3Provider.eth.Contract(nftABI as any, contractAddress?.data?.nftContractAddress)
            const mintNFTData = nftcontract.methods.mintNFT(tokenId).encodeABI()
            const purchaseNFTData = nftcontract.methods.purchaseNFT(tokenId, web3Provider.utils.toWei(price.toString(), "ether")).encodeABI()

            const mintNFTTx = {
                from: walletAddress,
                to: contractAddress?.data?.nftContractAddress,
                data: mintNFTData,
                gasPrice: await web3Provider.eth.getGasPrice(),
                gas: 500000,
            }

            const signedmintNFTTx = await web3Provider.eth.accounts.signTransaction(mintNFTTx, privateKey)
            if (signedmintNFTTx.rawTransaction) {
                await web3Provider.eth.sendSignedTransaction(signedmintNFTTx.rawTransaction)
            }

            const purchaseNFTTx = {
                from: walletAddress,
                to: contractAddress?.data?.nftContractAddress,
                data: purchaseNFTData,
                gasPrice: await web3Provider.eth.getGasPrice(),
                gas: 500000,
            }

            const signedpurchaseNFTTx = await web3Provider.eth.accounts.signTransaction(purchaseNFTTx, privateKey)
            if (signedpurchaseNFTTx.rawTransaction) {
                const res = await web3Provider.eth.sendSignedTransaction(signedpurchaseNFTTx.rawTransaction)
                const { transactionHash } = res
                await axios.post(`${endPoints.subscribeEndpoint}`, { tokenId, selectedPlan, transactionHash })
                setTxProcessing(false)
                setTxError(false)
                setStep(2)
                toast.success(Constants.TransactionSuccess)
            }
        }

        catch (error) {
            setTxProcessing(false)
            setTxError(true)
            setStep(2)
            toast.error(Constants.TransactionError)
        }

        finally {
            await axios.post(endPoints.togglePaymentStatusOffEndpoint)
        }
    }

    const buyToken = async (e: any) => {
        e.preventDefault()
        try {
            await axios.post(endPoints.togglePaymentStatusOnEndpoint)
            setTxProcessing(true)
            const { privateKey } = userState
            const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
            const vendor = new web3Provider.eth.Contract(vendorABI as any, contractAddress?.data?.vendorContractAddress)
            const gasPrice = await web3Provider.eth.getGasPrice()
            const weiValue = web3Provider.utils.toWei(ether.toString(), "ether")

            const transaction = {
                from: walletAddress,
                to: vendor.options.address,
                value: weiValue,
                gas: await vendor.methods.buyTokens().estimateGas({ from: walletAddress, value: weiValue }),
                gasPrice: gasPrice,
                data: vendor.methods.buyTokens().encodeABI(),
            }

            const signedTransaction = await web3Provider.eth.accounts.signTransaction(transaction, privateKey)
            if (signedTransaction.rawTransaction) {
                const receipt = await web3Provider.eth.sendSignedTransaction(signedTransaction.rawTransaction)
                const txObj = {
                    fromAddress: receipt.from,
                    transactionType: "Subscribe",
                    ethAmount: ether,
                    txHash: receipt.transactionHash
                }
                subscribe()
                await axios.post(endPoints.createTransactionEndpoint, txObj)
            }
        } catch (err) {
            setTxError(true)
            setTxProcessing(false)
            setStep(2)
            toast.error(Constants.TokenPurchaseFailure)
        }
    }

    return (
        <Fragment>
            <Show when={!pricingDetails.isLoading}>
                <div className="box">
                    <p className="branding">Subscribe</p>
                    <div className="plans mt-2">
                        <p className="boxtext ms-2 mt-2">This plan, offers all product subscriptions with {pricingDetails.data?.proSubscriptionConfig?.grantedTokens} Tokens</p>
                    </div>
                    <Fragment>
                        <Show when={step === 1}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <div className="text-center mb-3">
                                    <img src={`../lenstackpay.png`} height={140} width={140} />
                                </div>
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
                                <Row className="mb-2">
                                    <Col className="categorycol">
                                        <ModulzLogoIcon />
                                    </Col>
                                    <Col>
                                        <p className="boxcategorytext">Payable Amount</p>
                                        <p className="boxcategorytext">
                                            {price / 10000} MATIC
                                        </p>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Button className="btn-block mt-2" type="submit" disabled={isTxProcessing || paymentStatus?.data?.isPaymentUnderProcess} onClick={buyToken}>
                                <Show when={!isTxProcessing && !paymentStatus?.data?.isPaymentUnderProcess}>Pay & Subscribe<ArrowRightIcon className="icon-right" /></Show>
                                <Show when={isTxProcessing || paymentStatus?.data?.isPaymentUnderProcess}><i className="fas fa-circle-notch fa-spin"></i> Processing Tx</Show>
                            </Button>
                        </Show>
                        <Show when={step === 2}>
                            <Show when={!txError}>
                                <div className="text-center">
                                    <CheckCircledIcon className="icon-large" />
                                    <p className="lead text-center mt-4">Success</p>
                                </div>
                            </Show>
                            <Show when={txError}>
                                <div className="text-center">
                                    <CrossCircledIcon className="icon-large" />
                                    <p className="lead text-center mt-4">Failed</p>
                                </div>
                            </Show>
                        </Show>
                    </Fragment >
                </div>
            </Show>
            <Show when={pricingDetails.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default withAuth(SubscribePage)
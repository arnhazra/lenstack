"use client"
import { FC, useEffect, useState, useContext } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { Fragment } from "react"
import { Tilt_Neon } from "next/font/google"
import Web3 from "web3"
import axios from "axios"
import Show from "@/components/Show"
import { tokenABI } from "@/bin/tokenABI"
import endPoints from "@/constants/apiEndpoints"
import { toast } from "react-hot-toast"
import Constants from "@/constants/appConstants"
import { AppContext } from "@/context/appStateProvider"
import { Modal } from "react-bootstrap"
import { nftABI } from "@/bin/nftABI"
import { vendorABI } from "@/bin/vendorABI"
import useFetch from "@/hooks/useFetch"
import HTTPMethods from "@/constants/httpMethods"

interface SubscribeModalProps {
    isOpened: boolean,
    price: number,
    closeModal: () => void,
    selectedPlan: string
}

const tiltNeon = Tilt_Neon({ subsets: ["latin"] })

const SubscribeModal: FC<SubscribeModalProps> = ({ isOpened, closeModal, price, selectedPlan }) => {
    const contractAddress = useFetch("contract-address", endPoints.getContractAddressList, HTTPMethods.POST)
    const web3Provider = new Web3(`${endPoints.infuraEndpoint}/${contractAddress?.data?.infuraApiKey}`)
    const [step, setStep] = useState(1)
    const [ether, setEther] = useState(price / 10000)
    const [isTxProcessing, setTxProcessing] = useState(false)
    const [txError, setTxError] = useState(false)
    const [{ userState }] = useContext(AppContext)

    useEffect(() => {
        setStep(1)
        setTxProcessing(false)
        setTxError(false)
    }, [isOpened])

    useEffect(() => {
        setEther(price / 10000)
    }, [price])

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
                await web3Provider.eth.sendSignedTransaction(signedpurchaseNFTTx.rawTransaction)
            }

            await axios.post(`${endPoints.subscribeEndpoint}`, { tokenId, selectedPlan })
            setTxProcessing(false)
            setTxError(false)
            setStep(2)
            toast.success(Constants.TransactionSuccess)
        } catch (error) {
            setTxProcessing(false)
            setTxError(true)
            setStep(2)
            toast.error(Constants.TransactionError)
        }
    }

    const buyToken = async (e: any) => {
        e.preventDefault()
        try {
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

    const hideModal = (): void => {
        if (!isTxProcessing) {
            closeModal()
        }
    }

    return (
        <Fragment>
            <Modal backdrop="static" centered show={isOpened} onHide={hideModal} className={tiltNeon.className}>
                <Modal.Header closeButton>
                    <Modal.Title>Subscribe</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <Fragment>
                        <Show when={step === 1}>
                            <FloatingLabel controlId="floatingAmount" label={`${price / 10000} MATIC`}>
                                <Form.Control disabled defaultValue={`${price / 10000} MATIC`} autoComplete={"off"} type="number" placeholder={`${price / 10000} MATIC`} />
                            </FloatingLabel>
                            <Button className="btn-block mt-4" type="submit" disabled={isTxProcessing} onClick={buyToken}>
                                <Show when={!isTxProcessing}>Pay & Subscribe<i className="fa-solid fa-circle-arrow-right"></i></Show>
                                <Show when={isTxProcessing}><i className="fa-solid fa-circle-notch fa-spin"></i> Processing Tx</Show>
                            </Button>
                        </Show>
                        <Show when={step === 2}>
                            <Show when={!txError}>
                                <div className="text-center">
                                    <i className="fa-solid fa-circle-check fa-4x"></i>
                                    <p className="lead text-center mt-4">Success</p>
                                </div>
                            </Show>
                            <Show when={txError}>
                                <div className="text-center">
                                    <i className="fa-solid fa-circle-xmark fa-4x"></i>
                                    <p className="lead text-center mt-4">Failed</p>
                                </div>
                            </Show>
                        </Show>
                    </Fragment >
                </Modal.Body>
            </Modal>
        </Fragment >
    )
}

export default SubscribeModal
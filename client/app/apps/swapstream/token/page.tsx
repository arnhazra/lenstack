"use client"
import Web3 from "web3"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import { TokenData } from "@/_types/Types"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { Badge, Button, Container } from "react-bootstrap"
import usePrompt from "@/_hooks/usePrompt"
import { AppContext } from "@/_context/appStateProvider"
import { vendorABI } from "@/_bin/vendorABI"
import { toast } from "sonner"
import Constants from "@/_constants/appConstants"
import { tokenABI } from "@/_bin/tokenABI"
import Show from "@/_components/Show"
import Loading from "@/_components/Loading"

export default function page() {
  const [{ userState }] = useContext(AppContext)
  const { promptDialog, prompt } = usePrompt()
  const searchParams = useSearchParams()
  const tokenAddress = searchParams.get("tokenAddress")
  const contractAddress = useFetch("contract-address", endPoints.getSecretConfig, HTTPMethods.POST)
  const swapstreamTokenConfig = useFetch("swapstreamtokenconfig", endPoints.getSwapstreamTokenConfig, HTTPMethods.POST)
  const web3Provider = new Web3(`${endPoints.infuraEndpoint}/${contractAddress?.data?.infuraApiKey}`)
  const selectedToken: TokenData = swapstreamTokenConfig?.data?.find((token: TokenData) => token.tokenContractAddress === tokenAddress)
  const [isTxProcessing, setTxProcessing] = useState(false)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    (async () => {
      try {
        const tokenContract = new web3Provider.eth.Contract(tokenABI as any, selectedToken?.tokenContractAddress)
        const { privateKey } = userState
        const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
        //@ts-ignore
        const result = await tokenContract.methods.balanceOf(walletAddress as any).call()
        //@ts-ignore
        const resultInEther = web3Provider.utils.fromWei(result, "ether")
        setBalance(Number(resultInEther))
      }

      catch (error) {
        setBalance(0)
      }
    })()
  }, [selectedToken?.tokenContractAddress, isTxProcessing])

  const buyToken = async () => {
    const { hasConfirmed, amount } = await prompt(`How many ${selectedToken?.tokenSymbol} you want to buy ?`)

    if (hasConfirmed && amount > 0) {
      try {
        setTxProcessing(true)
        const { privateKey } = userState
        const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
        const vendor = new web3Provider.eth.Contract(vendorABI as any, selectedToken?.vendorContractAddress)
        const gasPrice = await web3Provider.eth.getGasPrice()
        const weiValue = web3Provider.utils.toWei((amount / selectedToken?.tokensPerMatic).toString(), "ether")

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
          await web3Provider.eth.sendSignedTransaction(signedTransaction.rawTransaction)
          toast.success(Constants.TokenPurchaseSuccess)
        }
      }

      catch (err) {
        toast.error(Constants.TokenPurchaseFailure)
      }

      finally {
        setTxProcessing(false)
      }
    }
  }

  const sellToken = async () => {
    const { hasConfirmed, amount } = await prompt(`How many ${selectedToken?.tokenSymbol} you want to sell ?`)

    if (hasConfirmed && amount > 0) {
      if (amount <= balance) {
        try {
          setTxProcessing(true)
          const { privateKey } = userState
          const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
          const gasPrice = await web3Provider.eth.getGasPrice()

          const tokenContract: any = new web3Provider.eth.Contract(tokenABI as any, selectedToken?.tokenContractAddress)
          const approvalData = tokenContract.methods.approve(selectedToken?.vendorContractAddress, web3Provider.utils.toWei(amount.toString(), "ether")).encodeABI()
          const approvalTx = {
            from: walletAddress,
            to: selectedToken?.tokenContractAddress,
            data: approvalData,
            gasPrice: gasPrice,
            gas: await tokenContract.methods.approve(selectedToken?.vendorContractAddress, web3Provider.utils.toWei(amount.toString(), "ether")).estimateGas({ from: walletAddress })
          }

          const signedApprovalTx = await web3Provider.eth.accounts.signTransaction(approvalTx, privateKey)
          if (signedApprovalTx.rawTransaction) {
            await web3Provider.eth.sendSignedTransaction(signedApprovalTx.rawTransaction)
          }

          const vendor: any = new web3Provider.eth.Contract(vendorABI as any, selectedToken?.vendorContractAddress)
          const sellData = vendor.methods.sellTokens(web3Provider.utils.toWei(amount.toString(), "ether")).encodeABI()
          const sellTx = {
            from: walletAddress,
            to: selectedToken?.vendorContractAddress,
            data: sellData,
            gasPrice: gasPrice,
            gas: await vendor.methods.sellTokens(web3Provider.utils.toWei(amount.toString(), "ether")).estimateGas({ from: walletAddress })
          }

          const signedSellTx = await web3Provider.eth.accounts.signTransaction(sellTx, privateKey)
          if (signedSellTx.rawTransaction) {
            await web3Provider.eth.sendSignedTransaction(signedSellTx.rawTransaction)
            setTxProcessing(false)
            toast.success(Constants.TransactionSuccess)
          }
        } catch (err) {
          setTxProcessing(false)
          toast.error(Constants.TransactionError)
        }
      }

      else {
        toast.error("Amount must be less than your token balance")
      }
    }
  }

  return (
    <Container>
      <Show when={!swapstreamTokenConfig.isLoading && !contractAddress.isLoading}>
        <div className="jumbotron p-4">
          <p className="branding text-capitalize">{selectedToken?.tokenName}</p>
          <p className="lead mt-3">{selectedToken?.description}</p>
          <p className="lead mt-2">My {selectedToken?.tokenName} Balance</p>
          <p className="display-4">{balance} {selectedToken?.tokenSymbol}</p>
          <div className="mb-2">
            <Badge bg="dark" pill className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedToken?.tokenSymbol}</Badge>
            <Badge bg="dark" pill className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedToken?.tokensPerMatic} Tokens/MATIC</Badge>
          </div>
          <Button className="mt-2" disabled={isTxProcessing} onClick={buyToken}>
            <Show when={!isTxProcessing}>Buy Token <ArrowRightIcon className="icon-right" /></Show>
            <Show when={isTxProcessing}><i className="fas fa-circle-notch fa-spin"></i> Processing Tx</Show>
          </Button>
          <Button className="mt-2" disabled={isTxProcessing || balance === 0} onClick={sellToken}>
            <Show when={!isTxProcessing}>Sell Token <ArrowRightIcon className="icon-right" /></Show>
            <Show when={isTxProcessing}><i className="fas fa-circle-notch fa-spin"></i> Processing Tx</Show>
          </Button>
        </div>
      </Show>
      <Show when={swapstreamTokenConfig.isLoading || contractAddress.isLoading}>
        <Loading />
      </Show>
      {promptDialog()}
    </Container>
  )
}

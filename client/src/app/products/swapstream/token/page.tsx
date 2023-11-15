"use client"
import Web3 from "web3"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import useFetch from "@/hooks/useFetch"
import { GenericProductCardInterface, TokenData } from "@/types/Types"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { Badge, Button, Container, Row } from "react-bootstrap"
import usePrompt from "@/hooks/usePrompt"
import { GlobalContext } from "@/context/globalStateProvider"
import { vendorABI } from "@/bin/vendorABI"
import { toast } from "react-hot-toast"
import Constants from "@/constants/globalConstants"
import { tokenABI } from "@/bin/tokenABI"
import Show from "@/components/Show"
import Loading from "@/components/Loading"
import axios from "axios"
import GenericProductCard from "@/components/GenericProductCard"
import GenericHero from "@/components/GenericHero"

export default function page() {
  const [{ userState }] = useContext(GlobalContext)
  const { promptDialog, prompt } = usePrompt()
  const searchParams = useSearchParams()
  const tokenAddress = searchParams.get("tokenAddress")
  const swapstreamTokenConfig = useFetch("swapstreamtokenconfig", endPoints.swapstreamTokenConfigEndpoint, HTTPMethods.POST, { searchQuery: "" })
  const secretConfig = useFetch("secret-config", endPoints.getSecretConfig, HTTPMethods.POST)
  const web3Provider = new Web3(secretConfig?.data?.infuraEndpoint)
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
        await axios.post(endPoints.swapstreamCreateTxEndpoint)
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

      catch (error: any) {
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message)
        }

        else {
          toast.error(Constants.TransactionError)
        }
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
          await axios.post(endPoints.swapstreamCreateTxEndpoint)
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
            toast.success(Constants.TransactionSuccess)
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
          setTxProcessing(false)
        }
      }

      else {
        toast.error("Amount must be less than your token balance")
      }
    }
  }

  const tokensToDisplay = swapstreamTokenConfig?.data?.filter((token: any) => token.tokenContractAddress !== tokenAddress)
    .map((token: TokenData) => {
      const genericProductCardProps: GenericProductCardInterface = {
        badgeText: `${token.tokensPerMatic} Tokens/MATIC`,
        className: "decentralized",
        headerText: token.tokenName,
        footerText: token.description,
        redirectUri: `/products/swapstream/token?tokenAddress=${token.tokenContractAddress}`
      }

      return <GenericProductCard key={token.tokenContractAddress} genericProductCardProps={genericProductCardProps} />
    })

  return (
    <Container>
      <Show when={!swapstreamTokenConfig.isLoading && !secretConfig.isLoading}>
        <GenericHero>
          <p className="branding text-capitalize">{selectedToken?.tokenName}</p>
          <p className="muted-text mt-3">{selectedToken?.description}</p>
          <p className="display-4">{balance} {selectedToken?.tokenSymbol}</p>
          <p className="muted-text mt-2">{selectedToken?.tokenName} Balance</p>
          <div className="mb-2">
            <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedToken?.tokenSymbol}</Badge>
            <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedToken?.tokensPerMatic} Tokens/MATIC</Badge>
          </div>
          <Button className="mt-2" disabled={isTxProcessing || !userState.apiKey} onClick={buyToken}>
            <Show when={!isTxProcessing}>Buy Token <ArrowRightIcon className="icon-right" /></Show>
            <Show when={isTxProcessing}><i className="fas fa-circle-notch fa-spin"></i> Processing Tx</Show>
          </Button>
          <Button className="mt-2" disabled={isTxProcessing || balance === 0} onClick={sellToken}>
            <Show when={!isTxProcessing}>Sell Token <ArrowRightIcon className="icon-right" /></Show>
            <Show when={isTxProcessing}><i className="fas fa-circle-notch fa-spin"></i> Processing Tx</Show>
          </Button>
        </GenericHero>
        <Row>
          <h4 className="text-white">Other Tokens</h4>
          {tokensToDisplay}
        </Row>
      </Show>
      <Show when={swapstreamTokenConfig.isLoading || secretConfig.isLoading}>
        <Loading />
      </Show>
      {promptDialog()}
    </Container>
  )
}

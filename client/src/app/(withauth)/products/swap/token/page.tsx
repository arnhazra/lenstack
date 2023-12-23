"use client"
import Web3 from "web3"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useFetch from "@/hooks/use-fetch"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { Badge, Button, Col, Container, Row } from "react-bootstrap"
import usePrompt from "@/hooks/use-prompt"
import { GlobalContext } from "@/context/globalstate.provider"
import { vendorABI } from "@/bin/vendor-abi"
import { toast } from "react-hot-toast"
import { uiConstants } from "@/constants/global-constants"
import { tokenABI } from "@/bin/token-abi"
import Show from "@/components/show-component"
import Loading from "@/components/loading-component"
import axios from "axios"
import ProductCard, { ProductCardInterface } from "@/components/productcard-component"
import Hero from "@/components/hero-component"

interface TokenData {
  tokenName: string
  tokenSymbol: string
  tokenContractAddress: string
  vendorContractAddress: string
  tokensPerMatic: number
  description: string
}

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const { promptDialog, prompt } = usePrompt()
  const searchParams = useSearchParams()
  const tokenAddress = searchParams.get("tokenAddress")
  const swapTokenConfig = useFetch("swaptokenconfig", `${endPoints.swapTokenConfig}?searchQuery=`, HTTPMethods.GET)
  const web3Provider = new Web3(endPoints.swapSignTransactionGateway)
  const selectedToken: TokenData = swapTokenConfig?.data?.find((token: TokenData) => token.tokenContractAddress === tokenAddress)
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
    const { hasConfirmed, value } = await prompt(`How many ${selectedToken?.tokenSymbol} you want to buy ?`)

    if (hasConfirmed && Number(value) > 0) {
      try {
        setTxProcessing(true)
        await axios.post(endPoints.swapCreateTx)
        const { privateKey } = userState
        const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
        const vendor = new web3Provider.eth.Contract(vendorABI as any, selectedToken?.vendorContractAddress)
        const gasPrice = await web3Provider.eth.getGasPrice()
        const weiValue = web3Provider.utils.toWei((Number(value) / selectedToken?.tokensPerMatic).toString(), "ether")

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
          toast.success(uiConstants.tokenPurchaseSuccess)
        }
      }

      catch (error: any) {
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message)
        }

        else {
          toast.error(uiConstants.tokenPurchaseFailure)
        }
      }

      finally {
        setTxProcessing(false)
      }
    }
  }

  const sellToken = async () => {
    const { hasConfirmed, value } = await prompt(`How many ${selectedToken?.tokenSymbol} you want to sell ?`)

    if (hasConfirmed && Number(value) > 0) {
      if (Number(value) <= balance) {
        try {
          setTxProcessing(true)
          await axios.post(endPoints.swapCreateTx)
          const { privateKey } = userState
          const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
          const gasPrice = await web3Provider.eth.getGasPrice()

          const tokenContract: any = new web3Provider.eth.Contract(tokenABI as any, selectedToken?.tokenContractAddress)
          const approvalData = tokenContract.methods.approve(selectedToken?.vendorContractAddress, web3Provider.utils.toWei(value.toString(), "ether")).encodeABI()
          const approvalTx = {
            from: walletAddress,
            to: selectedToken?.tokenContractAddress,
            data: approvalData,
            gasPrice: gasPrice,
            gas: await tokenContract.methods.approve(selectedToken?.vendorContractAddress, web3Provider.utils.toWei(value.toString(), "ether")).estimateGas({ from: walletAddress })
          }

          const signedApprovalTx = await web3Provider.eth.accounts.signTransaction(approvalTx, privateKey)
          if (signedApprovalTx.rawTransaction) {
            await web3Provider.eth.sendSignedTransaction(signedApprovalTx.rawTransaction)
          }

          const vendor: any = new web3Provider.eth.Contract(vendorABI as any, selectedToken?.vendorContractAddress)
          const sellData = vendor.methods.sellTokens(web3Provider.utils.toWei(value.toString(), "ether")).encodeABI()
          const sellTx = {
            from: walletAddress,
            to: selectedToken?.vendorContractAddress,
            data: sellData,
            gasPrice: gasPrice,
            gas: await vendor.methods.sellTokens(web3Provider.utils.toWei(value.toString(), "ether")).estimateGas({ from: walletAddress })
          }

          const signedSellTx = await web3Provider.eth.accounts.signTransaction(sellTx, privateKey)
          if (signedSellTx.rawTransaction) {
            await web3Provider.eth.sendSignedTransaction(signedSellTx.rawTransaction)
            toast.success(uiConstants.tokenSellSuccess)
          }
        }

        catch (error: any) {
          if (error.response && error.response.data.message) {
            toast.error(error.response.data.message)
          }

          else {
            toast.error(uiConstants.tokenSellFailure)
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

  const tokensToDisplay = swapTokenConfig?.data?.filter((token: any) => token.tokenContractAddress !== tokenAddress)
    .map((token: TokenData) => {
      const productCardProps: ProductCardInterface = {
        badgeText: `${token.tokensPerMatic} Tokens/MATIC`,
        className: "decentralized",
        headerText: token.tokenName,
        footerText: token.description,
        redirectUri: `/products/swap/token?tokenAddress=${token.tokenContractAddress}`
      }

      return (
        <Col xs={12} sm={6} md={6} lg={4} xl={3} className="mb-4" key={token.tokenContractAddress}>
          <ProductCard productCardProps={productCardProps} />
        </Col>
      )
    })

  return (
    <Container>
      <Show when={!swapTokenConfig.isLoading}>
        <Hero>
          <p className="branding">{selectedToken?.tokenName}</p>
          <p className="muted-text mt-3">{selectedToken?.description}</p>
          <p className="display-4">{balance} {selectedToken?.tokenSymbol}</p>
          <p className="muted-text mt-2">{selectedToken?.tokenName} Balance</p>
          <div className="mb-2">
            <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedToken?.tokenSymbol}</Badge>
            <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedToken?.tokensPerMatic} Tokens/MATIC</Badge>
          </div>
          <Button variant="primary" className="mt-2" disabled={isTxProcessing} onClick={buyToken}>
            <Show when={!isTxProcessing}>Buy Token <ArrowRightIcon className="icon-right" /></Show>
            <Show when={isTxProcessing}><i className="fas fa-circle-notch fa-spin"></i> Processing Tx</Show>
          </Button>
          <Button variant="secondary" className="mt-2" disabled={isTxProcessing || balance === 0} onClick={sellToken}>
            <Show when={!isTxProcessing}>Sell Token <ArrowRightIcon className="icon-right" /></Show>
            <Show when={isTxProcessing}><i className="fas fa-circle-notch fa-spin"></i> Processing Tx</Show>
          </Button>
        </Hero>
        <Row>
          <h4 className="text-white">Other Tokens</h4>
          {tokensToDisplay}
        </Row>
      </Show>
      <Show when={swapTokenConfig.isLoading}>
        <Loading />
      </Show>
      {promptDialog()}
    </Container>
  )
}

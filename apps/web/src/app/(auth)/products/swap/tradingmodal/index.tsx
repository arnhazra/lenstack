"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { endPoints } from "@/constants/api-endpoints"
import { useContext, useEffect, useState } from "react"
import Web3 from "web3"
import { tokenABI } from "../data/token-abi"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import axios from "axios"
import { vendorABI } from "../data/vendor-abi"
import { toast } from "@/components/ui/use-toast"
import { uiConstants } from "@/constants/global-constants"
import { ToastAction } from "@/components/ui/toast"
import Suspense from "@/components/suspense"
import LoaderIcon from "@/components/loaderIcon"

interface TokenProps {
  token: {
    _id: string,
    tokenName: string,
    tokenSymbol: string,
    tokenContractAddress: string,
    vendorContractAddress: string,
    tokensPerMatic: number,
    description: string
  }
}

export function TradingModal({ token: { tokenContractAddress, tokenName, tokenSymbol, tokensPerMatic, vendorContractAddress } }: TokenProps) {
  const [{ userState }] = useContext(GlobalContext)
  const [isTxProcessing, setTxProcessing] = useState(false)
  const [balance, setBalance] = useState(0)
  const [value, setValue] = useState<number>(0)
  const [selectedTab, setSelectedTab] = useState("buy")
  const [dialogVisible, setDialogVisible] = useState(false)
  const web3Provider = new Web3(endPoints.swapTxGateway)

  useEffect(() => {
    (async () => {
      try {
        const tokenContract = new web3Provider.eth.Contract(tokenABI as any, tokenContractAddress)
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
  }, [tokenContractAddress, isTxProcessing])

  const buyToken = async () => {
    if (Number(value) > 0) {
      try {
        setTxProcessing(true)
        await axios.post(endPoints.swapCreateTx)
        const { privateKey } = userState
        const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
        const vendor = new web3Provider.eth.Contract(vendorABI as any, vendorContractAddress)
        const gasPrice = await web3Provider.eth.getGasPrice()
        const weiValue = web3Provider.utils.toWei((Number(value) / tokensPerMatic).toString(), "ether")

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
          toast({
            title: "Notification",
            description: <p className="text-neutral-600">{uiConstants.tokenPurchaseSuccess}</p>,
            action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
          })
        }
      }

      catch (error: any) {
        if (error.response && error.response.data.message) {
          toast({
            title: "Notification",
            description: <p className="text-neutral-600">{error.response.data.message}</p>,
            action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
          })
        }

        else {
          toast({
            title: "Notification",
            description: <p className="text-neutral-600">{uiConstants.tokenPurchaseFailure}</p>,
            action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
          })
        }
      }

      finally {
        setTxProcessing(false)
        setDialogVisible(false)
      }
    }
  }

  const sellToken = async () => {
    if (Number(value) <= balance) {
      try {
        setTxProcessing(true)
        await axios.post(endPoints.swapCreateTx)
        const { privateKey } = userState
        const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
        const gasPrice = await web3Provider.eth.getGasPrice()

        const tokenContract: any = new web3Provider.eth.Contract(tokenABI as any, tokenContractAddress)
        const approvalData = tokenContract.methods.approve(vendorContractAddress, web3Provider.utils.toWei(value.toString(), "ether")).encodeABI()
        const approvalTx = {
          from: walletAddress,
          to: tokenContractAddress,
          data: approvalData,
          gasPrice: gasPrice,
          gas: await tokenContract.methods.approve(vendorContractAddress, web3Provider.utils.toWei(value.toString(), "ether")).estimateGas({ from: walletAddress })
        }

        const signedApprovalTx = await web3Provider.eth.accounts.signTransaction(approvalTx, privateKey)
        if (signedApprovalTx.rawTransaction) {
          await web3Provider.eth.sendSignedTransaction(signedApprovalTx.rawTransaction)
        }

        const vendor: any = new web3Provider.eth.Contract(vendorABI as any, vendorContractAddress)
        const sellData = vendor.methods.sellTokens(web3Provider.utils.toWei(value.toString(), "ether")).encodeABI()
        const sellTx = {
          from: walletAddress,
          to: vendorContractAddress,
          data: sellData,
          gasPrice: gasPrice,
          gas: await vendor.methods.sellTokens(web3Provider.utils.toWei(value.toString(), "ether")).estimateGas({ from: walletAddress })
        }

        const signedSellTx = await web3Provider.eth.accounts.signTransaction(sellTx, privateKey)
        if (signedSellTx.rawTransaction) {
          await web3Provider.eth.sendSignedTransaction(signedSellTx.rawTransaction)
          toast({
            title: "Notification",
            description: <p className="text-neutral-600">{uiConstants.tokenSellSuccess}</p>,
            action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
          })
        }
      }

      catch (error: any) {
        if (error.response && error.response.data.message) {
          toast({
            title: "Notification",
            description: <p className="text-neutral-600">{error.response.data.message}</p>,
            action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
          })
        }

        else {
          toast({
            title: "Notification",
            description: <p className="text-neutral-600">{uiConstants.tokenSellFailure}</p>,
            action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
          })
        }
      }

      finally {
        setTxProcessing(false)
        setDialogVisible(false)
      }
    }

    else {
      toast({
        title: "Notification",
        description: <p className="text-neutral-600">Amount must be less than your token balance</p>,
        action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
      })
      setDialogVisible(false)
    }
  }

  return (
    <Dialog open={dialogVisible}>
      <DialogTrigger>
        <Button variant="outline" onClick={(): void => setDialogVisible(true)}>Buy/Sell</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">Trade {tokenName} ({tokenSymbol})</DialogTitle>
          <Tabs defaultValue="buy">
            <TabsList>
              <TabsTrigger value="buy" onClick={(): void => setSelectedTab("buy")}>Buy</TabsTrigger>
              <TabsTrigger value="sell" onClick={(): void => setSelectedTab("sell")}>Sell</TabsTrigger>
            </TabsList>
            <div className="mt-2">
              <Label htmlFor="balance">
                Your Balance
              </Label>
              <Input
                disabled
                defaultValue={balance}
                className="mt-2"
              />
            </div>
            <TabsContent value="buy">
              <div className="mt-3">
                <Label htmlFor="matic">
                  Amount to buy
                </Label>
                <Input
                  disabled={isTxProcessing}
                  placeholder="Amount to buy"
                  type="number"
                  className="mt-2"
                  onChange={(e): void => setValue(Number(e.target.value))}
                />
              </div>
            </TabsContent>
            <TabsContent value="sell">
              <div className="mt-3">
                <Label htmlFor="matic">
                  Amount to sell
                </Label>
                <Input
                  disabled={isTxProcessing}
                  placeholder="Amount to sell"
                  type="number"
                  className="mt-2"
                  onChange={(e): void => setValue(Number(e.target.value))}
                />
              </div>
            </TabsContent>
          </Tabs>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={(): void => setDialogVisible(false)} disabled={isTxProcessing}>Close</Button>
          <Button type="submit" onClick={selectedTab === "buy" ? buyToken : sellToken} disabled={isTxProcessing}>
            <Suspense condition={!isTxProcessing} fallback={<><LoaderIcon />Processing</>}>
              {selectedTab === "buy" ? "Buy Token" : "Sell Token"}
            </Suspense>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

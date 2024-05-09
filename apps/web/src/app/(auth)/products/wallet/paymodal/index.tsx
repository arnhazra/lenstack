"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoaderIcon from "@/components/loaderIcon"
import Suspense from "@/components/suspense"
import { Button } from "@/components/ui/button"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { useContext, useState } from "react"
import Web3 from "web3"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { DialogTrigger } from "@radix-ui/react-dialog"

export function PayModal() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [{ userState }] = useContext(GlobalContext)
  const web3Provider = new Web3(`${endPoints.walletTxGateway}?client_id=${userState.clientId}&client_secret=${userState.clientSecret}`)
  const [matic, setMatic] = useState(0)
  const [receiverAddress, setReceiverAddress] = useState("")
  const [isLoading, setLoading] = useState(false)
  const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(userState.privateKey)

  const sendMatic = async (e: any) => {
    e.preventDefault()

    try {
      setLoading(true)
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
        toast({
          title: "Notification",
          description: <p className="text-neutral-600">{uiConstants.transactionSuccess}</p>,
          action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
        })
      }

      else {
        toast({
          title: "Notification",
          description: <p className="text-neutral-600">{uiConstants.transactionError}</p>,
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
          description: <p className="text-neutral-600">{uiConstants.transactionError}</p>,
          action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
        })
      }
    }

    finally {
      setLoading(false)
      setModalOpen(false)
    }
  }

  return (
    <Dialog open={isModalOpen}>
      <DialogTrigger asChild>
        <Button onClick={(): void => setModalOpen(true)}>New Transaction</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send MATIC</DialogTitle>
          <DialogDescription>
            Please enter wallet address & amount to send MATIC
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="address" className="text-right">
            Wallet Address
          </Label>
          <Input
            placeholder="Wallet Address"
            className="mt-2"
            onChange={(e): void => setReceiverAddress(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="matic" className="mt-2">
            MATIC Amount
          </Label>
          <Input
            placeholder="MATIC Amount"
            type="number"
            className="mt-2"
            onChange={(e): void => setMatic(Number(e.target.value))}
          />
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={(): void => setModalOpen(false)} disabled={isLoading}>Cancel</Button>
          <Button variant="default" onClick={sendMatic} disabled={isLoading}>
            <Suspense condition={!isLoading} fallback={<><LoaderIcon />Sending</>}>
              Send
            </Suspense>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
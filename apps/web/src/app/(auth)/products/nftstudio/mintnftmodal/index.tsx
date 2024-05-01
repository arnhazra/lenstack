"use client"
import { nftABI } from "../bin/nft-abi"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { useContext, useState } from "react"
import Web3 from "web3"
import { useRouter } from "next/navigation"
import { uiConstants } from "@/constants/global-constants"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Suspense from "@/components/suspense"
import LoaderIcon from "@/components/loaderIcon"

export function MintNFTModal() {
  const nftContractAddress = useQuery(["nftcontract"], endPoints.nftstudioGetContractAddress, HTTPMethods.GET)
  const [{ userState }] = useContext(GlobalContext)
  const web3Provider = new Web3(`${endPoints.swapTxGateway}?client_id=${userState.clientId}&client_secret=${userState.clientSecret}`)
  const router = useRouter()
  const [state, setState] = useState({ name: "", description: "", link: "", isLoading: false })
  const [dialogVisible, setDialogVisible] = useState(false)

  const mintNFT = async (e: any) => {
    e.preventDefault()
    setState({ ...state, isLoading: true })
    const { privateKey } = userState
    const { address: owner } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
    const nftContract: any = new web3Provider.eth.Contract(nftABI as any, nftContractAddress?.data?.nftContractAddress)

    try {
      const { name, description, link } = state
      const isArchived = false
      const newNFTData = nftContract.methods.createNFT(name, description, link, isArchived).encodeABI()

      const newNFTTx = {
        from: owner,
        to: nftContractAddress?.data?.nftContractAddress,
        data: newNFTData,
        gasPrice: await web3Provider.eth.getGasPrice(),
        gas: 500000,
      }

      const signedNewNFTTx = await web3Provider.eth.accounts.signTransaction(newNFTTx, privateKey)
      if (signedNewNFTTx.rawTransaction) {
        await web3Provider.eth.sendSignedTransaction(signedNewNFTTx.rawTransaction)
        toast({
          title: "Notification",
          description: <p className="text-neutral-600">NFT Minting Success</p>,
          action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
        })
        setState({ ...state, isLoading: false })
        router.push("/products/nftstudio")
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
      setState({ ...state, isLoading: false })
      setDialogVisible(false)
    }
  }

  return (
    <Dialog open={dialogVisible}>
      <DialogTrigger asChild>
        <Button onClick={(): void => setDialogVisible(true)}>Mint NFT</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mint NFT</DialogTitle>
        </DialogHeader>
        <Label htmlFor="name">NFT Name</Label>
        <Input placeholder="NFT Name" onChange={(e): void => setState({ ...state, name: e.target.value })} />
        <Label htmlFor="desc">Short Description</Label>
        <Input placeholder="Short Description" onChange={(e): void => setState({ ...state, description: e.target.value })} />
        <Label htmlFor="balance">Image URI/NFT Link</Label>
        <Input placeholder="Image URI/NFT Link" onChange={(e): void => setState({ ...state, link: e.target.value })} />
        <DialogFooter>
          <Button variant="ghost" onClick={(): void => setDialogVisible(false)} disabled={state.isLoading}>Close</Button>
          <Button onClick={mintNFT} disabled={state.isLoading}>
            <Suspense condition={!state.isLoading} fallback={<><LoaderIcon /> Minting NFT</>}>
              Mint NFT
            </Suspense>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

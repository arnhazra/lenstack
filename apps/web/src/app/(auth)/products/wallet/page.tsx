"use client"
import Error from "@/app/error"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useState } from "react"
import Web3 from "web3"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import LoaderIcon from "@/components/loaderIcon"
import { CopyIcon } from "lucide-react"
import MaskText from "@/components/mask"

export default function Page() {
  const transactions = useQuery(["transactions"], endPoints.walletGetTransactions, HTTPMethods.GET)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=wallet&category=All`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "wallet")
  const [isModalOpen, setModalOpen] = useState(false)
  const web3Provider = new Web3(endPoints.walletTxGateway)
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

  const renderTransactions = transactions?.data?.map((tx: any) => {
    return (
      <TableRow className="cursor-pointer" key={tx._id}>
        <TableCell className="text-neutral-600 flex"><MaskText value={tx.workspaceId} /></TableCell>
        <TableCell className="text-right">{format(new Date(tx.createdAt), "MMM, do yyyy, h:mm a")}</TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!transactions.isLoading && !products.isLoading} fallback={<Loading />}>
      <Suspense condition={!transactions.error && !products.error} fallback={<Error />}>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <div className="flex flex-col sm:gap-4 sm:py-4">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols2 xl:grid-cols-1">
              <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                  <Card className="sm:col-span-2">
                    <CardHeader className="pb-3">
                      <CardTitle>{uiConstants.brandName} {selectedProduct?.displayName}</CardTitle>
                      <CardDescription className="max-w-lg text-balance leading-relaxed">
                        {selectedProduct?.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button onClick={(): void => setModalOpen(true)}>New Transaction</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Transaction Count</CardDescription>
                      <CardTitle className="text-4xl">{transactions?.data?.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        Total number of transactions
                        in this workspace
                      </div>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Latest Transaction</CardDescription>
                      <Suspense condition={transactions?.data?.length > 0} fallback={<CardTitle className="text-xl">No Data</CardTitle>}>
                        <CardTitle className="text-xl">{format(new Date(transactions?.data ? transactions?.data[0]?.createdAt : new Date()), "MMM, do yyyy")}</CardTitle>
                        <CardTitle className="text-xl">{format(new Date(transactions?.data ? transactions?.data[0]?.createdAt : new Date()), "h:mm a")}</CardTitle>
                      </Suspense>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        Latest event creation time
                      </div>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader className="px-7">
                      <CardTitle>Transactions</CardTitle>
                      <CardDescription>
                        Your past transactions history
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Suspense condition={transactions?.data?.length > 0} fallback={<p className="text-center">No data to display</p>}>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Workspace Id</TableHead>
                              <TableHead className="text-right">Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {renderTransactions}
                          </TableBody>
                        </Table>
                      </Suspense>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
          </div>
        </div>
        <Dialog open={isModalOpen}>
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
      </Suspense>
    </Suspense >
  )
}

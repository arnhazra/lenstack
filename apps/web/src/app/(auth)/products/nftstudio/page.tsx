"use client"
import Error from "@/components/error"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { format } from "date-fns"
import { useContext, useEffect, useState } from "react"
import Web3 from "web3"
import { nftABI } from "./bin/nft-abi"
import { MintNFTModal } from "./mintnftmodal"
import Link from "next/link"
import { ExternalLinkIcon, Hexagon } from "lucide-react"
import eventEmitter from "@/events/eventEmitter"

export default function Page() {
  const nftContractAddress = useQuery(["nftcontract"], endPoints.nftstudioGetContractAddress, HTTPMethods.GET)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=nftstudio&category=All`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "nftstudio")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [{ userState }] = useContext(GlobalContext)
  const web3Provider = new Web3(`${endPoints.nftstudioTxGateway}?client_id=${userState.clientId}&client_secret=${userState.clientSecret}`)
  const [nftList, setNFTList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)

  useEffect(() => {
    eventEmitter.onEvent("SearchEvent", (searchKeyword: string): void => setSearchQuery(searchKeyword))

    return () => {
      eventEmitter.offEvent("SearchEvent", (): void => setSearchQuery(""))
    }
  }, [])

  useEffect(() => {
    (async () => {
      if (!nftContractAddress.isLoading) {
        const nftContract: any = new web3Provider.eth.Contract(nftABI as any, nftContractAddress?.data?.nftContractAddress)
        setLoading(true)
        const { privateKey } = userState
        const { address: owner } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)

        try {
          const getNFTsByOwnerData = await nftContract.methods.getNFTsByOwner().call({ from: owner })
          setNFTList(getNFTsByOwnerData)
        }

        catch (error: any) {
          setError(true)
        }

        finally {
          setLoading(false)
        }
      }
    })()
  }, [nftContractAddress?.data])

  const renderNFTs = nftList?.filter((nft: any) => nft.name.toLowerCase().includes(searchQuery))?.map((nft: any) => {
    return (
      <TableRow className="cursor-pointer" key={nft.id}>
        <TableCell><Hexagon /></TableCell>
        <TableCell><div className="font-medium">{nft?.name}</div></TableCell>
        <TableCell className="hidden md:table-cell"><div className="font-medium">{nft?.description}</div></TableCell>
        <TableCell><div className="flex"><Link target="_blank" href={nft?.link}>Open NFT Link </Link><ExternalLinkIcon className="scale-75 -mt-1 ps-2" /></div></TableCell>
        <TableCell className="text-right hidden md:table-cell">{format(new Date(Number(nft.createdAt) * 1000), "MMM, do yyyy, h:mm a")}</TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!isLoading && !products.isLoading} fallback={<Loading />}>
      <Suspense condition={!products.error && !hasError} fallback={<Error />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>{uiConstants.brandName} {selectedProduct?.displayName}</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {selectedProduct?.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <MintNFTModal />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>What is an NFT</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-slate-600">
                    An NFT is a data file, stored on a type of digital ledger called a blockchain, which can be sold and traded.
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Your NFT Count</CardDescription>
                  <CardTitle className="text-4xl">{nftList.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Number of NFTs you minted under this contract
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="px-7">
                <CardTitle>Your NFTs</CardTitle>
                <CardDescription>
                  Your NFT Mint List
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense condition={nftList.length > 0} fallback={<p className="text-center">No data to display</p>}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead></TableHead>
                        <TableHead>NFT Name</TableHead>
                        <TableHead className="hidden md:table-cell">NFT Description</TableHead>
                        <TableHead>NFT Link</TableHead>
                        <TableHead className="hidden md:table-cell text-right">Created At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {renderNFTs}
                    </TableBody>
                  </Table>
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </Suspense >
    </Suspense >
  )
}

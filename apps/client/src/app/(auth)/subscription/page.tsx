"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { useContext, useState } from "react"
import { uiConstants } from "@/constants/global-constants"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const pricing = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const [selectedTier, setSelectedTier] = useState("as0")

  const renderPricingTiers = pricing?.data?.map((item: any) => {
    return (
      <Badge
        className="me-2 mb-2 ps-6 pe-6 pt-2 pb-2 uppercase cursor-pointer"
        variant={item.planName === selectedTier ? "default" : "outline"}
        key={item.planName}
        onClick={(): void => setSelectedTier(item.planName)}>
        {item.planName}
      </Badge>
    )
  })

  const handlePayment = async (selectedPlan: string) => {
    if (userState.hasActiveSubscription) {
      toast({
        title: "Notification",
        description: <p className="text-neutral-600">You already have an active subscription</p>
      })
    }

    else {
      try {
        const response = await axios.post(endPoints.createCheckoutSession, { selectedPlan: selectedPlan })
        window.location = response.data.redirectUrl
      }

      catch (error) {
        toast({
          title: "Notification",
          description: <p className="text-neutral-600">Error creating checkout session</p>
        })
      }
    }
  }

  const renderPricingTable = pricing?.data?.map((item: any) => {
    return (
      <TableRow className="bg-accent">
        <TableCell>
          <div className="font-medium uppercase">{item.planName}</div>
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          {Number(item.grantedCredits).toLocaleString()}
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          <Badge className="text-xs ps-4 pe-4 pt-1 pb-1" variant="secondary">
            {item.responseDelay} ms
          </Badge>
        </TableCell>
        <TableCell>
          ₹ {item.price}/mo
        </TableCell>
      </TableRow>
    )
  })

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <div className="grid flex-1 items-start gap-4 p-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-4">
                <CardHeader className="pb-3">
                  <CardTitle>Scalable Pricing</CardTitle>
                  <CardDescription className="text-balance leading-relaxed">
                    Our estimate inlcudes the total cost for your workload
                    with no hidden fees or gotchas. Reduced operational burden
                    is not calculated into account by the calculator. Those savings
                    are significant, but we like to think you can't put a price on
                    sleeping through the night.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mt-2 mb-2">
                    Select a Pricing Tier
                  </p>
                  <div className="mt-2">
                    {renderPricingTiers}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={(): Promise<void> => handlePayment(selectedTier)}>Activate & Pay ₹ {pricing?.data?.find((item: any) => item.planName === selectedTier).price}</Button>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Pricing Tiers</CardTitle>
                  <CardDescription>
                    Recent orders from your store.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pricing Tier</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Credits
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Response Delay
                        </TableHead>
                        <TableHead>
                          Price
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {renderPricingTable}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Checkout
                  </CardTitle>
                  <CardDescription>Your total today</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Tier Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt>Selected Tier</dt>
                      <dd className="uppercase">{selectedTier}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt>Granted Credits</dt>
                      <dd>{Number(pricing?.data?.find((item: any) => item.planName === selectedTier).grantedCredits).toLocaleString()}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt>Response Delay</dt>
                      <dd>{pricing?.data?.find((item: any) => item.planName === selectedTier).responseDelay} ms</dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Selected Plan Details</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Estimated Total
                      </span>
                      <span>₹ {pricing?.data?.find((item: any) => item.planName === selectedTier).price}</span>
                    </li>
                  </ul>
                </div>
                <div className="grid gap-3 mt-4">
                  <Button onClick={(): Promise<void> => handlePayment(selectedTier)}>Activate & Pay ₹ {pricing?.data?.find((item: any) => item.planName === selectedTier).price}</Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  {uiConstants.brandName} is a demo app.{" "}
                  <strong>You can test the upgrade and won&apos;t be charged.</strong>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div >
  )
}
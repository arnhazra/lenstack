"use client"
import { CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { useState } from "react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { uiConstants } from "@/constants/global-constants"
import { ToastAction } from "@/components/ui/toast"
import Loading from "@/components/loading"
import Error from "@/app/error"
import Suspense from "@/components/suspense"
import LoaderIcon from "@/components/loaderIcon"
import { useRouter } from "next/navigation"

export default function Page() {
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=copilot&category=All`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "copilot")
  const [requestBody, setRequestBody] = useState({ prompt: "", temperature: 0.9, topP: 0.1, topK: 16 })
  const [response, setReseponse] = useState<any>({})
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  const hitAPI = async (e: any) => {
    e.preventDefault()

    try {
      setReseponse({})
      setLoading(true)
      const res = await axios.post(`${endPoints.copilotGenerateEndpoint}`, requestBody)
      setReseponse(res.data)
    }

    catch (error: any) {
      setReseponse({})

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
          description: <p className="text-neutral-600">{uiConstants.toastError}</p>,
          action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
        })
      }
    }

    finally {
      setLoading(false)
    }
  }

  return (
    <Suspense condition={!products.isLoading} fallback={<Loading />}>
      <Suspense condition={!products.error} fallback={<Error />}>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <div className="flex flex-col sm:gap-4 sm:py-4">
            <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols2 xl:grid-cols-1">
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
                      <Button onClick={(): void => router.push("/apireference")}>API Reference</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Top P</CardDescription>
                      <CardTitle className="text-4xl">{requestBody.topP}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        The Current Value of Top P
                      </div>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Top K</CardDescription>
                      <CardTitle className="text-4xl">{requestBody.topK}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        The Current Value of Top K
                      </div>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader className="px-7">
                      <CardTitle>Playground</CardTitle>
                      <CardDescription>
                        Your Copilot Playground
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="relative flex-col items-start gap-8 md:flex">
                          <div className="grid w-full items-start gap-6">
                            <fieldset className="grid gap-6 rounded-lg border p-4">
                              <legend className="px-1 text-sm font-medium">
                                Settings
                              </legend>
                              <div className="grid gap-3">
                                <Label htmlFor="model">Model</Label>
                                <Input disabled defaultValue="Gemini Pro" />
                              </div>
                              <div className="grid gap-3">
                                <Label htmlFor="temperature">Temperature</Label>
                                <Input id="temperature" type="number" defaultValue={requestBody.temperature}
                                  onChange={(e): void => setRequestBody({ ...requestBody, temperature: Number(e.target.value) })}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                  <Label htmlFor="top-p">Top P</Label>
                                  <Input id="top-p" type="number" defaultValue={requestBody.topP}
                                    onChange={(e): void => setRequestBody({ ...requestBody, topP: Number(e.target.value) })}
                                  />
                                </div>
                                <div className="grid gap-3">
                                  <Label htmlFor="top-k">Top K</Label>
                                  <Input id="top-k" type="number" defaultValue={requestBody.topK}
                                    onChange={(e): void => setRequestBody({ ...requestBody, topK: Number(e.target.value) })}
                                  />
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                        <div className="relative flex h-full flex-col rounded-xl bg-muted/50 pt-4 lg:col-span-2">
                          <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring -mt-2">
                            <Label htmlFor="message" className="sr-only">
                              Message
                            </Label>
                            <Textarea
                              id="message"
                              placeholder="Type your message here..."
                              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                              onChange={(e): void => setRequestBody({ ...requestBody, prompt: e.target.value })}
                            />
                            <div className="flex items-center p-3 pt-0">
                              <Button size="sm" className="ml-auto gap-1.5 mt-4" onClick={hitAPI} disabled={isLoading}>
                                <Suspense condition={!isLoading} fallback={<><LoaderIcon />Loading</>}>
                                  Send Message<CornerDownLeft className="scale-75" />
                                </Suspense>
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4 ms-2">{response.response ?? ''}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div >
      </Suspense >
    </Suspense >
  )
}

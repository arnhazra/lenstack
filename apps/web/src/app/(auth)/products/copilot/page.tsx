"use client"
import { CornerDownLeft, Mic, Paperclip } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { useState } from "react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { uiConstants } from "@/constants/global-constants"
import { ToastAction } from "@/components/ui/toast"

export default function Page() {
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=copilot&category=All`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "copilot")
  const [prompt, setPrompt] = useState("")
  const [response, setReseponse] = useState({})
  const [isLoading, setLoading] = useState(false)

  const hitAPI = async (e: any) => {
    e.preventDefault()

    try {
      setReseponse({})
      setLoading(true)
      const res = await axios.post(`${endPoints.copilotGenerateEndpoint}`, { prompt })
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
    <div className="grid h-screen w-full">
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
                  <Button>API Reference</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Metrics Count</CardDescription>
                  <CardTitle className="text-4xl"></CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Total number of events
                    in this workspace
                  </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Latest Event</CardDescription>

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
          </div>
        </div>
      </div>
    </div>
  )
}

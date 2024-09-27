"use client"
import { CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { endPoints } from "@/constants/api-endpoints"
import { useState } from "react"
import ky from "ky"
import { toast } from "@/components/ui/use-toast"
import { brandName, uiConstants } from "@/constants/global-constants"
import Suspense from "@/components/suspense"
import LoaderIcon from "@/components/loaderIcon"
import { FETCH_TIMEOUT } from "@/lib/fetch-timeout"

export default function Page() {
  const [requestBody, setRequestBody] = useState({ prompt: "", temperature: 0.9, topP: 0.1, topK: 16 })
  const [response, setReseponse] = useState<any>({})
  const [isLoading, setLoading] = useState(false)

  const hitAPI = async (e: any) => {
    e.preventDefault()

    try {
      setReseponse({})
      setLoading(true)
      const res = await ky.post(`${endPoints.intelligenceGenerateEndpoint}`, { json: requestBody, timeout: FETCH_TIMEOUT }).json()
      setReseponse(res)
    }

    catch (error: any) {
      setReseponse({})
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{uiConstants.connectionErrorMessage}</p>
      })
    }

    finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card className="xl:col-span-2">
          <CardHeader className="px-7">
            <CardTitle>Playground</CardTitle>
            <CardDescription>
              Your {brandName} Intelligence Playground
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
                      <Input disabled defaultValue="Gemini 1.5 Flash" />
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
                <form onSubmit={hitAPI}>
                  <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring -mt-2">
                    <Label htmlFor="message" className="sr-only">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Type your message here..."
                      className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                      onChange={(e): void => setRequestBody({ ...requestBody, prompt: e.target.value })}
                    />
                    <div className="flex items-center p-3 pt-0">
                      <Button size="sm" className="ml-auto gap-1.5 mt-4" type="submit" disabled={isLoading}>
                        <Suspense condition={!isLoading} fallback={<><LoaderIcon />Loading</>}>
                          Send Message<CornerDownLeft className="scale-75" />
                        </Suspense>
                      </Button>
                    </div>
                  </div>
                </form>
                <p className="text-xs text-slate-500 mt-2 mb-2">{uiConstants.aiSafetyStatement}</p>
                <div className="mt-4 ms-2">{response?.response ?? ""}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div >
  )
}

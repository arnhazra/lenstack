"use client"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import axios from "axios"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import Suspense from "@/components/suspense"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoaderIcon from "@/components/loaderIcon"

interface AuthProviderProps {
  onAuthorized: (isAuthorized: boolean) => void
}

export default function AuthProvider({ onAuthorized }: AuthProviderProps) {
  const [isAuthLoading, setAuthLoading] = useState<boolean>(false)
  const [authStep, setAuthStep] = useState(1)
  const [state, setState] = useState({ email: "", hash: "", passKey: "" })
  const [alert, setAlert] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const generatePassKey = async (event: any) => {
    event.preventDefault()
    setAlert(uiConstants.authVerificationMessage)
    setAuthLoading(true)

    try {
      const response = await axios.post(endPoints.generatePassKey, state)
      setState({ ...state, hash: response.data.hash })
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{response.data.message}</p>
      })
      setAuthStep(2)
    }

    catch (error) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{uiConstants.connectionErrorMessage}</p>
      })
    }

    finally {
      setAuthLoading(false)
    }
  }

  const verifyPassKey = async (event: any) => {
    event.preventDefault()
    setAlert(uiConstants.authVerificationMessage)
    setAuthLoading(true)

    try {
      const response = await axios.post(endPoints.verifyPassKey, state)
      localStorage.setItem("accessToken", response.data.accessToken)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{uiConstants.authVerificationSuccess}</p>
      })
      onAuthorized(true)
    }

    catch (error: any) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{uiConstants.invalidPasskey}</p>
      })
      onAuthorized(false)
    }

    finally {
      setAuthLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 overflow-y-hidden flex justify-center items-center auth-landing">
      <Suspense condition={authStep === 1} fallback={null}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">{uiConstants.brandName}</CardTitle>
            <CardDescription>
              Enter your email to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={generatePassKey}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input className="h-12" type="email" placeholder="someone@example.com" required disabled={isAuthLoading} onChange={(e) => setState({ ...state, email: e.target.value })} autoComplete={"off"} minLength={4} maxLength={40} />
                </div>
                <Button type="submit" size="lg" className="w-full h-12" disabled={isAuthLoading}>
                  <Suspense condition={!isAuthLoading} fallback={<><LoaderIcon /> {alert}</>}>
                    Get Auth Passkey
                  </Suspense>
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center text-sm text-slate-600">
              By using {uiConstants.brandName}, you agree to our Terms of Service and Privacy Policy.
            </div>
          </CardFooter>
        </Card>
      </Suspense>
      <Suspense condition={authStep === 2} fallback={null}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">{uiConstants.brandName}</CardTitle>
            <CardDescription>
              Please verify your auth by entering the auth passkey we sent to your inbox
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={verifyPassKey}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Auth Passkey</Label>
                  <Input className="h-12" type="password" disabled={isAuthLoading} name="passKey" placeholder="XXXX-XXXX" onChange={(e) => setState({ ...state, passKey: e.target.value })} required autoComplete={"off"} />
                </div>
                <Button variant="default" type="submit" disabled={isAuthLoading} className="mt-4 w-full h-12">
                  <Suspense condition={!isAuthLoading} fallback={<><LoaderIcon /> {alert}</>}>
                    Continue
                  </Suspense>
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center text-sm text-slate-600">
              By using {uiConstants.brandName}, you agree to our Terms of Service and Privacy Policy.
            </div>
          </CardFooter>
        </Card>
      </Suspense>
    </div>
  )
}

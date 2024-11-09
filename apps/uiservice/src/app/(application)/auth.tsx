"use client"
import { brandName, uiConstants } from "@/shared/constants/global-constants"
import ky from "ky"
import { useState } from "react"
import { toast } from "@/shared/components/ui/use-toast"
import Suspense from "@/shared/components/suspense"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import LoaderIcon from "@/shared/components/loaderIcon"
import { FETCH_TIMEOUT } from "@/shared/lib/fetch-timeout"
import { endPoints } from "@/shared/constants/api-endpoints"
import Header from "../../shared/components/header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"

interface AuthProviderProps {
  onAuthorized: (isAuthorized: boolean) => void
}

export default function AuthenticationPage({
  onAuthorized,
}: AuthProviderProps) {
  const [isAuthLoading, setAuthLoading] = useState<boolean>(false)
  const [authStep, setAuthStep] = useState(1)
  const [state, setState] = useState({ email: "", hash: "", otp: "" })
  const [alert, setAlert] = useState("")
  const [newUser, setNewUser] = useState(false)
  const [name, setName] = useState("")

  const generateOTP = async (event: any) => {
    event.preventDefault()
    setAlert(uiConstants.authVerificationMessage)
    setAuthLoading(true)

    try {
      const response: any = await ky
        .post(endPoints.generateOTP, { json: state, timeout: FETCH_TIMEOUT })
        .json()
      setState({ ...state, hash: response.hash })
      toast({
        title: uiConstants.notification,
        description: <p className="text-zinc-600">{response.message}</p>,
      })

      setNewUser(response.newUser)
      setAuthStep(2)
    } catch (error) {
      toast({
        title: uiConstants.notification,
        description: (
          <p className="text-zinc-600">{uiConstants.connectionErrorMessage}</p>
        ),
      })
    } finally {
      setAuthLoading(false)
    }
  }

  const validateOTP = async (event: any) => {
    event.preventDefault()
    setAlert(uiConstants.authVerificationMessage)
    setAuthLoading(true)

    try {
      const response: any = await ky
        .post(endPoints.validateOTP, {
          json: { ...state, name },
          timeout: FETCH_TIMEOUT,
        })
        .json()
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
      toast({
        title: uiConstants.notification,
        description: (
          <p className="text-zinc-600">{uiConstants.authVerificationSuccess}</p>
        ),
      })
      onAuthorized(true)
    } catch (error: any) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-zinc-600">{uiConstants.invalidOTP}</p>,
      })
      onAuthorized(false)
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="fixed inset-0 overflow-y-auto flex justify-center items-center auth-landing">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">{brandName} Auth</CardTitle>
            <CardDescription>
              <Suspense
                condition={authStep === 1}
                fallback="Enter the OTP we sent to your email"
              >
                Enter your email to get started
              </Suspense>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Suspense condition={authStep === 1}>
                <form onSubmit={generateOTP}>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      className="h-11"
                      type="email"
                      placeholder="someone@example.com"
                      required
                      disabled={isAuthLoading}
                      onChange={(e) =>
                        setState({ ...state, email: e.target.value })
                      }
                      autoComplete={"off"}
                      minLength={4}
                      maxLength={40}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-11 mt-4"
                    disabled={isAuthLoading}
                  >
                    <Suspense
                      condition={!isAuthLoading}
                      fallback={
                        <>
                          <LoaderIcon /> {alert}
                        </>
                      }
                    >
                      Continue with Email
                    </Suspense>
                  </Button>
                </form>
              </Suspense>
              <Suspense condition={authStep === 2}>
                <form onSubmit={validateOTP}>
                  <div className="grid gap-4">
                    <Suspense condition={newUser}>
                      <div className="grid gap-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          className="h-11"
                          type="text"
                          placeholder="Your Name"
                          required
                          disabled={isAuthLoading}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete={"off"}
                          maxLength={40}
                        />
                      </div>
                    </Suspense>
                    <div className="grid gap-2">
                      <Label htmlFor="otp">One Time Password</Label>
                      <Input
                        className="h-11"
                        type="password"
                        placeholder="Enter OTP sent to your email"
                        required
                        disabled={isAuthLoading}
                        onChange={(e) =>
                          setState({ ...state, otp: e.target.value })
                        }
                        autoComplete={"off"}
                        minLength={6}
                        maxLength={6}
                      />
                    </div>
                    <Button
                      variant="default"
                      type="submit"
                      disabled={isAuthLoading}
                      className="w-full h-11"
                    >
                      <Suspense
                        condition={!isAuthLoading}
                        fallback={
                          <>
                            <LoaderIcon /> {alert}
                          </>
                        }
                      >
                        Continue
                      </Suspense>
                    </Button>
                  </div>
                </form>
              </Suspense>
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-muted-foreground"></div>
                <span className="mx-2 bg-background px-2 text-xs uppercase text-zinc-500">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-muted-foreground"></div>
              </div>
              <Button variant="outline" className="w-full">
                Continue with Google SSO
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-zinc-500">
              {uiConstants.privacyPolicyStatement}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

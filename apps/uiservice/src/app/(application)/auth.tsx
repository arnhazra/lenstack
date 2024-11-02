"use client"
import Link from "next/link"
import { DraftingCompass } from "lucide-react"
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
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden">
      <div className="relative hidden h-full flex-col bg-zinc-100 p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <Link href="/">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <DraftingCompass className="me-2" />
            {brandName}
          </div>
        </Link>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              {uiConstants.homeIntro1}, {uiConstants.homeIntro2}.
            </p>
            <footer className="text-sm">{brandName} Inc.</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {brandName} Auth
            </h1>
            <p className="text-sm text-zinc-600">
              <Suspense
                condition={authStep === 1}
                fallback="Enter the OTP we sent to your email"
              >
                Enter your email below to get started
              </Suspense>
            </p>
          </div>
          <div>
            <Suspense condition={authStep === 1} fallback={null}>
              <form onSubmit={generateOTP}>
                <div className="grid gap-4">
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
                    className="w-full h-11"
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
                      Continue
                    </Suspense>
                  </Button>
                </div>
              </form>
            </Suspense>
            <Suspense condition={authStep === 2} fallback={null}>
              <form onSubmit={validateOTP}>
                <div className="grid gap-4">
                  <Suspense condition={newUser} fallback={null}>
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
          </div>
          <p className="text-sm text-zinc-500 ">
            {uiConstants.privacyPolicyStatement}
          </p>
        </div>
      </div>
    </div>
  )
}

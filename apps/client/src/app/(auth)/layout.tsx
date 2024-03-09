"use client"
import Loading from "@/components/loading"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import axios from "axios"
import { ReactNode, useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import Suspense from "@/components/suspense"
import { Button, Form } from "react-bootstrap"
import { ArrowRightIcon } from "@radix-ui/react-icons"

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [{ appState }, dispatch] = useContext(GlobalContext)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isAuthLoading, setAuthLoading] = useState<boolean>(false)
  const [isAuthorized, setAuthorized] = useState<boolean>(false)
  const [authStep, setAuthStep] = useState(1)
  const [state, setState] = useState({ email: "", hash: "", passKey: "" })
  const [alert, setAlert] = useState("")
  const [authAlert, setAuthAlert] = useState("")

  const generatePassKey = async (event: any) => {
    event.preventDefault()
    setAlert(uiConstants.authVerificationMessage)
    setAuthLoading(true)

    try {
      const response = await axios.post(endPoints.generatePassKey, state)
      setState({ ...state, hash: response.data.hash })
      toast.success(response.data.message)
      setAuthStep(2)
    }

    catch (error) {
      toast.error(uiConstants.connectionErrorMessage)
    }

    finally {
      setAuthLoading(false)
    }
  }

  const verifyPassKey = async (event: any) => {
    event.preventDefault()
    setAuthAlert("")
    setAlert(uiConstants.authVerificationMessage)
    setAuthLoading(true)

    try {
      const response = await axios.post(endPoints.verifyPassKey, state)
      localStorage.setItem("accessToken", response.data.accessToken)
      toast.success(uiConstants.authVerificationSuccess)
      setAuthorized(true)
    }

    catch (error: any) {
      setAuthAlert(uiConstants.invalidPasskey)
      setAuthorized(false)
    }

    finally {
      setAuthLoading(false)
    }
  }

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      (async () => {
        try {
          const response = await axios.get(endPoints.userDetails)
          const userId = response.data.user._id
          const { email, privateKey, role, selectedWorkspaceId } = response.data.user
          const { name: selectedWorkspaceName, clientId, clientSecret } = response.data.workspace
          const hasActiveSubscription = response.data.hasActiveSubscription
          const { useLessEnergy, useOptimizedAPICalls, useDarkMode, useFastestNode } = response.data.sustainabilitySettings

          if (response.data.subscription) {
            const { selectedPlan, createdAt, expiresAt, remainingCredits } = response.data.subscription
            dispatch("setUserState", { selectedPlan, createdAt, expiresAt, remainingCredits })
          }

          else {
            dispatch("setUserState", { selectedPlan: "No Subscription", expiresAt: "" })
          }

          localStorage.setItem("clientId", clientId)
          localStorage.setItem("clientSecret", clientSecret)
          dispatch("setUserState", { userId, email, privateKey, role, selectedWorkspaceId, selectedWorkspaceName, clientId, clientSecret, hasActiveSubscription, useLessEnergy, useOptimizedAPICalls, useDarkMode, useFastestNode })
          dispatch("setUserState", { isAuthorized: true })
          setAuthorized(true)
        }

        catch (error: any) {
          if (error.response) {
            if (error.response.status === 401) {
              setAuthorized(false)
            }

            else {
              toast.error(uiConstants.connectionErrorMessage)
            }
          }

          else {
            toast.error(uiConstants.connectionErrorMessage)
          }
        }

        finally {
          setLoading(false)
        }
      })()
    }

    else {
      setAuthorized(false)
      setLoading(false)
    }
  }, [isAuthorized, appState.refreshId])

  return (
    <Suspense condition={!isLoading} fallback={<Loading />}>
      <Suspense condition={!isAuthorized} fallback={children}>
        <Suspense condition={authStep === 1} fallback={null}>
          <div className="container-center">
            <form className="box" onSubmit={generatePassKey}>
              <p className="branding">Auth</p>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Enter your email to get started</Form.Label>
                <Form.Control disabled={isAuthLoading} autoFocus type="email" placeholder="someone@example.com" onChange={(e) => setState({ ...state, email: e.target.value })} required autoComplete={"off"} minLength={4} maxLength={40} />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isAuthLoading} className="mt-1 btn-block">
                <Suspense condition={!isAuthLoading} fallback={<><i className="fas fa-circle-notch fa-spin"></i> {alert}</>}>
                  Get Auth Passkey <ArrowRightIcon className="icon-right" />
                </Suspense>
              </Button>
              <p className="text-muted mt-1">By using {uiConstants.brandName}, you agree to our Terms of Service and Privacy Policy.</p>
            </form>
          </div>
        </Suspense>
        <Suspense condition={authStep === 2} fallback={null}>
          <div className="container-center">
            <form className="box" onSubmit={verifyPassKey}>
              <p className="branding">Auth</p>
              <p className="text-muted">Please verify your auth by entering the auth passkey we sent to your inbox.</p>
              <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                <Form.Label>Auth Passkey</Form.Label>
                <Form.Control type="password" disabled={isAuthLoading} name="passKey" placeholder="XXXX-XXXX" onChange={(e) => setState({ ...state, passKey: e.target.value })} required autoComplete={"off"} />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isAuthLoading} className="mt-4 btn-block">
                <Suspense condition={!isAuthLoading} fallback={<><i className="fas fa-circle-notch fa-spin"></i> {alert}</>}>
                  Continue <ArrowRightIcon className="icon-right" />
                </Suspense>
              </Button>
              <p id="alert" className="mt-1 mb-1">{authAlert}</p>
            </form>
          </div>
        </Suspense>
      </Suspense>
    </Suspense>
  )
}

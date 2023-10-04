"use client"
import { Fragment, useState } from "react"
import axios from "axios"
import { Button, Form } from "react-bootstrap"
import Constants from "@/_constants/appConstants"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import { toast } from "sonner"
import { ArrowRightIcon } from "@radix-ui/react-icons"

interface AuthGuardProps {
  onAuthSuccess: () => void
  onAuthFailure: () => void
}

export default function AuthGuard({ onAuthSuccess, onAuthFailure }: AuthGuardProps) {
  const [authStep, setAuthStep] = useState(1)
  const [state, setState] = useState({ name: "", email: "", hash: "", otp: "", privateKey: "", newuser: false })
  const [alert, setAlert] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [authAlert, setAuthAlert] = useState("")

  const requestAuthCode = async (event: any) => {
    event.preventDefault()
    setAlert(Constants.AuthMessage)
    setLoading(true)

    try {
      const response = await axios.post(endPoints.requestAuthCodeEndpoint, state)
      if (response.data.newuser) {
        setState({ ...state, hash: response.data.hash, newuser: true })
      }

      else {
        setState({ ...state, hash: response.data.hash, newuser: false })
      }

      toast.success(response.data.message)
      setAuthStep(2)
      setLoading(false)
    }

    catch (error) {
      toast.error(Constants.ConnectionErrorMessage)
      setLoading(false)
    }
  }

  const verifyAuthcode = async (event: any) => {
    event.preventDefault()
    setAuthAlert("")
    setAlert(Constants.AuthMessage)
    setLoading(true)

    try {
      const response = await axios.post(endPoints.verifyAuthCodeEndpoint, state)
      localStorage.setItem("accessToken", response.data.accessToken)
      toast.success(Constants.AuthSuccess)
      setLoading(false)
      onAuthSuccess()
    }

    catch (error: any) {
      setAuthAlert(Constants.InvalidAuthCode)
      setLoading(false)
      onAuthFailure()
    }
  }

  return (
    <Fragment>
      <Show when={authStep === 1}>
        <form className="box" onSubmit={requestAuthCode}>
          <p className="branding">Auth</p>
          <p className="boxtext">Enter the email address to get started</p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control disabled={isLoading} autoFocus type="email" placeholder="someone@example.com" onChange={(e) => setState({ ...state, email: e.target.value })} required autoComplete={"off"} minLength={4} maxLength={40} />
          </Form.Group>
          <Button type="submit" disabled={isLoading} className="mt-2 btn-block">
            <Show when={!isLoading}>Get Auth Code <ArrowRightIcon className="icon-right" /></Show>
            <Show when={isLoading}><i className="fas fa-circle-notch fa-spin"></i> {alert}</Show>
          </Button>
          <p className="boxtext mt-1">By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
        </form>
      </Show>
      <Show when={authStep === 2}>
        <form className="box" onSubmit={verifyAuthcode}>
          <p className="branding">Auth</p>
          <p className="boxtext">Please verify your identity by entering the auth code we sent to your inbox.</p>
          <Show when={state.newuser}>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" disabled={isLoading} placeholder="Your Name" onChange={(e) => setState({ ...state, name: e.target.value })} required autoComplete={"off"} minLength={3} maxLength={40} />
            </Form.Group>
          </Show>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Auth Code</Form.Label>
            <Form.Control type="password" disabled={isLoading} name="otp" placeholder="Auth Code" onChange={(e) => setState({ ...state, otp: e.target.value })} required autoComplete={"off"} minLength={6} maxLength={6} />
          </Form.Group>
          <Button type="submit" disabled={isLoading} className="mt-4 btn-block">
            <Show when={!isLoading}>Continue <ArrowRightIcon className="icon-right" /></Show>
            <Show when={isLoading}><i className="fas fa-circle-notch fa-spin"></i> {alert}</Show>
          </Button>
          <p id="alert" className="mt-1 mb-1">{authAlert}</p>
        </form>
      </Show>
    </Fragment >
  )
}

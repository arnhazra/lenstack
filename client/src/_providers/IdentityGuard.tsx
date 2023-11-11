"use client"
import { Fragment, useState } from "react"
import axios from "axios"
import { Button, Form } from "react-bootstrap"
import Constants from "@/_constants/appConstants"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import { toast } from "react-hot-toast"
import { ArrowRightIcon } from "@radix-ui/react-icons"

interface IdentityGuardProps {
  onIdentitySuccess: () => void
  onIdentityFailure: () => void
}

export default function IdentityGuard({ onIdentitySuccess, onIdentityFailure }: IdentityGuardProps) {
  const [identityStep, setIdentityStep] = useState(1)
  const [state, setState] = useState({ email: "", hash: "", passKey: "" })
  const [alert, setAlert] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [identityAlert, setIdentityAlert] = useState("")

  const generatePassKey = async (event: any) => {
    event.preventDefault()
    setAlert(Constants.IdentityVerificationMessage)
    setLoading(true)

    try {
      const response = await axios.post(endPoints.generatePassKeyEndpoint, state)
      setState({ ...state, hash: response.data.hash })
      toast.success(response.data.message)
      setIdentityStep(2)
      setLoading(false)
    }

    catch (error) {
      toast.error(Constants.ConnectionErrorMessage)
      setLoading(false)
    }
  }

  const verifyPassKey = async (event: any) => {
    event.preventDefault()
    setIdentityAlert("")
    setAlert(Constants.IdentityVerificationMessage)
    setLoading(true)

    try {
      const response = await axios.post(endPoints.verifyPassKeyEndpoint, state)
      localStorage.setItem("accessToken", response.data.accessToken)
      toast.success(Constants.IdentityVerificationSuccess)
      setLoading(false)
      onIdentitySuccess()
    }

    catch (error: any) {
      setIdentityAlert(Constants.InvalidPasskey)
      setLoading(false)
      onIdentityFailure()
    }
  }

  return (
    <Fragment>
      <Show when={identityStep === 1}>
        <form className="box" onSubmit={generatePassKey}>
          <p className="branding">Identity</p>
          <p className="muted-text">Enter the email address to get started</p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control disabled={isLoading} autoFocus type="email" placeholder="someone@example.com" onChange={(e) => setState({ ...state, email: e.target.value })} required autoComplete={"off"} minLength={4} maxLength={40} />
          </Form.Group>
          <Button type="submit" disabled={isLoading} className="mt-1 btn-block">
            <Show when={!isLoading}>Get Identity Passkey <ArrowRightIcon className="icon-right" /></Show>
            <Show when={isLoading}><i className="fas fa-circle-notch fa-spin"></i> {alert}</Show>
          </Button>
          <p className="muted-text mt-1">By using Lenstack, you agree to our Terms of Service and Privacy Policy.</p>
        </form>
      </Show>
      <Show when={identityStep === 2}>
        <form className="box" onSubmit={verifyPassKey}>
          <p className="branding">Identity</p>
          <p className="muted-text">Please verify your identity by entering the identity passkey we sent to your inbox.</p>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Identity Passkey</Form.Label>
            <Form.Control type="password" disabled={isLoading} name="passKey" placeholder="XXXX-XXXX" onChange={(e) => setState({ ...state, passKey: e.target.value })} required autoComplete={"off"} />
          </Form.Group>
          <Button type="submit" disabled={isLoading} className="mt-4 btn-block">
            <Show when={!isLoading}>Continue <ArrowRightIcon className="icon-right" /></Show>
            <Show when={isLoading}><i className="fas fa-circle-notch fa-spin"></i> {alert}</Show>
          </Button>
          <p id="alert" className="mt-1 mb-1">{identityAlert}</p>
        </form>
      </Show>
    </Fragment >
  )
}

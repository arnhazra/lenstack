"use client"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import withAuth from "@/_utils/withAuth"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { AppContext } from "@/_context/appStateProvider"

function Page() {
    const searchParams = useSearchParams()
    const portfolioId = searchParams.get("portfolioid")
    const [state, setState] = useState({ principalAmount: 0, rateOfInterest: 0, tenure: 0, maturityAmount: 0, isLoading: false })
    const [{ userState }] = useContext(AppContext)
    const router = useRouter()

    const createAsset = async (e: any) => {
        e.preventDefault()
        setState({ ...state, isLoading: true })

        try {
            const { principalAmount, rateOfInterest, maturityAmount, tenure } = state
            const { apiKey } = userState
            const response = await axios.post(endPoints.wealthnowCreateAssetEndpoint, { principalAmount, rateOfInterest, portfolioId, maturityAmount, tenure, apiKey })
            toast.success("Asset Created")
            router.push(`/wealthnow/portfolio?portfolioid=${portfolioId}`)
        }

        catch (error: any) {
            setState({ ...state, isLoading: false })
            toast.error(error.response.data.msg ?? "Unable to create asset")
        }
    }

    return (
        <form className="box" onSubmit={createAsset}>
            <p className="branding">Create Asset</p>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Principal Amount</Form.Label>
                <Form.Control disabled={state.isLoading} type="number" placeholder="Principal Amount" onChange={(e) => setState({ ...state, principalAmount: Number(e.target.value) })} required autoComplete={"off"} minLength={2} maxLength={20} />
                <Form.Label className="mt-2">Rate of Interest</Form.Label>
                <Form.Control disabled={state.isLoading} type="text" placeholder="Rate of Interest" onChange={(e) => setState({ ...state, rateOfInterest: Number(e.target.value) })} autoComplete={"off"} minLength={2} maxLength={20} />
                <Form.Label className="mt-2">Tenure in months</Form.Label>
                <Form.Control disabled={state.isLoading} type="number" placeholder="Tenure in months" onChange={(e) => setState({ ...state, tenure: Number(e.target.value) })} autoComplete={"off"} minLength={2} maxLength={20} />
                <Form.Label className="mt-2">Maturity Amount</Form.Label>
                <Form.Control disabled={state.isLoading} type="number" placeholder="Maturity Amount" onChange={(e) => setState({ ...state, maturityAmount: Number(e.target.value) })} autoComplete={"off"} minLength={2} maxLength={20} />
            </Form.Group>
            <Button type="submit" disabled={state.isLoading} className="btn-block">
                <Show when={!state.isLoading}>Create Asset<ArrowRightIcon className="icon-right" /></Show>
                <Show when={state.isLoading}><i className="fas fa-circle-notch fa-spin"></i> Creating Asset</Show>
            </Button>
        </form>
    )
}

export default withAuth(Page)
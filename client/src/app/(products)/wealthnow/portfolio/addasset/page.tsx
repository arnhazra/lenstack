"use client"
import Show from "@/components/Show"
import endPoints from "@/constants/apiEndpoints"
import withAuth from "@/utils/withAuth"
import axios from "axios"
import { NextPage } from "next"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { ArrowRightIcon } from "@radix-ui/react-icons"

const WealthnowCreateAssetPage: NextPage = () => {
    const searchParams = useSearchParams()
    const portfolioId = searchParams.get("portfolioId")
    const [state, setState] = useState({ principalAmount: 0, rateOfInterest: 0, tenure: 0, maturityAmount: 0, isLoading: false })
    const router = useRouter()

    const createAsset = async (e: any) => {
        e.preventDefault()
        setState({ ...state, isLoading: true })

        try {
            const { principalAmount, rateOfInterest, maturityAmount, tenure } = state
            const response = await axios.post(endPoints.wealthnowCreateAssetEndpoint, { principalAmount, rateOfInterest, portfolioId, maturityAmount, tenure })
            toast.success("Asset Created")
            router.push(`/wealthnow/portfolio?id=${portfolioId}`)
        }

        catch (error: any) {
            console.log(error)
            setState({ ...state, isLoading: false })
            toast.error("Unable to create asset")
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

export default withAuth(WealthnowCreateAssetPage)
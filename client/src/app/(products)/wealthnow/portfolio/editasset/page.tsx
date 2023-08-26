"use client"
import Show from "@/components/Show"
import endPoints from "@/constants/apiEndpoints"
import withAuth from "@/utils/withAuth"
import axios from "axios"
import { NextPage } from "next"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import HTTPMethods from "@/constants/httpMethods"
import useFetch from "@/hooks/useFetch"

const WealthnowEditAssetPage: NextPage = () => {
    const searchParams = useSearchParams()
    const assetId = searchParams.get("assetId")
    const asset = useFetch("view asset", endPoints.wealthnowViewAssetEndpoint, HTTPMethods.POST, { assetId })
    const [state, setState] = useState({ principalAmount: 0, rateOfInterest: 0, tenure: 0, maturityAmount: 0, isLoading: false })

    useEffect(() => {
        setState({
            ...state,
            principalAmount: asset?.data?.asset?.principalAmount,
            rateOfInterest: asset?.data?.asset?.rateOfInterest,
            tenure: asset?.data?.asset?.tenure,
            maturityAmount: asset?.data?.asset?.maturityAmount,
        })
    }, [asset.data])

    const patchAsset = async (e: any) => {
        e.preventDefault()
        setState({ ...state, isLoading: true })

        try {
            const { principalAmount, rateOfInterest, maturityAmount, tenure } = state
            await axios.patch(endPoints.wealthnowEditAssetEndpoint, { assetId, principalAmount, rateOfInterest, maturityAmount, tenure })
            toast.success("Asset Patched")
        }

        catch (error: any) {
            setState({ ...state, isLoading: false })
            toast.error("Unable to patch asset")
        }

        finally {
            setState({ ...state, isLoading: false })
        }
    }

    return (
        <form className="box" onSubmit={patchAsset}>
            <p className="branding">Edit Asset</p>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Principal Amount</Form.Label>
                <Form.Control defaultValue={asset?.data?.asset?.principalAmount} disabled={state.isLoading} type="number" placeholder="Principal Amount" onChange={(e) => setState({ ...state, principalAmount: Number(e.target.value) })} required autoComplete={"off"} minLength={2} maxLength={20} />
                <Form.Label className="mt-2">Rate of Interest</Form.Label>
                <Form.Control defaultValue={asset?.data?.asset?.rateOfInterest} disabled={state.isLoading} type="text" placeholder="Rate of Interest" onChange={(e) => setState({ ...state, rateOfInterest: Number(e.target.value) })} autoComplete={"off"} minLength={2} maxLength={20} />
                <Form.Label className="mt-2">Tenure in months</Form.Label>
                <Form.Control defaultValue={asset?.data?.asset?.tenure} disabled={state.isLoading} type="number" placeholder="Tenure in months" onChange={(e) => setState({ ...state, tenure: Number(e.target.value) })} autoComplete={"off"} minLength={2} maxLength={20} />
                <Form.Label className="mt-2">Maturity Amount</Form.Label>
                <Form.Control defaultValue={asset?.data?.asset?.maturityAmount} disabled={state.isLoading} type="number" placeholder="Maturity Amount" onChange={(e) => setState({ ...state, maturityAmount: Number(e.target.value) })} autoComplete={"off"} minLength={2} maxLength={20} />
            </Form.Group>
            <Button type="submit" disabled={state.isLoading} className="btn-block">
                <Show when={!state.isLoading}>Patch Asset<ArrowRightIcon className="icon-right" /></Show>
                <Show when={state.isLoading}><i className="fas fa-circle-notch fa-spin"></i> Patching Asset</Show>
            </Button>
        </form>
    )
}

export default withAuth(WealthnowEditAssetPage)
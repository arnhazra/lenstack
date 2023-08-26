"use client"
import Show from "@/components/Show"
import endPoints from "@/constants/apiEndpoints"
import withAuth from "@/utils/withAuth"
import axios from "axios"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { toast } from "react-hot-toast"
import { ArrowRightIcon } from "@radix-ui/react-icons"

const WealthnowCreatePortfolioPage: NextPage = () => {
    const [state, setState] = useState({ name: "", isLoading: false })
    const router = useRouter()

    const createPortfolio = async (e: any) => {
        e.preventDefault()
        setState({ ...state, isLoading: true })

        try {
            const { name } = state
            const response = await axios.post(endPoints.wealthnowCreatePortfolioEndpoint, { name })
            toast.success("Portfolio Created")
            router.push(`/wealthnow/portfolio?id=${response.data.portfolio._id}`)
        }

        catch (error: any) {
            setState({ ...state, isLoading: false })
            toast.error("Unable to create portfolio")
        }
    }

    return (
        <form className="box" onSubmit={createPortfolio}>
            <p className="branding">Create Portfolio</p>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Portfolio Name</Form.Label>
                <Form.Control disabled={state.isLoading} type="text" placeholder="Acme Portfolio" onChange={(e) => setState({ ...state, name: e.target.value })} required autoComplete={"off"} minLength={4} maxLength={20} />
            </Form.Group>
            <Button type="submit" disabled={state.isLoading} className="btn-block">
                <Show when={!state.isLoading}>Create Portfolio <ArrowRightIcon className="icon-right" /></Show>
                <Show when={state.isLoading}><i className="fas fa-circle-notch fa-spin"></i> Creating Portfolio</Show>
            </Button>
            <Link href={"/wealthnow"} className="lead-link">View My Portfolios</Link>
        </form>
    )
}

export default withAuth(WealthnowCreatePortfolioPage)
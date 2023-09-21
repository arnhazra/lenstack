"use client"
import { prototypeABI } from "@/_bin/prototypeABI"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import { AppContext } from "@/_context/appStateProvider"
import useFetch from "@/_hooks/useFetch"
import withAuth from "@/_utils/withAuth"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { toast } from "react-hot-toast"
import Web3 from "web3"
import { ArrowRightIcon } from "@radix-ui/react-icons"

function Page() {
    const contractAddress = useFetch("contract-address", endPoints.getContractAddressList, HTTPMethods.POST)
    const web3Provider = new Web3(`${endPoints.infuraEndpoint}/${contractAddress?.data?.infuraApiKey}`)
    const [{ userState }] = useContext(AppContext)
    const [state, setState] = useState({ name: "", description: "", link: "", isLoading: false, apiKey: userState.apiKey })
    const usageDetails = useFetch("usage", endPoints.getUsageByApiKeyEndpoint, HTTPMethods.POST)
    const pricingDetails = useFetch("pricing", endPoints.getSubscriptionConfigEndpoint, HTTPMethods.POST)
    const [isUserEligible, setUserEligible] = useState(false)

    useEffect(() => {
        try {
            const remainingTokens = pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.grantedTokens - usageDetails.data?.usedTokens
            if (remainingTokens > 0) {
                setUserEligible(true)
            }
            else {
                setUserEligible(false)
            }
        } catch (error) {
            setUserEligible(false)
        }
    }, [userState, usageDetails.data, pricingDetails.data])

    const createPrototype = async (e: any) => {
        e.preventDefault()
        setState({ ...state, isLoading: true })
        const { privateKey } = userState
        const { address: owner } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
        const prototypeContract: any = new web3Provider.eth.Contract(prototypeABI as any, contractAddress?.data?.prototypeContractAddress)

        try {
            const { name, description, link, apiKey } = state
            const isArchived = false
            const newPrototypeData = prototypeContract.methods.createPrototype(name, description, link, apiKey, isArchived).encodeABI()

            const newPrototypeTx = {
                from: owner,
                to: contractAddress?.data?.prototypeContractAddress,
                data: newPrototypeData,
                gasPrice: await web3Provider.eth.getGasPrice(),
                gas: 500000,
            }

            const signedNewPrototypeTx = await web3Provider.eth.accounts.signTransaction(newPrototypeTx, privateKey)
            if (signedNewPrototypeTx.rawTransaction) {
                await web3Provider.eth.sendSignedTransaction(signedNewPrototypeTx.rawTransaction)
                toast.success("Prototype Created")
                setState({ ...state, isLoading: false })
            }
        }

        catch (error: any) {
            setState({ ...state, isLoading: false })
            toast.error("Fund your wallet & try again")
        }
    }

    return (
        <form className="box" onSubmit={createPrototype}>
            <p className="branding">Create Prototype</p>
            <Form.Group controlId="floatingtext">
                <Form.Label>Prototype Name</Form.Label>
                <Form.Control disabled={state.isLoading} type="text" placeholder="Acme Prototype" onChange={(e) => setState({ ...state, name: e.target.value })} required autoComplete={"off"} minLength={4} maxLength={20} />
            </Form.Group>
            <Form.Group controlId="floatingtext" className="mt-2">
                <Form.Label>Short Description</Form.Label>
                <Form.Control disabled={state.isLoading} type="text" placeholder="Lorem Ipsum Dolor ..." onChange={(e) => setState({ ...state, description: e.target.value })} required autoComplete={"off"} minLength={4} maxLength={20} />
            </Form.Group>
            <Form.Group controlId="floatingtext" className="mt-2">
                <Form.Label>Prototype Link</Form.Label>
                <Form.Control disabled={state.isLoading} type="url" placeholder="https://acme.com/prototype" onChange={(e) => setState({ ...state, link: e.target.value })} required autoComplete={"off"} minLength={4} maxLength={30} />
            </Form.Group>
            <Button type="submit" disabled={state.isLoading || !isUserEligible} className="mt-3 btn-block">
                <Show when={!state.isLoading}>Create Prototype <ArrowRightIcon className="icon-right" /></Show>
                <Show when={state.isLoading}><i className="fas fa-circle-notch fa-spin"></i> Creating Prototype</Show>
            </Button>
            <Link href={"/snowlake"} className="lead-link">View My Prototypes</Link>
        </form>
    )
}

export default withAuth(Page)
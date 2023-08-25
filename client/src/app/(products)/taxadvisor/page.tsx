"use client"
import Show from "@/components/Show"
import SourceCode from "@/components/SourceCode"
import withAuth from "@/utils/withAuth"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { NextPage } from "next"
import OpenAI from "openai"
import { Fragment, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"

const TaxAdvisorPage: NextPage = () => {
    const [userQuery, setUserQuery] = useState("")
    const [isFetching, setFetching] = useState(false)
    const [aiResponse, setAiResponse] = useState<string[]>([])
    const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true
    })

    const fetchData = async (e: any) => {
        e.preventDefault()
        setFetching(true)
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": "You are an expert in taxation, and I'll provide you with specific details. Your task is to compute the tax for a given income and suggest which taxation regime would yield the most favorable outcome. Please provide only the total tax liability without explanations.\n\nRemember to calculate old regime including exemptions.\n\nNew Tax Regime:\n- Income from Rs 0 to 3 lakh: 0% tax rate\n- Income from Rs 3 lakh to 6 lakh: 5%\n- Income from Rs 6 lakh to 9 lakh: 10%\n- Income from Rs 9 lakh to 12 lakh: 15%\n- Income from Rs 12 lakh to 15 lakh: 20%\n- Income above Rs 15 lakh: 30%\n\nOld Tax Regime:\n- Income from Rs 0 to 3,00,000: 0%\n- Income from Rs 3,00,001 to 5,00,000: 5%\n- Income from Rs 5,00,001 to 10,00,000: 20%\n- Income of Rs 10,00,001 and above: 30%\n\nExemptions in the Old Regime:\n- House Rent Allowance (HRA): Exemption for HRA component based on specific conditions.\n- Standard Deduction: Flat deduction covering employment-related expenses.\n- Leave Travel Allowance (LTA): Exemption for travel expenses during leave, under specific conditions.\n- Medical Allowance and Reimbursements: Exemption for certain medical expenses and reimbursements.\n- Children's Education Allowance: Allowance for children's education.\n- Children's Hostel Allowance: Allowance for children's hostel expenses.\n- Gratuity: Partial exemption for gratuity received on retirement or death.\n- Employer's Contribution to Provident Fund (EPF/PPF): Exemption for employer contributions up to a limit.\n- VRS Compensation: Partial exemption for Voluntary Retirement Scheme compensation.\n- Scholarships: Generally exempt for education-related scholarships.\n- Specific Allowances for Certain Professions: Exemptions for work-related expenses in specific professions.\n- Interest on Savings Account: Exemption on interest earned within a specified limit under Section 80TTA."
                },
                {
                    "role": "user",
                    "content": userQuery
                }
            ],
            temperature: 1,
            max_tokens: 2852,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        setFetching(false)
        setAiResponse(response.choices[0].message.content?.split('\n') ?? [])
    }

    return (
        <Fragment>
            <Container>
                <form className="jumbotron p-4" onSubmit={fetchData}>
                    <p className="branding">Tax Advisor</p>
                    <Form.Group controlId="floatingQuery" className="mt-2">
                        <Form.Label>Ask Your Query</Form.Label>
                        <Form.Control size="lg" type="text" disabled={isFetching} placeholder="Ask Your Query" onChange={(e) => setUserQuery(e.target.value)} autoComplete={"off"} required />
                    </Form.Group>
                    <Button type="submit" disabled={isFetching} className="btn-block mt-4">
                        <Show when={!isFetching}>Generate Tax Advice<ArrowRightIcon className="icon-right" /></Show>
                        <Show when={isFetching}><i className="fas fa-circle-notch fa-spin"></i> Fetching</Show>
                    </Button>
                    <Show when={!!aiResponse}>
                        <SourceCode>
                            {aiResponse.map(resp => <p>{resp}</p>)}
                        </SourceCode>
                    </Show>
                </form>
            </Container>
        </Fragment >
    )
}

export default withAuth(TaxAdvisorPage)
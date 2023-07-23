"use client"
import Show from '@/components/Show'
import endPoints from '@/constants/apiEndpoints'
import withAuth from '@/utils/withAuth'
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { toast } from 'react-hot-toast'

const FrostlakeCreateProjectPage: NextPage = () => {
    const [state, setState] = useState({ name: '', isLoading: false })
    const router = useRouter()

    const createProject = async (e: any) => {
        e.preventDefault()
        setState({ ...state, isLoading: true })

        try {
            const { name } = state
            const response = await axios.post(endPoints.frostlakeCreateProjectEndpoint, { name })
            toast.success('Project Created')
            router.push(`/products/frostlake/project?id=${response.data.project._id}`)
        }

        catch (error: any) {
            setState({ ...state, isLoading: false })
            toast.error('Unable to create project')
        }
    }

    return (
        <form className='box' onSubmit={createProject}>
            <p className='branding'>Create Project</p>
            <FloatingLabel controlId='floatingtext' label='Project Name'>
                <Form.Control disabled={state.isLoading} type='text' placeholder='Project Name' onChange={(e) => setState({ ...state, name: e.target.value })} required autoComplete={'off'} minLength={4} maxLength={20} />
            </FloatingLabel>
            <Button type='submit' disabled={state.isLoading} className='mt-3 btn-block'>
                <Show when={!state.isLoading}>Create Project <i className='fa-solid fa-circle-arrow-right'></i></Show>
                <Show when={state.isLoading}><i className='fas fa-circle-notch fa-spin'></i> Creating Project</Show>
            </Button>
            <Link href={'/products/frostlake/projects'} className='lead-link'>View My Projects</Link>
        </form>
    )
}

export default withAuth(FrostlakeCreateProjectPage)
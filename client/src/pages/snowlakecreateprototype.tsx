import Show from '@/components/Show'
import endPoints from '@/constants/apiEndpoints'
import { AppContext } from '@/context/appStateProvider'
import withAuth from '@/utils/withAuth'
import axios from 'axios'
import { NextPage } from 'next'
import { useContext, useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { toast } from 'react-hot-toast'

const SnowlakeCreatePrototypePage: NextPage = () => {
    const [{ userState }] = useContext(AppContext)
    const [state, setState] = useState({ title: '', description: '', link: '', isLoading: false, apiKey: userState.apiKey })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setState({ ...state, isLoading: true })
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')

        try {
            const response = await axios.post(endPoints.snowlakeCreatePrototypeEndpoint, state)
            toast.success(response.data.msg)
            setState({ ...state, isLoading: false })
        }

        catch (error: any) {
            setState({ ...state, isLoading: false })

            if (error.response && error.response.data.msg) {
                toast.error(error.response.data.msg)
            }

            else {
                toast.error('Unknown error, please try again')
            }
        }
    }

    return (
        <form className='box' onSubmit={handleSubmit}>
            <p className='branding'>Create Prototype</p>
            <FloatingLabel controlId='floatingtext' label='Prototype Name'>
                <Form.Control disabled={state.isLoading} type='text' placeholder='Prototype Name' onChange={(e) => setState({ ...state, title: e.target.value })} required autoComplete={'off'} minLength={4} maxLength={10} />
            </FloatingLabel><br />
            <FloatingLabel controlId='floatingtext' label='Prototype Description'>
                <Form.Control disabled={state.isLoading} type='text' placeholder='Prototype Description' onChange={(e) => setState({ ...state, description: e.target.value })} required autoComplete={'off'} minLength={4} maxLength={40} />
            </FloatingLabel><br />
            <FloatingLabel controlId='floatingtext' label='Prototype Link'>
                <Form.Control disabled={state.isLoading} type='url' placeholder='Prototype Link' onChange={(e) => setState({ ...state, link: e.target.value })} required autoComplete={'off'} minLength={4} maxLength={100} />
            </FloatingLabel><br />
            <Button type='submit' disabled={state.isLoading} className='mt-2 btn-block'>
                <Show when={!state.isLoading}>Create Prototype <i className='fa-solid fa-circle-arrow-right'></i></Show>
                <Show when={state.isLoading}><i className='fas fa-circle-notch fa-spin'></i> Creating Prototype</Show>
            </Button>
        </form>
    )
}

export default withAuth(SnowlakeCreatePrototypePage)
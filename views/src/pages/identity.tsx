import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import Web3 from 'web3'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import Constants from '@/constants/appConstants'
import Show from '@/components/Show'
import endPoints from '@/constants/apiEndpoints'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

const IdentityPage: NextPage = () => {
    const web3Provider = new Web3(endPoints.infuraEndpoint)
    const [identityStep, setidentityStep] = useState(1)
    const [state, setState] = useState({ name: '', email: '', hash: '', otp: '', privateKey: '', newuser: false })
    const [alert, setAlert] = useState('')
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (localStorage.hasOwnProperty('accessToken')) {
            router.push('/queryengine')
        }
    }, [])

    const requestAuthCode = async (event: any) => {
        event.preventDefault()
        setAlert(Constants.AuthMessage)
        setLoading(true)

        try {
            const response = await axios.post(endPoints.requestAuthCodeEndpoint, state)
            if (response.data.newuser) {
                const { privateKey } = web3Provider.eth.accounts.create()
                setState({ ...state, privateKey: privateKey, hash: response.data.hash, newuser: true })
            }

            else {
                setState({ ...state, hash: response.data.hash, newuser: false })
            }

            toast.success(response.data.msg)
            setidentityStep(2)
            setLoading(false)
        }

        catch (error) {
            toast.error(Constants.ConnectionErrorMessage)
            setLoading(false)
        }
    }

    const verifyAuthcode = async (event: any) => {
        event.preventDefault()
        setAlert(Constants.AuthMessage)
        setLoading(true)

        try {
            const response = await axios.post(endPoints.verifyAuthCodeEndpoint, state)
            localStorage.setItem('accessToken', response.data.accessToken)
            toast.success('Successfully authenticated')
            setLoading(false)
            router.push('/queryengine')
        }

        catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.msg)
                setLoading(false)
            }

            else {
                toast.error(Constants.ConnectionErrorMessage)
                setLoading(false)
            }
        }
    }

    return (
        <Fragment>
            <Show when={identityStep === 1}>
                <form className='box' onSubmit={requestAuthCode}>
                    <p className='branding'>Identity</p>
                    <p className='boxtext'>Enter the email address, it will be used for as your identity.</p>
                    <FloatingLabel controlId='floatingEmail' label='Your Email'>
                        <Form.Control disabled={isLoading} autoFocus type='email' placeholder='Your Email' onChange={(e) => setState({ ...state, email: e.target.value })} required autoComplete={'off'} minLength={4} maxLength={40} />
                    </FloatingLabel><br />
                    <Button type='submit' disabled={isLoading} className='mt-2 btn-block'>
                        <Show when={!isLoading}>Continue <i className='fa-solid fa-circle-arrow-right'></i></Show>
                        <Show when={isLoading}><i className='fas fa-circle-notch fa-spin'></i> {alert}</Show>
                    </Button>
                </form>
            </Show>
            <Show when={identityStep === 2}>
                <form className='box' onSubmit={verifyAuthcode}>
                    <p className='branding'>Identity</p>
                    <p className='boxtext'>Please verify your identity by entering the verification code we sent to your inbox.</p>
                    <Show when={state.newuser}>
                        <FloatingLabel controlId='floatingName' label='Your Name'>
                            <Form.Control type='text' disabled={isLoading} placeholder='Your Name' onChange={(e) => setState({ ...state, name: e.target.value })} required autoComplete={'off'} minLength={3} maxLength={40} />
                        </FloatingLabel>
                    </Show><br />
                    <FloatingLabel controlId='floatingPassword' label='Enter Verification Code'>
                        <Form.Control type='password' disabled={isLoading} name='otp' placeholder='Enter Verification Code' onChange={(e) => setState({ ...state, otp: e.target.value })} required autoComplete={'off'} minLength={6} maxLength={6} />
                    </FloatingLabel><br />
                    <Button type='submit' disabled={isLoading} className='mt-2 btn-block'>
                        <Show when={!isLoading}>Continue <i className='fa-solid fa-circle-arrow-right'></i></Show>
                        <Show when={isLoading}><i className='fas fa-circle-notch fa-spin'></i> {alert}</Show>
                    </Button>
                </form>
            </Show>
        </Fragment >
    )
}

export default IdentityPage
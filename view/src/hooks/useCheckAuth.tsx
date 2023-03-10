import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import endPoints from '../constants/Endpoints'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { GlobalContext } from '@/context/globalStateProvider'
import { unprotectedRoutes } from '@/constants/UnprotectedRoutes'

const useChcekAuth = () => {
    const [, dispatch] = useContext(GlobalContext)
    const [state, setState] = useState({ isLoaded: false })
    const router = useRouter()

    useEffect(() => {
        if (!unprotectedRoutes.includes(router.pathname)) {
            (async () => {
                try {
                    const response = await axios.post(endPoints.checkAuthEndpoint)
                    dispatch('setUserState', { userid: response.data.user._id, name: response.data.user.name })
                    setState({ isLoaded: true })
                }

                catch (error: any) {
                    if (error.response) {
                        if (error.response.status === 401) {
                            localStorage.removeItem('accessToken')
                            dispatch('setUserState', { isLoaded: true })
                            setState({ isLoaded: true })
                            router.push('/')
                        }

                        else {
                            setState({ isLoaded: true })
                            toast.error('Something went wrong')
                        }
                    }

                    else {
                        localStorage.removeItem('accessToken')
                        toast.error('Something went wrong')
                        setState({ isLoaded: true })
                        router.push('/')
                    }
                }
            })()
        }

        else {
            setState({ isLoaded: true })
        }
    }, [router.pathname])

    return state
}

export default useChcekAuth
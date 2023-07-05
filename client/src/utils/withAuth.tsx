import Loading from '@/components/Loading'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import endPoints from '@/constants/apiEndpoints'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { AppContext } from '@/context/appStateProvider'
import Constants from '@/constants/appConstants'

export default function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
    return function WithAuth(props: any) {
        const [, dispatch] = useContext(AppContext)
        const router = useRouter()
        const [isAuthenticated, setAuthenticated] = useState(false)

        useEffect(() => {
            (async () => {
                try {
                    const response = await axios.post(endPoints.userDetailsEndpoint)
                    const userid = response.data.user._id
                    const { name, email, privateKey, role } = response.data.user

                    if (response.data.subscription) {
                        const { selectedPlan, apiKey, tokenId, expiresAt } = response.data.subscription
                        dispatch('setUserState', { selectedPlan, apiKey, tokenId, subscriptionValidUpto: expiresAt })
                    }

                    dispatch('setUserState', { userid, name, email, privateKey, role })
                    setAuthenticated(true)
                }

                catch (error: any) {
                    if (error.response) {
                        if (error.response.status === 401) {
                            localStorage.removeItem('accessToken')
                            setAuthenticated(false)
                            router.push('/identity')
                        }

                        else {
                            setAuthenticated(false)
                            toast.error(Constants.ToastError)
                        }
                    }

                    else {
                        setAuthenticated(false)
                        toast.error(Constants.ToastError)
                    }
                }
            })()
        }, [router.pathname])

        if (isAuthenticated) {
            return <WrappedComponent {...props} />
        }

        return <Loading />
    }
}

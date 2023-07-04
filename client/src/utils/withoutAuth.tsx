import Loading from '@/components/Loading'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import endPoints from '@/constants/apiEndpoints'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { AppContext } from '@/context/appStateProvider'
import Constants from '@/constants/appConstants'

export default function withoutAuth<T>(WrappedComponent: React.ComponentType<T>) {
    return function WithoutAuth(props: any) {
        const router = useRouter()

        useEffect(() => {
            router.push('/dashboard')
        }, [router.pathname])

        return <WrappedComponent {...props} />
    }
}

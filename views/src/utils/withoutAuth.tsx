"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function withoutAuth<T>(WrappedComponent: React.ComponentType<T>) {
    return function WithoutAuth(props: any) {
        const router = useRouter()

        useEffect(() => {
            if (localStorage.getItem('accessToken')) {
                router.push('/dashboard')
            }
        }, [])

        return <WrappedComponent {...props} />
    }
}

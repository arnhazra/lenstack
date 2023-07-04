import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function withoutAuth<T>(WrappedComponent: React.ComponentType<T>) {
    return function WithoutAuth(props: any) {
        const router = useRouter()

        useEffect(() => {
            if (localStorage.getItem('accessToken')) {
                router.push('/dashboard')
            }
        }, [router.pathname])

        return <WrappedComponent {...props} />
    }
}

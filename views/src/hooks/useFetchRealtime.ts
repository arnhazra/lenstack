import axios, { Method } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/appConstants'

function useFetchRealtime(queryKey: string, queryUrl: string, method: Method, requestBody?: object, eventId?: string) {
    const router = useRouter()

    const fetchDataFunction = async () => {
        const { data } = await axios({ method, url: queryUrl, data: requestBody })
        return data
    }

    const { error, data, isLoading } = useQuery(
        [queryKey, requestBody, eventId],
        () => fetchDataFunction(),
        {
            enabled: true,
            refetchOnWindowFocus: true,
            refetchInterval: 60000,
            retry: 3,
            retryDelay: 2500,
            onError(err: any) {
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('accessToken')
                    router.push('/')
                }

                toast.error(`${Constants.ToastError} fetching ${queryKey}`)
            },
        }
    )

    return { error, data, isLoading }
}

export default useFetchRealtime
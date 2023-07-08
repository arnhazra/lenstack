import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import type { AppProps } from 'next/app'
import AppStateProvider from '@/context/appStateProvider'
import AppLayout from '@/layouts/AppLayout'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/global.sass'
import '@/styles/navbar.sass'
import '@/styles/button.sass'
import '@/styles/form.sass'
import '@/styles/icons.sass'
import '@/styles/productcard.sass'
import '@/styles/datasetcard.sass'

axios.interceptors.request.use((request) => {
    if (localStorage.hasOwnProperty('accessToken')) {
        request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    }
    return request
})

export default function App({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <AppStateProvider>
                <Head>
                    <title>Lenstack</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
                    <meta name='theme-color' content='#ffffff' />
                    <meta httpEquiv='Cache-Control' content='no-cache, no-store, must-revalidate' />
                    <meta name='description' content='Lenstack' />
                </Head>
                <AppLayout>
                    <Component {...pageProps} />
                </AppLayout>
            </AppStateProvider>
        </QueryClientProvider>
    )
}
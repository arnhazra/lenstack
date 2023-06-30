import { FC, Fragment, lazy, Suspense } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Error from '../components/ErrorComp'
import ProtectedRoute from './ProtectedRoute'
import AppStateProvider from '../context/appStateProvider'
import Layout from '../layouts/Layout'
import SuspenseLoading from '../components/SuspenseLoading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const HomePage = lazy(() => import('../pages/HomePage'))
const IdentityPage = lazy(() => import('../pages/IdentityPage'))
const AccountPage = lazy(() => import('../pages/AccountPage'))
const PlansPage = lazy(() => import('../pages/PlansPage'))
const TransactionsPage = lazy(() => import('../pages/TransactionsPage'))
const UsagePage = lazy(() => import('../pages/UsagePage'))
const PricingPage = lazy(() => import('../pages/PricingPage'))
const AirlakeDatasetsPage = lazy(() => import('../pages/AirlakeDatasetsPage'))
const AirlakeViewDatasetPage = lazy(() => import('../pages/AirlakeViewDatasetPage'))
const WalletPage = lazy(() => import('../pages/WalletPage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))

const AppRouter: FC = () => {
    const queryClient = new QueryClient()

    return (
        <Fragment>
            <QueryClientProvider client={queryClient}>
                <AppStateProvider>
                    <BrowserRouter basename='/'>
                        <Suspense fallback={<SuspenseLoading />}>
                            <Routes>
                                <Route element={<Layout />}>
                                    <Route path='/' element={<HomePage />} />
                                    <Route path='/identity' element={<IdentityPage />} />
                                    <Route path='/plans' element={<PlansPage />} />
                                    <Route element={<ProtectedRoute />}>
                                        <Route path='/dashboard' element={<DashboardPage />} />
                                        <Route path='/transactions' element={<TransactionsPage />} />
                                        <Route path='/account' element={<AccountPage />} />
                                        <Route path='/wallet' element={<WalletPage />} />
                                        <Route path='/usage' element={<UsagePage />} />
                                        <Route path='/pricing' element={<PricingPage />} />
                                        <Route path='/airlake/datasets' element={<AirlakeDatasetsPage />} />
                                        <Route path='/airlake/viewdataset/:id' element={<AirlakeViewDatasetPage />} />
                                        <Route path='/evolake/queryengine' element={<HomePage />} />
                                        <Route path='/evolake/queryhistory' element={<HomePage />} />
                                        <Route path='/icelake' element={<HomePage />} />
                                        <Route path='/snowlake' element={<HomePage />} />
                                    </Route>
                                    <Route path='*' element={<Error />} />
                                </Route>
                            </Routes>
                        </Suspense>
                    </BrowserRouter>
                </AppStateProvider>
            </QueryClientProvider>
        </Fragment>
    )
}

export default AppRouter
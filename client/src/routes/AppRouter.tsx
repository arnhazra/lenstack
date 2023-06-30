import { FC, Fragment, lazy, Suspense } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Error from '../components/ErrorComp'
import ProtectedRoute from './ProtectedRoute'
import AppStateProvider from '../context/appStateProvider'
import Layout from '../layouts/Layout'
import SuspenseLoading from '../components/SuspenseLoading'
const HomePage = lazy(() => import('../pages/HomePage'))
const AuthPage = lazy(() => import('../pages/AuthPage'))
const AccountPage = lazy(() => import('../pages/AccountPage'))
const WalletTransactionsPage = lazy(() => import('../pages/WalletTransactionsPage'))
const BuyCoinPage = lazy(() => import('../pages/BuyCoinPage'))
const SellCoinPage = lazy(() => import('../pages/SellCoinPage'))
const DatasetLibraryPage = lazy(() => import('../pages/DatasetLibraryPage'))
const ViewOneDatasetPage = lazy(() => import('../pages/ViewOneDatasetPage'))
const ViewSubscriptionsPage = lazy(() => import('../pages/ViewSubscriptionsPage'))

const AppRouter: FC = () => {
    return (
        <Fragment>
            <AppStateProvider>
                <BrowserRouter basename='/'>
                    <Suspense fallback={<SuspenseLoading />}>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path='/' element={<HomePage />} />
                                <Route path='/auth' element={<AuthPage />} />
                                <Route element={<ProtectedRoute />}>
                                    <Route path='/dataset/library' element={<DatasetLibraryPage />} />
                                    <Route path='/dataset/subscriptions' element={<ViewSubscriptionsPage />} />
                                    <Route path='/dataset/viewone/:datasetId' element={<ViewOneDatasetPage />} />
                                    <Route path='/wallet/transactions' element={<WalletTransactionsPage />} />
                                    <Route path='/wallet/buy' element={<BuyCoinPage />} />
                                    <Route path='/wallet/sell' element={<SellCoinPage />} />
                                    <Route path='/account' element={<AccountPage />} />
                                </Route>
                                <Route path='*' element={<Error />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </AppStateProvider>
        </Fragment>
    )
}

export default AppRouter
import { Fragment, useContext } from 'react'
import { Button } from 'react-bootstrap'
import endPoints from '@/constants/apiEndpoints'
import { useRouter } from 'next/router'
import { AppContext } from '@/context/appStateProvider'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/appConstants'
import withAuth from '@/utils/withAuth'
import { NextPage } from 'next'

const AccountPage: NextPage = () => {
    const [{ userState }] = useContext(AppContext)
    const router = useRouter()

    const signOutFromThisDevice = () => {
        localStorage.removeItem('accessToken')
        router.push('/')
    }

    const signOutFromAllDevices = async () => {
        try {
            await axios.post(endPoints.signOutEndpoint)
            localStorage.removeItem('accessToken')
            router.push('/')
        } catch (error) {
            toast.error(Constants.ToastError)
        }
    }

    return (
        <Fragment>
            <div className='box'>
                <p className='branding'>Account <i className='fa-solid fa-address-card'></i></p>
                <p className='smalltext'>Signed in As</p>
                <h4>{userState.name}</h4>
                <Button className='btn-block' onClick={signOutFromThisDevice}>Sign Out<i className='fa-solid fa-circle-arrow-right'></i></Button><br />
                <p className='lead-link' onClick={signOutFromAllDevices}>Sign out from all devices</p>
            </div>
        </Fragment >
    )
}

export default withAuth(AccountPage)
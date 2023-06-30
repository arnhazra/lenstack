import { FC, Fragment, useContext, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import Show from '../components/Show'
import { AppContext } from '../context/appStateProvider'
import axios from 'axios'
import endPoints from '../constants/apiEndpoints'
import toast from 'react-hot-toast'

const ProtectedRoute: FC = () => {
    const [{ userState }, dispatch] = useContext(AppContext)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post(endPoints.userDetailsEndpoint)
                dispatch('setUserState', { userid: response.data.user._id, name: response.data.user.name, isLoaded: true })
            }

            catch (error: any) {
                if (error.response) {
                    if (error.response.status === 401) {
                        localStorage.removeItem('accessToken')
                        dispatch('setUserState', { isLoaded: true })
                        navigate('/')
                    }

                    else {
                        dispatch('setUserState', { isLoaded: true })
                        toast.error('Something went wrong')
                    }
                }

                else {
                    localStorage.removeItem('accessToken')
                    dispatch('setUserState', { isLoaded: true })
                    navigate('/')
                }
            }
        })()
    }, [location.pathname])


    return (
        <Fragment>
            <Show when={userState.isLoaded}>
                <Outlet />
            </Show>
            <Show when={!userState.isLoaded}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default ProtectedRoute
import { FC, Fragment, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const UnprotectedRoute: FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.hasOwnProperty('accessToken')) {
            navigate('/dashboard')
        }
    }, [])

    return (
        <Fragment>
            <Outlet />
        </Fragment>
    )
}

export default UnprotectedRoute
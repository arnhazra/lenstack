import { FC, Fragment } from 'react'
import NavBar from './NavBar'

const SuspenseLoading: FC = () => {
    return (
        <Fragment>
            <NavBar />
            <div className='cover text-center'>
                <i className='fas fa-spinner fa-pulse fa-3x'></i>
            </div>
        </Fragment>
    )
}

export default SuspenseLoading
import { NextPage } from 'next'
import Constants from '@/constants/appConstants'

const ErrorPage: NextPage = () => {
    return (
        <div className='box text-center'>
            <p className='branding mb-4'>{Constants.ErrorMessage}</p>
            <i className='fa-solid fa-circle-exclamation fa-4x'></i><br /><br />
        </div>
    )
}

export default ErrorPage
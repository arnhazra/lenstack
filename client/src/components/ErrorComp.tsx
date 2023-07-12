"use client"
import { FC } from 'react'
import Constants from '@/constants/appConstants'
import { ErrorProps } from '@/types/Types'
import { Button } from 'react-bootstrap'

const Error: FC<ErrorProps> = ({ customMessage }) => {
    return (
        <div className='box'>
            <p className='branding mb-4'>{customMessage ? customMessage : Constants.ErrorMessage}</p>
            <div className='text-center mb-4'>
                <i className='fa-solid fa-circle-exclamation fa-4x '></i>
            </div>
            <Button onClick={() => window.history.back()} className='btn-block mt-2'><i className='fa-solid fa-circle-arrow-left'></i>Go Back</Button>
        </div>
    )
}

export default Error
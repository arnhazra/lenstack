import React, { FC, ReactNode } from 'react'
import { Fira_Code } from 'next/font/google'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/appConstants'

const firaCode = Fira_Code({ subsets: ['latin'] })

interface SourceCodeProps {
    children: ReactNode
}

const SourceCode: FC<SourceCodeProps> = ({ children }) => {
    const copyText = () => {
        navigator.clipboard.writeText(`${children?.toString()}`)
        toast.success(Constants.CopiedToClipBoard)
    }

    return (
        <div className={`${firaCode.className} source-code mt-4 ps-4 pt-4`}>
            <div className='copy-btn' title='copy' onClick={copyText}><i className='fa-solid fa-copy'></i></div>
            {children}
        </div >
    )
}

export default SourceCode
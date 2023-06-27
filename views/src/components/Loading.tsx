import { FC } from 'react'

const Loading: FC = () => {
    return (
        <div className='loading-container text-center'>
            <i className='fas fa-spinner fa-spin fa-4x'></i>
        </div>
    )
}

export default Loading
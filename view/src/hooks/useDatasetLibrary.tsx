import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { UseDatasetLibrary } from '../types/States'
import endPoints from '@/constants/Endpoints'

const useDatasetLibrary = ({ searchQuery, selectedFilter, selectedSortOption }: UseDatasetLibrary) => {
    const [state, setState] = useState({ datasets: [], isLoaded: false })
    const router = useRouter()

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post(endPoints.datasetLibraryEndpoint, { selectedSortOption, selectedFilter, searchQuery })
                setState({ datasets: response.data.datasets, isLoaded: true })
            }

            catch (error: any) {
                if (error.response.status === 401) {
                    localStorage.removeItem('accessToken')
                    router.push('/')
                }

                else {
                    setState({ ...state, isLoaded: true })
                    toast.error('Something went wrong')
                }
            }
        })()
    }, [selectedSortOption, selectedFilter, searchQuery])

    return state
}

export default useDatasetLibrary
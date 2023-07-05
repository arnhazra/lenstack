import withAuth from '@/utils/withAuth'
import Show from '@/components/Show'
import endPoints from '@/constants/apiEndpoints'
import { AppContext } from '@/context/appStateProvider'
import axios from 'axios'
import React, { Fragment, useContext, useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { NextPage } from 'next'
import useFetch from '@/hooks/useFetch'
import HTTPMethods from '@/constants/httpMethods'
import Link from 'next/link'
import appConstants from '@/constants/appConstants'
import SourceCode from '@/components/SourceCode'

const EvolakeQueryEnginePage: NextPage = () => {
    const [selectedDb, setSelectedDb] = useState('SQL')
    const [userQuery, setUserQuery] = useState('')
    const [dbQuery, setDbQuery] = useState('')
    const [{ userState }] = useContext(AppContext)
    const [isFetching, setFetching] = useState(false)
    const dbList = useFetch('database list', endPoints.evolakeGetDatabaseListEndpoint, HTTPMethods.POST)

    const dbToDisplay = dbList?.data?.dbOptions.map((db: any) => {
        return <option className='options' key={db.value} value={db.value}>{db.label}</option>
    })

    const fetchData = async (e: any) => {
        e.preventDefault()
        try {
            setFetching(true)
            const apiKey = userState.apiKey
            const response = await axios.post(endPoints.evolakeGenerateQueryEndpint, { selectedDb, userQuery, apiKey })
            setDbQuery(response.data.msg)
            setFetching(false)
        } catch (error: any) {
            toast.error(error?.response?.data?.msg || 'Unknown Error, try again')
            setFetching(false)
        }
    }

    const copyDBQuery = () => {
        navigator.clipboard.writeText(`${dbQuery}`)
        toast.success(appConstants.CopiedToClipBoard)
    }

    return (
        <Fragment>
            <Container>
                <form className='bigbox' onSubmit={fetchData}>
                    <p className='branding'>Query Engine</p>
                    <FloatingLabel controlId='floatingSelectGrid' label='Select Database'>
                        <Form.Select onChange={(e): void => setSelectedDb(e.target.value)}>
                            {dbToDisplay}
                        </Form.Select>
                    </FloatingLabel><br />
                    <FloatingLabel controlId='floatingQuery' label='Ask Your Query'>
                        <Form.Control type='text' disabled={isFetching} placeholder='Ask Your Query' onChange={(e) => setUserQuery(e.target.value)} autoComplete={'off'} required />
                    </FloatingLabel><br />
                    <Button type='submit' disabled={isFetching} className='btn-block'>
                        <Show when={!isFetching}>Generate DB Query <i className='fa-solid fa-circle-arrow-right'></i></Show>
                        <Show when={isFetching}><i className='fas fa-circle-notch fa-spin'></i> Fetching</Show>
                    </Button>
                    <Show when={dbQuery.length > 0}>
                        <SourceCode>
                            {dbQuery}
                        </SourceCode>
                    </Show>
                    <Link className='lead-link' href={'/evolakequeryhistory'}>My Query History</Link>
                </form>
            </Container>
        </Fragment >
    )
}

export default withAuth(EvolakeQueryEnginePage)
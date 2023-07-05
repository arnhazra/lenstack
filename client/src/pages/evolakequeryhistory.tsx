import { Fragment } from 'react'
import { NextPage } from 'next'
import endPoints from '@/constants/apiEndpoints'
import Show from '@/components/Show'
import { Button, Container, Table } from 'react-bootstrap'
import Loading from '@/components/Loading'
import useFetchRealtime from '@/hooks/useFetchRealtime'
import HTTPMethods from '@/constants/httpMethods'
import withAuth from '@/utils/withAuth'

const QueryHistoryPage: NextPage = () => {
    const queryHistory = useFetchRealtime('query history', endPoints.evolakeGetQueryHistoryEndpoint, HTTPMethods.POST)

    const queryHistoryToDisplay = queryHistory?.data?.queryHistory?.map((atc: any) => {
        return (
            <tr key={atc._id}>
                <td>{atc.query}</td>
                <td>{atc.response}</td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Show when={!queryHistory.isLoading}>
                <Container>
                    <Show when={queryHistory?.data?.queryHistory?.length > 0}>
                        <div className="text-center">
                            <Button className='tag-chip'>Query History</Button>
                        </div>
                        <Table responsive hover variant='light'>
                            <thead>
                                <tr>
                                    <th>Query</th>
                                    <th>Response</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queryHistoryToDisplay}
                            </tbody>
                        </Table>
                    </Show>
                    <Show when={queryHistory?.data?.queryHistory?.length === 0}>
                        <div className='box'>
                            <p className='branding'>History <i className='fa-solid fa-database'></i></p>
                            <p className='lead'>No historical queries to display</p>
                        </div>
                    </Show>
                </Container>
            </Show>
            <Show when={queryHistory.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default withAuth(QueryHistoryPage)
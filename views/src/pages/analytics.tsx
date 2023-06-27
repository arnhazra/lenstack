import { Fragment } from 'react'
import { NextPage } from 'next'
import endPoints from '@/constants/apiEndpoints'
import Show from '@/components/Show'
import { Container, Table } from 'react-bootstrap'
import Loading from '@/components/Loading'
import useFetchRealtime from '@/hooks/useFetchRealtime'
import HTTPMethods from '@/constants/httpMethods'

const AnalyticsPage: NextPage = () => {
    const analytics = useFetchRealtime('analytics', endPoints.getAnalyticsByUserEndpoint, HTTPMethods.POST)

    const analyticsToDisplay = analytics?.data?.analyticsList?.map((atc: any) => {
        return (
            <tr key={atc._id}>
                <td>{atc.query}</td>
                <td>{atc.response}</td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Show when={!analytics.isLoading}>
                <Container>
                    <Show when={analytics?.data?.analyticsList?.length > 0}>
                        <p className='lead text-center text-white mb-4 mt-4'>Analytics</p>
                        <Table responsive hover variant='light'>
                            <thead>
                                <tr>
                                    <th>Query</th>
                                    <th>Response</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analyticsToDisplay}
                            </tbody>
                        </Table>
                    </Show>
                    <Show when={analytics?.data?.analyticsList?.length === 0}>
                        <div className='box'>
                            <p className='branding'>Analytics <i className='fa-solid fa-database'></i></p>
                            <p className='lead'>No Analytics to display</p>
                        </div>
                    </Show>
                </Container>
            </Show>
            <Show when={analytics.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default AnalyticsPage
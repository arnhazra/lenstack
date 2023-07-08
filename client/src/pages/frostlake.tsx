import { Fragment } from 'react'
import endPoints from '@/constants/apiEndpoints'
import Show from '@/components/Show'
import { Button, Container, Table } from 'react-bootstrap'
import Loading from '@/components/Loading'
import useFetchRealtime from '@/hooks/useFetchRealtime'
import HTTPMethods from '@/constants/httpMethods'
import moment from 'moment'
import withAuth from '@/utils/withAuth'
import { NextPage } from 'next'

const FrostlakeAnalyticsPage: NextPage = () => {
    const analytics = useFetchRealtime('analytics', endPoints.frostlakeGetAnalyticsEndpoint, HTTPMethods.POST)

    const analyticsToDisplay = analytics?.data?.analyticsArray?.map((ant: any) => {
        return (
            <tr key={ant._id}>
                <td>{ant.project}</td>
                <td>{ant.component}</td>
                <td>{ant.event}</td>
                <td>{ant.info}</td>
                <td>{ant.statusCode}</td>
                <td>{moment(ant.createdAt).format('MMM, Do YYYY, h:mm a')}</td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Show when={!analytics.isLoading}>
                <Container>
                    <Show when={analytics?.data?.analyticsArray?.length > 0}>
                        <h4 className='text-white text-center'>Analytics</h4>
                        <Table responsive hover variant='light'>
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Component</th>
                                    <th>Event</th>
                                    <th>Info</th>
                                    <th>Status Code</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analyticsToDisplay}
                            </tbody>
                        </Table>
                    </Show>
                    <Show when={analytics?.data?.analyticsArray?.length === 0}>
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

export default withAuth(FrostlakeAnalyticsPage)
import { Fragment } from 'react'
import { FC } from 'react'
import endPoints from '../constants/apiEndpoints'
import Show from '../components/Show'
import { Container, Table } from 'react-bootstrap'
import Loading from '../components/Loading'
import useFetchRealtime from '../hooks/useFetchRealtime'
import HTTPMethods from '../constants/httpMethods'
import moment from 'moment'

const TransactionsPage: FC = () => {
    const transactions = useFetchRealtime('transactions', endPoints.getTransactionsEndpoint, HTTPMethods.POST)

    const transactionsToDisplay = transactions?.data?.transactions?.map((tx: any) => {
        return (
            <tr key={tx._id}>
                <td>{tx.transactionType}</td>
                <td>{tx.ethAmount} MATIC</td>
                <td>{moment(tx.date).format('MMM, Do YYYY, h:mm a')}</td>
                <td><a href={`${endPoints.polygonScanEndpoint}/${tx.txHash}`} target='_blank' rel='noopener noreferrer' className='link-table'>View on Polygonscan</a></td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Show when={!transactions.isLoading}>
                <Container>
                    <Show when={transactions?.data?.transactions?.length > 0}>
                        <p className='lead text-center text-white'>Transactions</p>
                        <Table responsive hover variant='light'>
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>MATIC Amount</th>
                                    <th>Transaction Time</th>
                                    <th>Polygon scan Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionsToDisplay}
                            </tbody>
                        </Table>
                    </Show>
                    <Show when={transactions?.data?.transactions?.length === 0}>
                        <div className='box'>
                            <p className='branding'>Transactions <i className='fa-solid fa-database'></i></p>
                            <p className='lead'>No Transactions to display</p>
                        </div>
                    </Show>
                </Container>
            </Show>
            <Show when={transactions.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default TransactionsPage
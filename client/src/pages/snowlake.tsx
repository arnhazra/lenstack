import Loading from '@/components/Loading'
import Show from '@/components/Show'
import endPoints from '@/constants/apiEndpoints'
import withAuth from '@/utils/withAuth'
import Web3 from 'web3'
import { NextPage } from 'next'
import Link from 'next/link'
import { Fragment, useContext, useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { AppContext } from '@/context/appStateProvider'
import { prototypeABI } from '@/bin/prototypeABI'
import contractAddress from '@/constants/contractAddress'
import moment from 'moment'

const SnowlakeHomePage: NextPage = () => {
    const web3Provider = new Web3(endPoints.infuraEndpoint)
    const [{ userState }] = useContext(AppContext)
    const [prototypeList, setPrototypeList] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const { privateKey } = userState
            const { address: owner } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
            const prototypeContract: any = new web3Provider.eth.Contract(prototypeABI as any, contractAddress.prototypeContractAddress)

            try {
                const getPrototypesByOwnerData = await prototypeContract.methods.getPrototypesByOwner(owner).call()
                setPrototypeList(getPrototypesByOwnerData)
                setLoading(false)
            }

            catch (error: any) {
                toast.error('Could not get the list')
                setLoading(false)
            }
        })()
    }, [])

    const prototypesToDisplay = prototypeList?.map((prototype: any) => {
        return (
            <tr key={prototype.id}>
                <td><i className='fa-solid fa-file'></i> {prototype.name}</td>
                <td>{prototype.description}</td>
                <td>{moment(Number(prototype.createdAt) * 1000).format('MMM, Do YYYY, h:mm a')}</td>
                <td><Link href={`${prototype.link}`} passHref target='_blank'><i className="fa-solid fa-square-arrow-up-right"></i></Link></td>
            </tr>
        )
    })

    return (
        <Fragment>
            <Show when={!isLoading}>
                <Container>
                    <div>
                        <Link className='btn' href={'/snowlakecreateprototype'}>Create Prototype<i className='fa-solid fa-circle-arrow-right'></i></Link>
                    </div>
                    <Show when={prototypeList.length > 0}>
                        <Button className='tag-chip'>My Prototypes</Button>
                        <Table responsive hover variant='dark'>
                            <thead>
                                <tr>
                                    <th>Prototype Name</th>
                                    <th>Description</th>
                                    <th>Created At</th>
                                    <th>View Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prototypesToDisplay}
                            </tbody>
                        </Table>
                    </Show>
                    <Show when={prototypeList.length === 0}>
                        <div className='box'>
                            <p className='branding'>Prototypes<i className='fa-solid fa-file'></i></p>
                            <p className='lead'>No Prototypes to display</p>
                        </div>
                    </Show>
                </Container>
            </Show>
            <Show when={isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default withAuth(SnowlakeHomePage)
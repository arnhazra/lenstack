import Loading from '@/components/Loading'
import Show from '@/components/Show'
import endPoints from '@/constants/apiEndpoints'
import HTTPMethods from '@/constants/httpMethods'
import useFetchRealtime from '@/hooks/useFetchRealtime'
import withAuth from '@/utils/withAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import moment from 'moment'
import { NextPage } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { toast } from 'react-hot-toast'

const SnowlakeHomePage: NextPage = () => {
    const queryClient = useQueryClient()
    const prototypeList = useFetchRealtime('list-prototypes', endPoints.snowlakeGetAllPrototypesEndpoint, HTTPMethods.POST)

    const prototypesToDisplay = prototypeList?.data?.prototypes?.map((prototype: any) => {
        return (
            <tr key={prototype._id}>
                <td><i className='fa-solid fa-file'></i> {prototype.title}</td>
                <td>{prototype.description}</td>
                <td>{moment(prototype.date).format('MMM, Do YYYY, h:mm a')}</td>
                <td><Link href={`${prototype.link}`} passHref target='_blank'><i className="fa-solid fa-square-arrow-up-right"></i></Link></td>
                <td><i className='fa-solid fa-trash' onClick={() => deleteItemMutation.mutate(prototype._id)}></i></td>
            </tr>
        )
    })

    const deletePrototype = async (prototypeId: string) => {
        try {
            await axios.delete(`${endPoints.snowlakeDeletePrototypeEndpoint}/${prototypeId}`)
            toast.success('Document Deleted')
        }

        catch (error: any) {
            toast.error('Unable to delete the document')
        }
    }

    const deleteItemMutation = useMutation(deletePrototype, {
        onSuccess: () => {
            queryClient.invalidateQueries()
        },
    })

    return (
        <Fragment>
            <Show when={!prototypeList.isLoading}>
                <Container>
                    <div>
                        <Link className='btn' href={'/snowlakecreateprototype'}>Create Prototype<i className='fa-solid fa-circle-arrow-right'></i></Link>
                    </div>
                    <Show when={prototypeList?.data?.prototypes?.length > 0}>
                        <Button className='tag-chip'>My Prototypes</Button>
                        <Table responsive hover variant='light'>
                            <thead>
                                <tr>
                                    <th>Prototype Title</th>
                                    <th>Description</th>
                                    <th>Created On</th>
                                    <th>View Link</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prototypesToDisplay}
                            </tbody>
                        </Table>
                    </Show>
                    <Show when={prototypeList?.data?.prototypes?.length === 0}>
                        <div className='box'>
                            <p className='branding'>Prototypes<i className='fa-solid fa-file'></i></p>
                            <p className='lead'>No Prototypes to display</p>
                        </div>
                    </Show>
                </Container>
            </Show>
            <Show when={prototypeList.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default withAuth(SnowlakeHomePage)
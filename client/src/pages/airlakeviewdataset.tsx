import { useContext } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Fragment } from 'react'
import Loading from '../components/Loading'
import Show from '../components/Show'
import endPoints from '../constants/apiEndpoints'
import { toast } from 'react-hot-toast'
import DatasetCard from '../components/DatasetCard'
import useFetch from '../hooks/useFetch'
import HTTPMethods from '../constants/httpMethods'
import Error from '../components/ErrorComp'
import { AppContext } from '../context/appStateProvider'
import { Rating } from 'react-simple-star-rating'
import { useRouter } from 'next/router'
import withAuth from '@/utils/withAuth'
import { NextPage } from 'next'

const AirlakeViewDatasetPage: NextPage = () => {
    const router = useRouter()
    const { id: datasetId } = router.query
    const [{ userState }] = useContext(AppContext)
    const dataset = useFetch('view dataset', endPoints.airlakeViewDatasetsEndpoint, HTTPMethods.POST, { datasetId })
    const similarDatasets = useFetch('similar datasets', endPoints.airlakeFindSimilarDatasetsEndpoint, HTTPMethods.POST, { datasetId })

    const similarDatasetsToDisplay = similarDatasets?.data?.similarDatasets?.map((dataset: any) => {
        return <DatasetCard key={dataset._id} id={dataset._id} category={dataset.category} name={dataset?.name} rating={dataset?.rating} />
    })

    const datasetTagsToDisplay = dataset?.data?.description?.split(' ').slice(0, 30).map((item: string) => {
        if (item.length > 4) {
            return <Button className='tag-chip' title='tags' key={Math.random().toString()}>{item}</Button>
        }
    })

    const copyDataAPI = (): void => {
        navigator.clipboard.writeText(`${endPoints.airlakeDataApiEndpoint}/${datasetId}/${userState.subscriptionKey}`)
        toast.success('Copied to Clipboard')
    }

    return (
        <Fragment>
            <Show when={!dataset?.isLoading && !similarDatasets?.isLoading}>
                <Show when={!dataset.error}>
                    <Container className='mt-4'>
                        <div className='jumbotron mt-4'>
                            <Row>
                                <Col xs={12} sm={12} md={4} lg={3} xl={2} className='mb-4'>
                                    <Card>
                                        <Card.Header className='pt-3'>
                                            <div className={`${dataset?.data?.category.toLowerCase()}Container pt-4`} />
                                        </Card.Header>
                                        <Card.Footer className={`pt-4 pb-2 ps-4 ${dataset?.data?.category.toLowerCase()}Color`}>
                                            <div className='nameContainer'>
                                                <p>{dataset?.data?.name}</p>
                                            </div>
                                            <p className='category'>{dataset?.data?.category}</p>
                                            <Rating className='card-rating' initialValue={dataset?.data?.rating} allowHover={false} allowFraction size={15} readonly /><br />
                                        </Card.Footer>
                                    </Card>
                                </Col >
                                <Col xs={12} sm={12} md={8} lg={9} xl={10}>
                                    <p className='display-6 text-capitalize'>{dataset?.data?.name}</p>
                                    <p className='lead'>{dataset?.data?.category}</p>
                                    <p className='lead mt-3'>{dataset?.data?.description}</p>
                                    <div>{datasetTagsToDisplay}</div>
                                    <Show when={userState.subscriptionKey.length > 0}>
                                        <Button onClick={copyDataAPI}>Data API <i className='fa-solid fa-copy'></i></Button>
                                    </Show>
                                </Col>
                            </Row>
                        </div>
                        <Row>
                            <p className='lead text-center text-white mb-4'>Similar Datasets</p>
                            {similarDatasetsToDisplay}
                        </Row>
                    </Container>
                </Show>
                <Show when={dataset.error}>
                    <Error />
                </Show>
            </Show>
            <Show when={dataset?.isLoading || similarDatasets?.isLoading}>
                <Loading />
            </Show>
        </Fragment >
    )
}

export default withAuth(AirlakeViewDatasetPage)
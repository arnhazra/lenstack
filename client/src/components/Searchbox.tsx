import { AppContext } from '@/context/appStateProvider'
import React, { ChangeEvent, useContext, useMemo } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import debounce from 'lodash.debounce'

const Searchbox = () => {
    const [{ datasetRequestState }, dispatch] = useContext(AppContext)

    const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch('setDatasetRequestState', { searchQuery: event.target.value, offset: 0 })
    }

    const debouncedChangeHandler = useMemo(() => debounce(searchChangeHandler, 1000), [])

    return (
        <Container>
            <div className='jumbotron product-header'>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={4} xl={2}>

                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} xl={8}>
                        <Form.Control className='searchbox' type='Search' defaultValue={datasetRequestState.searchQuery} onChange={debouncedChangeHandler} placeholder='What are you looking for today?' required autoComplete={'off'} minLength={4} maxLength={40} />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} xl={2}>

                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default Searchbox
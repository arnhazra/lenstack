import SourceCode from '@/components/SourceCode'
import endPoints from '@/constants/apiEndpoints'
import withAuth from '@/utils/withAuth'
import { NextPage } from 'next'
import { Container, FloatingLabel, Form } from 'react-bootstrap'

const APIDocPage: NextPage = () => {
    return (
        <Container>
            <div className="jumbotron mt-4 p-4">
                <p className="branding">Airlake</p>
                <FloatingLabel controlId='floatingtext' label='Airlake Data API - Method : GET'>
                    <Form.Control disabled type='text' defaultValue={`${endPoints.airlakeDataApiEndpoint}/<DATASET_ID>/<YOUR_API_KEY>`} />
                </FloatingLabel>
            </div>
            <div className="jumbotron mt-4">
                <p className="branding">Evolake</p>
                <FloatingLabel controlId='floatingtext' label='Evolake Query Engine API - Method : POST'>
                    <Form.Control disabled type='text' defaultValue={`${endPoints.evolakeGenerateQueryEndpint}`} />
                </FloatingLabel>
                <SourceCode>
                    <p className="lead">Request Body</p>
                    <p>
                        &#123;<br />
                        &nbsp;&nbsp;&nbsp;"selectedDb": "YOUR_DB_TYPE",<br />
                        &nbsp;&nbsp;&nbsp;"userQuery": "YOUR_QUERY_IN_GENERAL",<br />
                        &nbsp;&nbsp;&nbsp;"apiKey": "YOUR_API_KEY"<br />
                        &#125;
                    </p>
                </SourceCode>
            </div>
            <div className="jumbotron mt-4">
                <p className="branding">Icelake</p>
                <FloatingLabel controlId='floatingtext' label='Icelake Create Document API - Method : POST'>
                    <Form.Control disabled type='text' defaultValue={`${endPoints.icelakeCreateDocEndpoint}`} />
                </FloatingLabel>
                <SourceCode>
                    <p className="lead">Request Body</p>
                    <p>
                        &#123;<br />
                        &nbsp;&nbsp;&nbsp;"title": "YOUR_DOCUMENT_NAME",<br />
                        &nbsp;&nbsp;&nbsp;"content": "YOUR_DOC_CONVERTED_IN_BASE64_FORMAT",<br />
                        &nbsp;&nbsp;&nbsp;"apiKey": "YOUR_API_KEY"<br />
                        &#125;
                    </p>
                </SourceCode>
            </div>
            <div className="jumbotron mt-4">
                <p className="branding">Frostlake</p>
                <FloatingLabel controlId='floatingtext' label='Frostlake Create Analytics API - Method : POST'>
                    <Form.Control disabled type='text' defaultValue={`${endPoints.frostlakeCreateAnalyticsEndpoint}`} />
                </FloatingLabel>
                <SourceCode>
                    <p className="lead">Request Body</p>
                    <p>
                        &#123;<br />
                        &nbsp;&nbsp;&nbsp;"project": "YOUR_PROJECT_NAME",<br />
                        &nbsp;&nbsp;&nbsp;"component": "YOUR_COMPONENT_NAME",<br />
                        &nbsp;&nbsp;&nbsp;"event": "JAVASCRIPT_EVENT",<br />
                        &nbsp;&nbsp;&nbsp;"info": "INFORMATION",<br />
                        &nbsp;&nbsp;&nbsp;"statusCode": "HTTP_STATUS_CODE",<br />
                        &nbsp;&nbsp;&nbsp;"apiKey": "YOUR_API_KEY"<br />
                        &#125;
                    </p>
                </SourceCode>
            </div>
        </Container >
    )
}

export default withAuth(APIDocPage)
"use client"
import SourceCode from "@/components/SourceCode"
import endPoints from "@/constants/apiEndpoints"
import withAuth from "@/utils/withAuth"
import { NextPage } from "next"
import { Container, FloatingLabel, Form } from "react-bootstrap"

const APIReferencePage: NextPage = () => {
    return (
        <Container style={{ minWidth: "60%" }}>
            <div className="jumbotron mt-4 p-4">
                <p className="branding">Airlake</p>
                <Form.Control disabled type="text" defaultValue={`${endPoints.airlakeDataApiEndpoint}/<DATASET_ID>/<YOUR_API_KEY>`} />

                <p className="branding">Evolake</p>
                <Form.Control disabled type="text" defaultValue={`${endPoints.evolakeGenerateQueryEndpint}`} />
                <SourceCode>
                    <p className="lead">Request Body [POST]</p>
                    <p>
                        &#123;<br />
                        &nbsp;&nbsp;&nbsp;"selectedDb": "YOUR_DB_TYPE",<br />
                        &nbsp;&nbsp;&nbsp;"userQuery": "YOUR_QUERY_IN_GENERAL",<br />
                        &nbsp;&nbsp;&nbsp;"apiKey": "YOUR_API_KEY"<br />
                        &#125;
                    </p>
                </SourceCode>

                <p className="branding">Icelake</p>
                <Form.Control disabled type="text" defaultValue={`${endPoints.icelakeCreateDocEndpoint}`} />
                <SourceCode>
                    <p className="lead">Request Body [POST]</p>
                    <p>
                        &#123;<br />
                        &nbsp;&nbsp;&nbsp;"title": "YOUR_DOCUMENT_NAME",<br />
                        &nbsp;&nbsp;&nbsp;"content": "YOUR_DOC_CONVERTED_IN_BASE64_FORMAT",<br />
                        &nbsp;&nbsp;&nbsp;"apiKey": "YOUR_API_KEY"<br />
                        &#125;
                    </p>
                </SourceCode>

                <p className="branding">Frostlake</p>
                <Form.Control disabled type="text" defaultValue={`${endPoints.frostlakeCreateAnalyticsEndpoint}`} />
                <SourceCode>
                    <p className="lead">Request Body [POST]</p>
                    <p>
                        &#123;<br />
                        &nbsp;&nbsp;&nbsp;"component": "YOUR_COMPONENT_NAME",<br />
                        &nbsp;&nbsp;&nbsp;"event": "JAVASCRIPT_EVENT",<br />
                        &nbsp;&nbsp;&nbsp;"info": "INFORMATION",<br />
                        &nbsp;&nbsp;&nbsp;"statusCode": "HTTP_STATUS_CODE",<br />
                        &nbsp;&nbsp;&nbsp;"apiKey": "YOUR_API_KEY"<br />
                        &nbsp;&nbsp;&nbsp;"clientId": "YOUR_PROJECT_CLIENT_ID"<br />
                        &nbsp;&nbsp;&nbsp;"clientSecret": "YOUR_PROJECT_CLIENT_SECRET"<br />
                        &#125;
                    </p>
                </SourceCode>
            </div>
        </Container >
    )
}

export default withAuth(APIReferencePage)
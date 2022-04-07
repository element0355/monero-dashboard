import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function XcashCard(props) {
    return (
        <Card className="dataCard">
            <Card.Body>
                <Card.Title>X-CASH Stats</Card.Title>
                <Card.Text>
                    <Container>
                        <Row>
                            <Col md="6">Last Reward:</Col>
                            <Col md="6">{(props.reward.reward/1000000).toLocaleString("en-US")}</Col>
                        </Row>
                        <Row>
                            <Col md="6">Height</Col>
                            <Col md="6">{props.info.height}</Col>
                        </Row>
                        <Row>
                            <Col md="6">Target Height</Col>
                            <Col md="6">{props.info.target_height}</Col>
                        </Row>
                    </Container>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default XcashCard;

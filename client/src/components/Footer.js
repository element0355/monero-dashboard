import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import qr from '../qr.jpg';

function Footer() {
    return (
        <div className="footerContainer">
            <Container className="footer">
                <Row>
                    <Col>
                        Like the dashboard?
                        <br /> Please Consider Donating:
                        <br />
                        XCA1T2PWnamcbC4adG1L17XiCvqCDB3EwDzr1MEYxy4rQfzxxuiPdeTRSgtXbghVAVVgRK6V26ZwK2JqXTfkvDH34dJgDKb2F7
                    </Col>
                    <Col>
                        <img alt="qr code" src={qr} style={{ width: '125px' }}></img>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;

import { Col, Container, Row } from "react-bootstrap";
import styles from './SomethingWrong.module.css';

const SomethingWrong = ({title, message}) => {
    return (
        <>
        <section  className={styles['something-wrong']}>
          <Container>
            <Row>
              <Col>
                <h2>{title || 'Something went wrong.'}</h2>
                <h2>{message || ''}</h2>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
}

export default SomethingWrong;
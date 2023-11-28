import { Col, Container, Row } from "react-bootstrap";
import styles from './SomethingWrong.module.css';

const SomethingWrong = () => {
    return (
        <>
        <section  className={styles['something-wrong']}>
          <Container>
            <Row>
              <Col>
                <h1>Oops! Something went wrong.</h1>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
}

export default SomethingWrong;
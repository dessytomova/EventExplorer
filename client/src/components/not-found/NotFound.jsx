import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './NotFound.module.css';

const NotFound = () => {
    return (
      <>
        <section  className={styles['not-found']}>
          <Container>
            <Row>
              <Col>
                <h1>404</h1>
                <p>Oops! Page not found.</p>
                <Link to="/">
                  <Button>Go to Home</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  };
  
  export default NotFound;
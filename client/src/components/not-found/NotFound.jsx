import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
      <>
        <section className="text-center">
          <Container>
            <Row>
              <Col>
                <h1 className="display-1">404</h1>
                <p className="lead">Oops! Page not found.</p>
                <Link to="/">
                  <Button variant="secondary">Go to Home</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  };
  
  export default NotFound;
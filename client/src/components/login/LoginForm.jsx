import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import styles from './LoginForm.module.css';


const formInitialState = {
    username: '',
    password: '',
};


const LoginForm = () => {
    const [formValues, setFormValues] = useState(formInitialState);

    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormValues(state => ({ ...state, [name]: value }));

    }

    const submitHandler = (e) => {
        e.preventDefault();
        //TODO add logic to check login
        console.log(formValues)
    }

    return (
        <Container>
        <Row className="justify-content-center mt-5">
            <Col xs={12} sm={8} md={6} lg={4}>
                <section className={styles['login-form']}>
                <h3 className="text-center mb-4">Login to EventExplorer</h3>
                    <Form onSubmit={submitHandler}>
                        <Form.Group as={Row} className="mb-3" controlId="username">
                            <Form.Label column sm="4">Username:</Form.Label>
                            <Col sm="8">
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={formValues.username}
                                onChange={changeHandler}
                            />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="password">
                            <Form.Label column sm="4">Password:</Form.Label>
                            <Col sm="8">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formValues.password}
                                onChange={changeHandler}
                            />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="submit">
                            <Col sm="4">&nbsp;</Col>
                            <Col sm="8">
                                <Button type="submit">
                                    Login
                                </Button>
                            </Col>
                        </Form.Group>
                        </Form>
                </section>
            </Col>
        </Row>
    </Container>
    );
}

export default LoginForm;
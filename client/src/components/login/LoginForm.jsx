import { Button, Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import styles from './LoginForm.module.css';
import useForm from "../../hooks/useFormHook";
import * as authService from "../../services/authService";


const formInitialState = {
    email: '',
    password: '',
};


const LoginForm = () => {
   
    const submitHandler = async () => {

        const result = await authService.login(values.email,values.password);
        console.log(result)
    } 
    const {values,onChange,onSubmit} = useForm(submitHandler, formInitialState);

    return (
        <section className={styles['login-form']}>
            <h3 className="text-center mb-4">Login to EventsExplorer</h3>
            <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="email">
                    <Form.Label column sm="4">Email:</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            placeholder="email"
                            name="email"
                            value={values.email}
                            onChange={onChange}
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
                            value={values.password}
                            onChange={onChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="submit">
                    <Col sm="4">&nbsp;</Col>
                    <Col sm="8">
                        <Button type="submit"  variant="primary">
                            Login
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </section>

    );
}

export default LoginForm;
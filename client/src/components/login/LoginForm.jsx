import { Button, Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import styles from './LoginForm.module.css';
import useForm from "../../hooks/useFormHook";
import * as authService from "../../services/authService";
import AuthContext from "../../context/authContext";
import { useContext } from "react";


const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
}

const validationRules = {
    password: { minLength: 6, message: 'Please enter a password with at least 6 characters.' },
    email: { type: 'email', message: 'Please provide a valid email address.' },

}

const LoginForm = () => {
    const { loginSubmitHandler } = useContext(AuthContext);


    const { values, onChange, onSubmit, onBlur, errors } = useForm(loginSubmitHandler, {
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    }, validationRules);
    return (
        <section className={styles['login-form']}>
            <h3 className="text-center mb-4">Login to EventsExplorer</h3>
            <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="email">
                    <Form.Label column sm="4">Email:</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={values[LoginFormKeys.Email]}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                        {errors.email && <p>{errors.email}</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="password">
                    <Form.Label column sm="4">Password:</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={values[LoginFormKeys.Password]}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                        {errors.password && <p>{errors.password}</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="submit">
                    <Col sm="4">&nbsp;</Col>
                    <Col sm="8">
                        <Button type="submit" variant="primary">
                            Login
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </section>

    );
}

export default LoginForm;
import { Button, Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import styles from './RegisterForm.module.css';
import useForm from "../../hooks/useFormHook";
import * as authService from "../../services/authService";
import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import ErrorAlert from "../something-wrong/ErrorAlert";


const RegisterFormKeys = {
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirm-password'
}

const validationRules = {
    password: { minLength: 6, message: 'Please enter a password with at least 6 characters.' },
    email: { type: 'email', message: 'Please provide a valid email address.' },
    'confirm-password': { type: 'confirm-pass', message: 'Please enter a confirm password which matches the password' },
}

const RegisterForm = () => {

    const { registerSubmitHandler } = useContext(AuthContext);
    const [hasError, setHasError] = useState();

    const registerHandler = async (values) => {
        try {
            await registerSubmitHandler(values);
        } catch (e) {
            setHasError({ message: e.message });
        }
    }

    const { values, onChange, onSubmit, onBlur, errors } = useForm(registerHandler, {
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: '',
    }, validationRules);

    return (
        <section className={styles['register-form']}>
            <h3 className="text-center mb-4">Register to EventsExplorer</h3>
            {hasError && <ErrorAlert message={hasError.message}/>}
            <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="email">
                    <Form.Label column sm="4">Email:</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={values[RegisterFormKeys.Email]}
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
                            value={values[RegisterFormKeys.Password]}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                        {errors.password && <p>{errors.password}</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="confirm-password">
                    <Form.Label column sm="4">Confirm Password:</Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="confirm-password"
                            value={values[RegisterFormKeys.ConfirmPassword]}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                        {errors['confirm-password'] && <p>{errors['confirm-password']}</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="submit">
                    <Col sm="4">&nbsp;</Col>
                    <Col sm="8">
                        <Button type="submit" variant="primary">
                            Register
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </section>

    );
}

export default RegisterForm;
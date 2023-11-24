import { Button, Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import styles from './RegisterForm.module.css';
import useForm from "../../hooks/useFormHook";
import * as authService from "../../services/authService";


const RegisterFormKeys= {
    Email:'email', 
    Password:'password', 
    ConfirmPassword: 'confirm-password'
}

const RegisterForm = () => {
   
    const submitHandler = async () => {

        const result = await authService.register(values[RegisterFormKeys.Email],values[RegisterFormKeys.Password]);
        console.log(result)
    } 
    const {values,onChange,onSubmit} = useForm(submitHandler, {
        [RegisterFormKeys.Email]: '', 
        [RegisterFormKeys.Password]: '', 
        [RegisterFormKeys.ConfirmPassword]: '', 
    });

    return (
        <section className={styles['register-form']}>
            <h3 className="text-center mb-4">Register to EventsExplorer</h3>
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
                            value={values[RegisterFormKeys.Password]}
                            onChange={onChange}
                        />
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
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="submit">
                    <Col sm="4">&nbsp;</Col>
                    <Col sm="8">
                        <Button type="submit"  variant="primary">
                            Register
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </section>

    );
}

export default RegisterForm;
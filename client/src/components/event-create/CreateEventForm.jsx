import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as  eventService from "../../services/eventService";
import { useNavigate } from 'react-router-dom';
import styles from './CreateEventForm.module.css';
import useForm from '../../hooks/useFormHook';
import SomethingWrong from "../something-wrong/SomethingWrong";
import { useState } from 'react';
import Path from '../../paths';

const formInitialState = {
    name: '',
    description: '',
    datetime: '',
    host: '',
    country: '',
    city: '',
    street: '',
    streetNumber: '',
    imageUrl: '',
    online: false,
    onGate: false,
    purchaseLink: '',
    price: ''
};

const currentDate = new Date();
const currentDateString = currentDate.toISOString().slice(0, 16);

const validationRules = {
    name: { minLength: 5, message: 'Please enter a name with at least 5 characters.' },
    description: { minLength: 10, message: 'Please provide a description with at least 10 characters.' },
    host: { minLength: 5, message: 'Please enter a host name with at least 5 characters.' },
    datetime: { minDate: currentDateString, message: 'Please select a future date and time.' },
    imageUrl: { type: 'url', minLength: 3, message: 'Please enter a valid URL for the image.' },
    country: { minLength: 2, message: 'Please enter a country name with at least 2 characters.' },
    city: { minLength: 3, message: 'Please enter a city name with at least 3 characters.' },
    price: { minValue: 0, type: 'number', message: 'Please enter a valid positive number for the price.' },
    streetNumber: { minValue: 0, message: 'Please enter a valid positive number for the street number.' },
    purchaseLink: { type: 'url', message: 'Please enter a valid URL for the purchase link.' },
}

const CreateEventForm = () => {
    const navigate = useNavigate();
    const [hasError, setHasError] = useState(false);

    const submitHandler = async (data) => {
        try {
            await eventService.create(data);
            navigate(Path.MyEvents);
        } catch (error) {
            setHasError(true);
        }
    };


    const { values, onChange, onReset, onSubmit, onBlur, errors } = useForm(submitHandler, formInitialState, validationRules);

    if (hasError) return <SomethingWrong />
    return (
        <section className={styles['add-event-form']}>
            <h3 className="text-center mb-4">Add New Event</h3>
            <section>
                <Container>
                    <Form onSubmit={onSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="eventName">
                            <Form.Label column sm="2">Name *</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event name"
                                    name="name"
                                    value={values.name}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                                {errors.name && <p>{errors.name}</p>}

                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventDescription">
                            <Form.Label column sm="2">Description *</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter event description"
                                    name="description"
                                    value={values.description}
                                    onBlur={onBlur}
                                    onChange={onChange}

                                />
                                {errors.description && <p>{errors.description}</p>}

                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventDatetime">
                            <Form.Label column sm="2">Datetime *</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="datetime-local"
                                    name="datetime"
                                    value={values.datetime}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    min={currentDateString}
                                />
                                {errors.datetime && <p>{errors.datetime}</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventHost">
                            <Form.Label column sm="2">Host *</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event host"
                                    name="host"
                                    value={values.host}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                                {errors.host && <p>{errors.host}</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventImageUrl">
                            <Form.Label column sm="2">Image Url *</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="url"
                                    placeholder="Enter event image"
                                    name="imageUrl"
                                    value={values.imageUrl}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                                {errors.imageUrl && <p>{errors.imageUrl}</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventCountry">
                            <Form.Label column sm="2">Country *</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event country"
                                    name="country"
                                    value={values.country}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                                 {errors.country && <p>{errors.country}</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventCity">
                            <Form.Label column sm="2">City *</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event city"
                                    name="city"
                                    value={values.city}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                                {errors.city && <p>{errors.city}</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventStreet">
                            <Form.Label column sm="2">Street</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event street"
                                    name="street"
                                    value={values.street}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventStreetNum">
                            <Form.Label column sm="2">Street Number</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter street number"
                                    name="streetNumber"
                                    value={values.streetNumber}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                                {errors.streetNumber && <p>{errors.streetNumber}</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="purchaseOptions">
                            <Form.Label column sm="2">Purchase Options</Form.Label>
                            <Col sm="10">
                                <Form.Check
                                    type="checkbox"
                                    label="Online"
                                    name="online"
                                    checked={values.online}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    id="onlineCheckbox"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="On Gate"
                                    name="onGate"
                                    checked={values.onGate}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    id="onGateCheckbox"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="price">
                            <Form.Label column sm="2">Price</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Price"
                                    name="price"
                                    value={values.price}
                                    onBlur={onBlur}
                                    onChange={onChange}

                                />
                                {errors.price && <p>{errors.price}</p>}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="purchaseLink">
                            <Form.Label column sm="2">Purchase Link</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter purchase link"
                                    name="purchaseLink"
                                    value={values.purchaseLink}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                                {errors.purchaseLink && <p>{errors.purchaseLink}</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="buttons">
                            <Col sm="2">&nbsp;</Col>
                            <Col sm="10" className={styles['button-container']}>
                                <Button variant="primary" type="submit">
                                    Create
                                </Button>
                                <Button variant="danger" onClick={onReset}>
                                    Reset
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Container>
            </section>
        </section>
    );
}

export default CreateEventForm;
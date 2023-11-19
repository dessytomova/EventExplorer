import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as  eventService from "../../services/eventService";
import { useNavigate } from 'react-router-dom';
import styles from './CreateEventForm.module.css';

const formInitialState = {
    name: '',
    description: '',
    datetime: '',
    host: '',
    address: {
        country: '',
        city: '',
        street: '',
        streetNumber: '',
    },
    imageUrl: '',
    online: false,
    onGate: false,
    purchaseLink: '',
    price: ''
};

const CreateEventForm = () => {

    const [formValues, setFormValues] = useState(formInitialState);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        let value = '';
        let name = e.target.name;
        switch (e.target.type) {
            case 'number': value = Number(e.target.value);
                break;
            case 'checkbox': value = e.target.checked;
                break;
            default: value = e.target.value;
                break;
        }

        if (['country', 'city', 'street', 'streetNumber'].includes(name)) {
            setFormValues((state) => ({
                ...state,
                address: {
                    ...state.address,
                    [name]: value,
                },
            }));
        } else {
            setFormValues(state => ({ ...state, [name]: value }));

        }

    }


    const submitHandler = (e) => {
        e.preventDefault();
        eventService.create(formValues);
        resetHandler();
        navigate('/events');

    };

    const resetHandler = () => {
        setFormValues(formInitialState);
    }


    return (
        <section className={styles['add-event-form']}>
            <h3 className="text-center mb-4">Add New Event</h3>
            <section>
                <Container>
                    <Form onSubmit={submitHandler}>
                        <Form.Group as={Row} className="mb-3" controlId="eventName">
                            <Form.Label column sm="2">Name</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event name"
                                    name="name"
                                    value={formValues.name}
                                    onChange={changeHandler}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventDescription">
                            <Form.Label column sm="2">Description</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter event description"
                                    name="description"
                                    value={formValues.description}
                                    onChange={changeHandler}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventDatetime">
                            <Form.Label column sm="2">Datetime</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="datetime-local"
                                    name="datetime"
                                    value={formValues.datetime}
                                    onChange={changeHandler}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventHost">
                            <Form.Label column sm="2">Host</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event host"
                                    name="host"
                                    value={formValues.host}
                                    onChange={changeHandler}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventImageUrl">
                            <Form.Label column sm="2">Image Url</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event image"
                                    name="imageUrl"
                                    value={formValues.imageUrl}
                                    onChange={changeHandler}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventCountry">
                            <Form.Label column sm="2">Country</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event country"
                                    name="country"
                                    value={formValues.address.country}
                                    onChange={changeHandler}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventCity">
                            <Form.Label column sm="2">City</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event city"
                                    name="city"
                                    value={formValues.address.city}
                                    onChange={changeHandler}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventStreet">
                            <Form.Label column sm="2">Street</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event street"
                                    name="street"
                                    value={formValues.address.street}
                                    onChange={changeHandler}
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
                                    value={formValues.address.streetNumber}
                                    onChange={changeHandler}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="purchaseOptions">
                            <Form.Label column sm="2">Purchase Options</Form.Label>
                            <Col sm="10">
                                <Form.Check
                                    type="checkbox"
                                    label="Online"
                                    name="online"
                                    checked={formValues.online}
                                    onChange={changeHandler}
                                    id="onlineCheckbox"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="On Gate"
                                    name="onGate"
                                    checked={formValues.onGate}
                                    onChange={changeHandler}
                                    id="onGateCheckbox"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="price">
                            <Form.Label column sm="2">Price</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="number"
                                    placeholder="Price"
                                    name="price"
                                    value={formValues.price}
                                    onChange={changeHandler}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="purchaseLink">
                            <Form.Label column sm="2">Purchase Link</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter purchase link"
                                    name="purchaseLink"
                                    value={formValues.purchaseLink}
                                    onChange={changeHandler}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="buttons">
                            <Col sm="2">&nbsp;</Col>
                            <Col sm="10">
                                <Button variant="danger" onClick={resetHandler}>
                                    Reset
                                </Button>
                                <Button variant="primary" type="submit">
                                    Create
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
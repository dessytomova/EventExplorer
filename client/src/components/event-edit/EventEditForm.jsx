import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as  eventService from "../../services/eventService";

import styles from './EventEditForm.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Path from '../../paths';

const initialState = {
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

const EditEventForm = () => {
    const { id } = useParams();
    const [values, setValues] = useState(initialState);
    const navigate = useNavigate();

    useEffect(() => {
        eventService
            .getOne(id)
            .then(data => {
    
                setValues({
                    ...data, 
                    country:data?.address?.country, 
                    city:data?.address?.city, 
                    street:data?.address?.street, 
                    streetNumber:data?.address?.streetNumber, 
                    onGate: !!data?.ticketInfo?.purchaseOptions.includes('On Gate'), 
                    online: !!data?.ticketInfo?.purchaseOptions.includes('Online'), 
                    purchaseLink:data?.ticketInfo?.purchaseLink, 
                    price:data?.ticketInfo?.price, 
                })
            })
            .catch(e => console.log(e))
    }, [id]);



    const editEventSubmitHandler = async (e) => {
        e.preventDefault();
        
        try {
            await eventService.edit(id, values);
            navigate(Path.Events)
        } catch (error) {
            console.log(error);
        }
    }

    const onChange = (e) => {
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

        setValues(state => ({ ...state, [name]: value }));
    }


    return (
        <section className={styles['edit-event-form']}>
            <h3 className="text-center mb-4">Edit</h3>
            <section>
                <Container>
                    <Form onSubmit={editEventSubmitHandler}>
                        <Form.Group as={Row} className="mb-3" controlId="eventName">
                            <Form.Label column sm="2">Name</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event name"
                                    name="name"
                                    value={values.name}
                                    onChange={onChange}
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
                                    value={values.description}
                                    onChange={onChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventDatetime">
                            <Form.Label column sm="2">Datetime</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="datetime-local"
                                    name="datetime"
                                    value={values.datetime}
                                    onChange={onChange}
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
                                    value={values.host}
                                    onChange={onChange}
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
                                    value={values.imageUrl}
                                    onChange={onChange}
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
                                    value={values.country}
                                    onChange={onChange}
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
                                    value={values.city}
                                    onChange={onChange}
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
                                    value={values.street}
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
                                    onChange={onChange}
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
                                    checked={values.online}
                                    onChange={onChange}
                                    id="onlineCheckbox"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="On Gate"
                                    name="onGate"
                                    checked={values.onGate}
                                    onChange={onChange}
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
                                    value={values.price}
                                    onChange={onChange}
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
                                    value={values.purchaseLink}
                                    onChange={onChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="buttons">
                            <Col sm="2">&nbsp;</Col>
                            <Col sm="10">
                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Container>
            </section>
        </section>
    );
}

export default EditEventForm;
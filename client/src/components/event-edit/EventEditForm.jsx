import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as  eventService from "../../services/eventService";

import styles from './EventEditForm.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Path from '../../paths';
import SomethingWrong from "../something-wrong/SomethingWrong";
import {validate, validateMany} from "../../utils/formValidator";

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

const currentDate = new Date();
const currentDateString = currentDate.toISOString().slice(0, 16);

const validationRules = {
    name: { minLength: 5, message: 'Please enter a name with at least 5 characters.' },
    description: { minLength: 10, message: 'Please provide a description with at least 10 characters.' },
    host: { minLength: 5, message: 'Please enter a host name with at least 5 characters.' },
    datetime: { minDate: currentDateString, message: 'Please select a future date and time.' },
    imageUrl: { type: 'url', minLength: 3, message: 'Please enter a valid URL for the image.' },
    city: { minLength: 3, message: 'Please enter a city name with at least 3 characters.' },
    price: { minValue: 0, type: 'number', message: 'Please enter a valid positive number for the price.' },
    streetNumber: { minValue: 0, message: 'Please enter a valid positive number for the street number.' },
    purchaseLink: { type: 'url', message: 'Please enter a valid URL for the purchase link.' },
}

const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

const EditEventForm = () => {
    const { id } = useParams();
    const [values, setValues] = useState(initialState);
    const [hasError, setHasError] = useState(false);
    const [errors, setErrors] = useState({});
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
            .catch(e => setHasError(true))
    }, [id]);


    const validateForm = () => {
        const newErrors = validateMany(validationRules, values);

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const editEventSubmitHandler = async (e) => {
        e.preventDefault();
      

        if (validateForm()) {
            try{
                await eventService.edit(id, values);
                navigate(Path.Events)
            } catch (error) {
                setHasError(true);
            }
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
        setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }


    const validateField = (field, value) => {
        let error = null;
        error = validate(validationRules, field, value);

        setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };
    const onBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };


    if (hasError) return <SomethingWrong />

    return (
        <section className={styles['edit-event-form']}>
            <h3 className="text-center mb-4">Edit</h3>
            <section>
                <Container>
                    <Form onSubmit={editEventSubmitHandler}>
                        <Form.Group as={Row} className="mb-3" controlId="eventName">
                            <Form.Label column sm="2">Name *</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event name"
                                    name="name"
                                    value={values.name}
                                    onChange={onChange}
                                    onBlur={onBlur}
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
                                    onChange={onChange}
                                    onBlur={onBlur}
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
                                    onChange={onChange}
                                    onBlur={onBlur}
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
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                                {errors.host && <p>{errors.host}</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="eventImageUrl">
                            <Form.Label column sm="2">Image Url *</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event image"
                                    name="imageUrl"
                                    value={values.imageUrl}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                                {errors.imageUrl && <p>{errors.imageUrl}</p>}
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
                                    onBlur={onBlur}
                                />
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
                                    onChange={onChange}
                                    onBlur={onBlur}
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
                                    onChange={onChange}
                                    onBlur={onBlur}
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
                                    onBlur={onBlur}
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
                                    onChange={onChange}
                                    id="onlineCheckbox"
                                    onBlur={onBlur}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="On Gate"
                                    name="onGate"
                                    checked={values.onGate}
                                    onChange={onChange}
                                    id="onGateCheckbox"
                                    onBlur={onBlur}
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
                                    onChange={onChange}
                                    onBlur={onBlur}
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
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                                {errors.purchaseLink && <p>{errors.purchaseLink}</p>}
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
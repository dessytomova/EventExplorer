import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as  eventService from "../services/eventService";
import { useNavigate } from 'react-router-dom';

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
    performingArtists: [],
    image: '',
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
            // case 'checkbox': value = e.target.checked;
            //     break;
            default: value = e.target.value;
                break;
        }
        
        console.log(name, value)
        
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
        // Handle form submission, e.g., send data to the server
        eventService.create(formValues);
        resetHandler();
        navigate('/events');
          
    };

    const resetHandler = () => {
        setFormValues(formInitialState);
    }


    return (

        <section>
            <Container>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="eventName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event name"
                            name="name"
                            value={formValues.name}
                            onChange={changeHandler}
                        />
                    </Form.Group>

                    <Form.Group controlId="eventDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter event description"
                            name="description"
                            value={formValues.description}
                            onChange={changeHandler}
                        />
                    </Form.Group>

                    <Form.Group controlId="eventDatetime">
                        <Form.Label>Datetime</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="datetime"
                            value={formValues.datetime}
                            onChange={changeHandler}
                        />
                    </Form.Group>

                    <Form.Group controlId="eventHost">
                        <Form.Label>Host</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event host"
                            name="host"
                            value={formValues.host}
                            onChange={changeHandler}
                        />
                    </Form.Group>

                    <Form.Group controlId="eventImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event image"
                            name="image"
                            value={formValues.image}
                            onChange={changeHandler}
                        />
                    </Form.Group>

                    <Form.Group controlId="eventCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event country"
                            name="country"
                            value={formValues.address.country}
                            onChange={changeHandler}
                        />
                    </Form.Group>

                    <Form.Group controlId="eventCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event city"
                            name="city"
                            value={formValues.address.city}
                            onChange={changeHandler}
                        />
                    </Form.Group>

                    {<Form.Group controlId="eventStreet">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event street"
                            name="street"
                            value={formValues.address.street}
                            onChange={changeHandler}
                        />
                    </Form.Group>}

                    <Form.Group controlId="eventStreetNum">
                        <Form.Label>Street Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter street number"
                            name="streetNumber"
                            value={formValues.address.streetNumber}
                            onChange={changeHandler}
                        />
                    </Form.Group>


                    <Form.Group controlId="eventPerformingArtists">
                        <Form.Label>Performing Artists</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter artists"
                            name="performingArtists"
                            value={formValues.performingArtists}
                            onChange={changeHandler}
                        />
                    </Form.Group>

                    <Button variant="danger"  onClick={resetHandler}>
                        Reset
                    </Button>
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </Container>
        </section>
    );
}

export default CreateEventForm;
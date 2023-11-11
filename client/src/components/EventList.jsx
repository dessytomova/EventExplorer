import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import EventDetails from "./EventListItem";

const baseUrl = 'http://localhost:3030/jsonstore/events';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(baseUrl)
            .then(res => res.json())
            .then(data => {
                data = Object.values(data);
                setEvents(data);
            })
    }, []);

    return (
        <>
            <section>
                <Container>
                    <Row>
                        {events.map(event => (
                            <Col key={event._id} sm={12} md={6} lg={3} xl={3}>
                                <EventDetails {...event} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default EventList;
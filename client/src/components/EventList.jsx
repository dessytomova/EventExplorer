import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import EventDetails from "./EventListItem";
import * as  eventService from "../services/eventService";

const EventList = () => {
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        const abortController = new AbortController();

        eventService
            .getAll({ signal: abortController.signal })
            .then(result => setEvents(result));

        return () => {
            abortController.abort();
        }
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
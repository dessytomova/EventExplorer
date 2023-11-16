import { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";
import styles from './EventDetails.module.css';
import * as  eventService from "../../services/eventService";

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();  // on unmount to abort the fetch

        eventService
            .getOne(id, { signal: abortController.signal })
            .then(setEvent)
            .catch((err) => {
                navigate('/events');
            });

        return () => {
            abortController.abort();
        }
    }, [id]);

    return (
        <>
            <section>
                <Container>
                    <Row>
                        <Col key={event._id} sm={12} md={12} lg={12} xl={12}>
                            <Card className={styles.card}>
                                <Card.Img src={event.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{event.name}</Card.Title>
                                    <Card.Text>
                                        {event.description}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>{formatDate(event.datetime)}</ListGroup.Item>
                                    <ListGroup.Item>{event.host}</ListGroup.Item>
                                    <ListGroup.Item>{event.address?.country}, {event.address?.city}, {event.address?.street} {event.address?.streetNumber}</ListGroup.Item>
                                    {
                                        event.ticketInfo?.price && <ListGroup.Item>{event.ticketInfo.price}</ListGroup.Item>
                                    }
                                    {
                                        event.ticketInfo?.purchaseOptions?.length > 0 && <ListGroup.Item>{event.ticketInfo.purchaseOptions.join(", ")}</ListGroup.Item>
                                    }
                                    {
                                        event.ticketInfo?.purchaseLink &&
                                        <ListGroup.Item>
                                            <a href={event.ticketInfo.purchaseLink} target="_blank" rel="noopener noreferrer">Get A Ticket</a>
                                        </ListGroup.Item>
                                    }
                                </ListGroup>
                                <Card.Footer className="text-muted">2 days ago</Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default EventDetails;
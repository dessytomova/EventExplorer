import { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../utils/dateUtils";
import styles from './EventListItem.module.css';

const baseUrl = 'http://localhost:3030/jsonstore/events/';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${baseUrl}${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Not Found");
                }
                return res.json()
            })
            .then(setEvent)
            .catch((err) => {
                navigate('/events');
            });
    }, [id]);

    return (
        <>
            <section>
                <Container>
                    <Row>
                        <Col key={event._id} sm={12} md={12} lg={12} xl={12}>
                            <Card className={styles.card}>
                                <Card.Img variant="top" src={event.image} />
                                <Card.Body>
                                    <Card.Title>{event.name}</Card.Title>
                                    <Card.Text>
                                        {event.description}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    {
                                        event.performingArtists && <ListGroup.Item>{event.performingArtists.join(", ")}</ListGroup.Item>
                                    }
                                    <ListGroup.Item>{formatDate(event.datetime)}</ListGroup.Item>
                                    <ListGroup.Item>{event.host}</ListGroup.Item>
                                    <ListGroup.Item>{event.address?.country}, {event.address?.city}, {event.address?.street} {event.address?.streetNumber}</ListGroup.Item>
                                    {
                                        event.ticketInfo?.price && <ListGroup.Item>{event.ticketInfo.price}</ListGroup.Item>
                                    }
                                    {
                                        event.ticketInfo?.purchaseOptions && <ListGroup.Item>{event.ticketInfo.purchaseOptions}</ListGroup.Item>
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
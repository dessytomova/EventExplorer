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
        eventService
            .getOne(id)
            .then(setEvent)
            .catch((err) => {
                navigate('/events');
            });
    }, [id]);

    return (
        <>
            <Card className={styles['card-details']}>
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
                <Card.Footer className="text-muted"></Card.Footer>
            </Card>
        </>
    );
}

export default EventDetails;
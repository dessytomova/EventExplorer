import { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";
import styles from './EventDetails.module.css';
import * as  eventService from "../../services/eventService";
import SomethingWrong from "../something-wrong/SomethingWrong";

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const navigate = useNavigate();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        eventService
            .getOne(id)
            .then(setEvent)
            .catch(e => setHasError(true));
    }, [id]);

    if (hasError) return <SomethingWrong />
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
                    <ListGroup.Item>{event.country} {event.country ? `, ${event.city}` : `, ${event.city}`} {event.street && `, ${event.street}`} {event?.streetNumber}</ListGroup.Item>
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
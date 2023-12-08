import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup  from "react-bootstrap/ListGroup";
import styles from './EventListItem.module.css';
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/dateUtils";

const EventListItem = (
    {
        _id,
        imageUrl,
        name,
        datetime,
        host,
        country,
        city,
        street, 
        streetNumber,
        ticketInfo,
        _ownerId,
        like, 
        userId, 
        onDeleteButtonClick,
        onLikeClicked,
        onDislikeClicked,
    }
) => {
    const isEventPassed = new Date(datetime) < new Date();

    return (
        <Card className={`${styles['card-item']} ${isEventPassed ? styles['passed-event'] : ''}`}>

            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>
                    <Card.Link as={Link} to={`/events/${_id}`}>{name}</Card.Link>
                </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{formatDate(datetime)}</ListGroup.Item>
                <ListGroup.Item>{host}</ListGroup.Item>
                <ListGroup.Item>{country}{country ? `, ${city}` : `${city}`}{street && `, ${street}`} {streetNumber}</ListGroup.Item>
                {
                    ticketInfo && ticketInfo.price && <ListGroup.Item>€ {ticketInfo.price}</ListGroup.Item>
                }
                {ticketInfo?.purchaseOptions?.length > 0 && (
                    <ListGroup.Item>{ticketInfo.purchaseOptions.join(', ')}</ListGroup.Item>
                )}
                {ticketInfo?.purchaseLink && (
                    <ListGroup.Item>
                        <a href={ticketInfo.purchaseLink} target="_blank" rel="noopener noreferrer">
                            Get A Ticket
                        </a>
                    </ListGroup.Item>
                )}
            </ListGroup>
            <Card.Body className={styles['card-body-container']}>
                <Card.Link as={Link} to={`/events/${_id}`}>Details</Card.Link>
                {
                    _ownerId === userId && (
                        <div className="card-links">
                            <Card.Link as={Link} to={`/events/${_id}/edit`}>Edit</Card.Link>
                            <Card.Link as={Link} onClick={() => onDeleteButtonClick({ _id, name })}>Delete</Card.Link>
                        </div>
                    )
                }
                {!like && userId && userId !== _ownerId && <Button onClick={() => onLikeClicked(_id)}>&#9825;</Button>}
                {like && userId && userId !== _ownerId && <Button onClick={() => onDislikeClicked(like)}>&#9829;</Button>}
            </Card.Body>
        </Card>
    );
}

export default EventListItem;
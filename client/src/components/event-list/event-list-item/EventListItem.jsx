import { Button, Card, Container, ListGroup } from "react-bootstrap";
import { formatDate } from "../../../utils/dateUtils";
import styles from './EventListItem.module.css';
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../context/authContext";

const EventListItem = (
    {
        _id,
        imageUrl,
        name,
        datetime,
        host,
        address,
        ticketInfo,
        _ownerId,
        onDeleteButtonClick
    }
) => {
    const { userId } = useContext(AuthContext);
    return (
        <Card className={styles['card-item']}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>
                    <Card.Link as={Link} to={`/events/${_id}`}>{name}</Card.Link>

                </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{formatDate(datetime)}</ListGroup.Item>
                <ListGroup.Item>{host}</ListGroup.Item>
                <ListGroup.Item>{address?.country}, {address?.city}, {address?.street} {address?.streetNumber}</ListGroup.Item>
                {
                    ticketInfo && ticketInfo.price && <ListGroup.Item>{ticketInfo.price}</ListGroup.Item>
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
                            <Card.Link onClick={() => onDeleteButtonClick({ _id, name })}>Delete</Card.Link>
                        </div>
                    )
                }
            </Card.Body>
        </Card>
    );
}

export default EventListItem;
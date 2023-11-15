import { Button, Card, Container, ListGroup } from "react-bootstrap";
import { formatDate } from "../utils/dateUtils";
import styles from './EventListItem.module.css';
import { Link } from "react-router-dom";

const EventListItem = (
    {
    _id, 
    imageUrl, 
    name, 
    description, 
    performingArtists, 
    datetime, 
    host, 
    address, 
    ticketInfo
}
) => {
    return (
        <Card style={{ width: '18rem' }} className={styles.card}>
            <Card.Img variant="top" src={imageUrl}/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text className={styles.description}>
                    {performingArtists.join(", ")}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{formatDate(datetime)}</ListGroup.Item>
                <ListGroup.Item>{host}</ListGroup.Item>
                <ListGroup.Item>{address?.country}, {address?.city}, {address?.street} {address?.streetNumber}</ListGroup.Item>
                {
                    ticketInfo && ticketInfo.price && <ListGroup.Item>{ticketInfo.price}</ListGroup.Item>
                }
                {
                    ticketInfo && ticketInfo.purchaseOptions &&  <ListGroup.Item>{ticketInfo.purchaseOptions}</ListGroup.Item>
                }
                {
                    ticketInfo && ticketInfo.purchaseLink &&  
                    <ListGroup.Item>
                         <a href={ticketInfo.purchaseLink} target="_blank" rel="noopener noreferrer">Get A Ticket</a>
                    </ListGroup.Item>
                }
            </ListGroup>
            <Card.Body>
                {/* <Card.Link href="#">Another Link</Card.Link> */}
                <Card.Link as={Link} to={`/events/${_id}`}>Details</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default EventListItem;
import Card from 'react-bootstrap/Card';
import styles from './EventListLikedItem.module.css';
import { formatDate } from "../../../utils/dateUtils";
import { Link } from 'react-router-dom';

const EventListItemLiked = ({
  event
}) => {
  return (
    <Card className={styles['card-item']}>
      <Card.Img variant="top" src={event.imageUrl} />
      <Card.Body>
        <Card.Title>
          <Card.Link as={Link} to={`/events/${event._id}`}>{event.name}</Card.Link>
        </Card.Title>
        <Card.Text>{event.host}</Card.Text>
        <Card.Text>{formatDate(event.datetime)}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default EventListItemLiked;
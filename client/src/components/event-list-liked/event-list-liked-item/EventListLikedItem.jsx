import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './EventListLikedItem.module.css';
import { formatDate } from "../../../utils/dateUtils";
import { Link } from 'react-router-dom';

const EventListItemLiked = ({
  like,
  onDislikeClicked
}) => {
  return (
    <Card className={styles['card-item']}>
      <Card.Img variant="top" src={like.event.imageUrl} />
      <Card.Body>
        <Card.Title className={styles['card-title']}>
          <Card.Link as={Link} to={`/events/${like.event._id}`}>{like.event.name}</Card.Link>
          <div className={styles['like-button-container']}>
            <Button onClick={() => onDislikeClicked(like)}>&#9829;</Button>
          </div>
        </Card.Title>
        <Card.Text>{like.event.host}</Card.Text>
        <Card.Text>{formatDate(like.event.datetime)}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default EventListItemLiked;
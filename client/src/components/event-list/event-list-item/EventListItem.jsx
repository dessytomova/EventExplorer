import { Button, Card, Container, ListGroup } from "react-bootstrap";
import { formatDate } from "../../../utils/dateUtils";
import styles from './EventListItem.module.css';
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/authContext";
import * as  likeService from "../../../services/likeService";
import SomethingWrong from "../../something-wrong/SomethingWrong";

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
        onDeleteButtonClick,
    }
) => {
    const { userId } = useContext(AuthContext);
    const [liked, setLiked] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        likeService
            .getOneByUserId(_id, userId)
            .then(result => {
                if (result.length) setLiked(true);
            })
            .catch(e => setHasError(true));

    })


    const onLikeButtonClick = (eventId) => {
        likeService.create({
            eventId: _id
        }).then(result =>
            setLiked(true)
        ).catch(e => setHasError(true));

    }

    if (hasError) return <SomethingWrong />;

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
                {!liked && userId && userId !== _ownerId && <Button onClick={() => onLikeButtonClick(_id)}>&#9825;</Button>}
                {liked && userId && userId !== _ownerId && <Button>&#9829;</Button>}
                
            </Card.Body>
        </Card>
    );
}

export default EventListItem;
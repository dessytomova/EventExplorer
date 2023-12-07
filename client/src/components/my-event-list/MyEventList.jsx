import { useContext, useEffect, useState } from "react";
import * as  eventService from "../../services/eventService";
import styles from './MyEventList.module.css';
import DeleteEventModal from "../event-delete/DeleteEventModal";
import SomethingWrong from "../something-wrong/SomethingWrong";
import EventListItem from "../event-list/event-list-item/EventListItem";
import AuthContext from "../../context/authContext";
import Button  from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Path from "../../paths";

const MyEventList = () => {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [hasError, setHasError] = useState(false);
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        eventService
            .getByOwner(userId)
            .then(result => setEvents(result))
            .catch(e => setHasError(true));
    }, []);

    const onDeleteButtonClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    }

    const deleteUserHandler = async () => {
        try {
            await eventService.remove(selectedEvent._id);
        } catch (error) {
            setHasError(true);
        }

        setEvents(events => events.filter(event => event._id !== selectedEvent._id));
        setSelectedEvent({});
        setShowModal(false);
    }

    if (hasError) return <SomethingWrong />

    return (
        <>
            <section>
                <div className={styles['event-container']}>

                    {events.map((event) => (
                        <div key={event._id} className={styles['event-card']}>
                            <EventListItem {...event} onDeleteButtonClick={onDeleteButtonClick} />
                        </div>
                    ))}
                    {!events.length && (
                        <div className={styles['no-events-container']}>
                            <h1>Add your first event.</h1>
                            <Link to={Path.NewEvent}>
                                <Button>New Event</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <DeleteEventModal show={showModal} onClose={() => { setShowModal(false) }} deleteUserHandler={deleteUserHandler} event={selectedEvent} />
        </>
    );
}

export default MyEventList;
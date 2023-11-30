import { useEffect, useState } from "react";
import EventListItem from "./event-list-item/EventListItem";
import * as  eventService from "../../services/eventService";
import styles from './EventList.module.css';
import DeleteEventModal from "../event-delete/DeleteEventModal";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});

    useEffect(() => {
        eventService
            .getAll()
            .then(result => setEvents(result));
    }, []);

    const onDeleteButtonClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    }

    const deleteUserHandler = async () => {
        await eventService.remove(selectedEvent._id);
        setEvents(events => events.filter(event => event._id !== selectedEvent._id));
        setSelectedEvent({});
        setShowModal(false);
    }

    return (
        <>
            <section>
                <div className={styles['event-container']}>
                    {events.map((event) => (
                        <div key={event._id} className={styles['event-card']}>
                            <EventListItem {...event} onDeleteButtonClick={onDeleteButtonClick} />
                        </div>
                    ))}
                </div>
            </section>

            <DeleteEventModal show={showModal} onClose={() => {setShowModal(false)}} deleteUserHandler={deleteUserHandler} event={selectedEvent} />
        </>
    );
}

export default EventList;
import { useEffect, useState } from "react";
import EventListItem from "./event-list-item/EventListItem";
import * as  eventService from "../../services/eventService";
import styles from './EventList.module.css';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        eventService
            .getAll()
            .then(result => setEvents(result));
    }, []);

    return (
        <>
            <section>
                <div className={styles['event-container']}>
                    {events.map((event) => (
                        <div key={event._id} className={styles['event-card']}>
                            <EventListItem {...event} />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default EventList;
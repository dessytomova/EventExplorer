import { useEffect, useState } from "react";
import EventDetails from "./event-list-item/EventListItem";
import * as  eventService from "../../services/eventService";
import styles from './EventList.module.css';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        eventService
            .getAll({ signal: abortController.signal })
            .then(result => setEvents(result));

        return () => {
            abortController.abort();
        }
    }, []);

    return (
        <>
            <section>
                <div className={styles['event-container']}>
                    {events.map((event) => (
                        <div key={event._id} className={styles['event-card']}>
                            <EventDetails {...event} />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default EventList;
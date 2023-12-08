import { useContext, useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import EventListItem from "./event-list-item/EventListItem";
import * as  eventService from "../../services/eventService";
import * as  likeService from "../../services/likeService";
import styles from './EventList.module.css';
import DeleteEventModal from "../event-delete/DeleteEventModal";
import SomethingWrong from "../something-wrong/SomethingWrong";
import AuthContext from "../../context/authContext";
import { useRouteError } from "react-router-dom";
import InnerNav from "../inner-nav/InnerNav";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [hasError, setHasError] = useState();
    const [liked, setLiked] = useState([]);
    const { userId } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

  
    const loadAll = () => {    
        eventService
        .getAllActive()
        .then(result => setEvents(result))
        .catch(e => setHasError({ message: e.message }));
    }


    useEffect(() => {
        setIsLoading(true);
        loadAll();

       likeService
       .getAllByUserId(userId)
       .then(res => {
            setLiked(res);
            setIsLoading(false);
        })
       .catch(e => setHasError({ message: e.message }));
    }, []);

    const onDeleteButtonClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    }

    const deleteUserHandler = async () => {
        try {
            await eventService.remove(selectedEvent._id);
        } catch (error) {
            setHasError({ message: error.message });
        }

        setEvents(events => events.filter(event => event._id !== selectedEvent._id));
        setSelectedEvent({});
        setShowModal(false);
    }

    const onLikeClicked = (id) => {
        likeService.create({
            eventId: id
        }).then(result =>
            setLiked(state => [...state, result])
        ).catch(e => setHasError({ message: e.message }));
    }

    const onDislikeClicked = (like) => {
        likeService.remove(like._id)
            .then(result =>
                setLiked(state => state.filter((l => l !== like)))
            ).catch(e => setHasError({ message: e.message }));
    }

    const searchSubmitHandler = async (searchValue) => {
        try {
            const res = await eventService.getByFilter(searchValue.search.trim());
            setEvents(res);
        } catch (error) {
            setHasError({ message: error.message });
        }
    }

    if (hasError) return <SomethingWrong message={hasError.message} />

    return (
        <>
            <section>
                <InnerNav searchSubmitHandler={searchSubmitHandler} defaultDataHandler={loadAll}/>
                
                <div className={styles['event-container']}>
                    {isLoading && <Spinner animation="border" />}
                    {!isLoading && !events.length && <h1>No matching events</h1>}
                    {events.map((event) => (
                        <div key={event._id} className={styles['event-card']}>
                            <EventListItem {...event}
                                userId = {userId}
                                like={liked.find(l => l.eventId === event._id)}
                                onLikeClicked={onLikeClicked}
                                onDislikeClicked={onDislikeClicked}
                                onDeleteButtonClick={onDeleteButtonClick}
                            />
                        </div>
                    ))}
                </div>
            </section>

            <DeleteEventModal show={showModal} onClose={() => { setShowModal(false) }} deleteUserHandler={deleteUserHandler} event={selectedEvent} />
        </>
    );
}

export default EventList;
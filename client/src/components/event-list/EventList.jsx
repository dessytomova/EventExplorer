import { useContext, useEffect, useState } from "react";
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
    const [hasError, setHasError] = useState(false);
    const [liked, setLiked] = useState([]);
    const { userId } = useContext(AuthContext);


    const loadAll = () => {
        eventService
        .getAll()
        .then(result => setEvents(result))
        .catch(e => setHasError(true));
    }


    useEffect(() => {
       loadAll()
    }, []);

    useEffect(() => {
       
        likeService.getAllByUserId(userId)
            .then(res => setLiked(res));
    }, [])

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

    const onLikeClicked = (id) => {
        likeService.create({
            eventId: id
        }).then(result =>
            setLiked(state => [...state, result])
        ).catch(e => setHasError(true));
    }

    const onDislikeClicked = (like) => {
        likeService.remove(like._id)
            .then(result =>
                setLiked(state => state.filter((l => l !== like)))
            ).catch(e => setHasError(true));
    }

    const searchSubmitHandler = async (searchValue) => {
        try {
            const res = await eventService.getByFilter(searchValue.search);
            setEvents(res);
            
        } catch (error) {
            setHasError(true);
        }
    }

    if (hasError) return <SomethingWrong />

    return (
        <>
            <section>
                <InnerNav searchSubmitHandler={searchSubmitHandler} defaultDataHandler={loadAll}/>
                
                <div className={styles['event-container']}>
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
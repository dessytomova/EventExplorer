import { useContext, useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import * as  likeService from "../../services/likeService";
import EventListItemLiked from "./event-list-liked-item/EventListLikedItem";
import styles from './EventListLiked.module.css';
import SomethingWrong from "../something-wrong/SomethingWrong";
import AuthContext from "../../context/authContext";


const EventListLiked = () => {
    const [liked, setLiked] = useState([]);
    const [hasError, setHasError] = useState();
    const { userId } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        
        likeService
            .getAllLiked(userId)
            .then(result => {
                setLiked(result);
                setIsLoading(false);
            })
            .catch(e => setHasError({ message: e.message }));
    }, []);

    if (hasError) return <SomethingWrong message={hasError.message}/>

    return (
        <>
            <section>
                <div className={styles['event-container']} >
                    {isLoading && <Spinner animation="border" />}
                    {liked.map((likeEvent) => (
                        <div key={likeEvent._id}  className={styles['event-card']}>
                            <EventListItemLiked {...likeEvent} />
                        </div>
                    ))}
                     {!isLoading && !liked.length && (
                        <div className={styles['no-events-container']}>
                            <h1>You have no saved events.</h1>
                        </div>
                    )}
                </div>
            </section>
        </>
    );

    
}

export default EventListLiked;
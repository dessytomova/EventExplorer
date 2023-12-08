import { useContext, useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import * as  likeService from "../../services/likeService";
import EventListItemLiked from "./event-list-liked-item/EventListLikedItem";
import styles from './EventListLiked.module.css';
import SomethingWrong from "../something-wrong/SomethingWrong";
import AuthContext from "../../context/authContext";
import InnerNav from "../inner-nav/InnerNav";


const EventListLiked = () => {
    const [liked, setLiked] = useState([]);
    const [hasError, setHasError] = useState();
    const { userId } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const loadAll = () => {
        likeService
        .getAllLiked(userId)
        .then(result => {
            setLiked(result);
            setIsLoading(false);

        })
        .catch(e => setHasError({ message: e.message }));
    }

    useEffect(() => {
        setIsLoading(true);
        loadAll();
    }, []);

    const onDislikeClicked = (like) => {

        likeService.remove(like._id)
            .then(result =>
                setLiked(state => state.filter((l => l !== like)))
            ).catch(e => setHasError({ message: e.message }));
    }

    const searchSubmitHandler = async (searchValue) => {
        try {
            const res = await likeService.getAllLikedFiltered(userId, searchValue.search.trim());
            setLiked(res);
        } catch (error) {
            setHasError({ message: error.message });
        }
    }

    if (hasError) return <SomethingWrong message={hasError.message}/>

    return (
        <>
            <section>
                <InnerNav searchSubmitHandler={searchSubmitHandler} defaultDataHandler={loadAll} />

                <div className={styles['event-container']} >
                    {isLoading && <Spinner animation="border" />}
                    {liked.map((likeEvent) => (
                        <div key={likeEvent._id}  className={styles['event-card']}>
                            <EventListItemLiked 
                                like = {likeEvent} 
                                onDislikeClicked = {onDislikeClicked}
                            />
                        </div>
                    ))}
                     {!isLoading && !liked.length && (
                        <div className={styles['no-events-container']}>
                            <h1>No matching events.</h1>
                        </div>
                    )}
                </div>
            </section>
        </>
    );

    
}

export default EventListLiked;
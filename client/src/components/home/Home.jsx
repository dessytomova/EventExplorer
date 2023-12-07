import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from "react";
import * as  eventService from "../../services/eventService";
import MyCarousel from "../my-carousel/MyCarousel";
import styles from "./Home.module.css";
import SomethingWrong from "../something-wrong/SomethingWrong";

const Home = () => {
    const [events, setEvents] = useState([]);
    const [hasError, setHasError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        eventService
            .getNearest(5)
            .then(result => {
                setEvents(result);
                setIsLoading(false);
            })
            .catch(e => setHasError({ message: e.message }));
    }, []);

    if (hasError) return <SomethingWrong message={hasError.message} />

    return (
        <>
            <section>
                <Container>
                    <h1 className={styles.heading}>Dive into the heart of the music scene</h1>        
                    <h2>Discover and share the hottest music events in town. Find your perfect groove here.</h2>
                    <div className={styles.spinnerContainer}>
                        {isLoading && <Spinner animation="border" className={styles.spinner} />}
                    </div>
                    {!isLoading && <MyCarousel events={events} />}
                </Container>
            </section>
        </>
    );
}

export default Home;
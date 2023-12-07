import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as  eventService from "../../services/eventService";
import MyCarousel from "../my-carousel/MyCarousel";
import styles from "./Home.module.css";
import SomethingWrong from "../something-wrong/SomethingWrong";

const Home = () => {
    const [events, setEvents] = useState([]);
    const [hasError, setHasError] = useState();

    useEffect(() => {
        eventService
            .getNearest(5)
            .then(result => setEvents(result))
            .catch(e => setHasError({ message: e.message }));
    }, []);

    if (hasError) return <SomethingWrong message={hasError.message} />

    return (
        <>
            <section>
                <Container>
                    <h1 className={styles.heading}>Explore With Us</h1>
                    <MyCarousel events={events} />
                </Container>
            </section>
        </>
    );
}

export default Home;
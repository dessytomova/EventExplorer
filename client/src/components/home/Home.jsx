import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as  eventService from "../../services/eventService";
import MyCarousel from "../my-carousel/MyCarousel";
import styles from "./Home.module.css";

const Home = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        eventService
            .getAll()
            .then(result => setEvents(result));
    }, []);


    return (
        <>
            <section>
                <Container>
                    <h1 className={styles.heading}>Explore With Us</h1>
                    <MyCarousel events={events}/>
                </Container>
            </section>
        </>
    );
}

export default Home;
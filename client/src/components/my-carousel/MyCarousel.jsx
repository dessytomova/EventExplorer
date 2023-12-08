import Carousel from 'react-bootstrap/Carousel';
import styles from "./MyCarousel.module.css";

const MyCarousel = ({
    events
}) => {
    return (
        <Carousel className={styles['carousel-container']}>
            {events.map(event => (
                <Carousel.Item key={event._id}>
                    <div className={styles['image-container']}>
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className={styles['carousel-img']}
                        />
                    </div>
                    <Carousel.Caption>
                        <h3>{event.title}</h3>
                        <p>{event.description.length > 200 ? `${event.description.slice(0, 200)}...` : event.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default MyCarousel;
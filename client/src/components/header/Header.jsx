import { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import AuthContext from '../../context/authContext';
import Path from '../../paths';
import styles from './Header.module.css';


const Header = () => {
    const { isAuthenticated, username } = useContext(AuthContext);

    return (
        <>
            <header id="header" className={styles.header}>
                <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/">EventsExplorer</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className={styles.headerNav}>
                                <Nav.Link as={Link} to="/" >Home</Nav.Link>
                                <Nav.Link as={Link} to={Path.Events}>Events</Nav.Link>

                                {!isAuthenticated && (
                                    <>
                                        <Nav.Link as={Link} to={Path.Login}>Login</Nav.Link>
                                        <Nav.Link as={Link} to={Path.Register}>Register</Nav.Link>
                                    </>
                                )}

                                {isAuthenticated && (
                                    <>
                                        <Nav.Link as={Link} to={Path.MyEvents}>My Events</Nav.Link>
                                        <Nav.Link as={Link} to={Path.Liked}>Liked</Nav.Link>
                                        <Nav.Link as={Link} to={Path.Events + "/add"} >New Event</Nav.Link>
                                        <Nav.Link as={Link} to={Path.Logout}>
                                            Logout | <span>{username}</span>
                                        </Nav.Link>
                                    </>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default Header;

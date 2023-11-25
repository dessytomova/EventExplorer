import { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import AuthContext from '../../context/authContext';
import Path from '../../paths';

const Header = () => {
    const { isAuthenticated,username } = useContext(AuthContext);

    return (
        <>
            <header id="header">
                <Navbar expand="lg" className="bg-body-tertiary" fluid data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/">EventsExplorer</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to={Path.Events}>Events</Nav.Link>
                                {!isAuthenticated && (<Nav.Link as={Link} to={Path.Login}>Login</Nav.Link>)}
                                {!isAuthenticated && (<Nav.Link as={Link} to={Path.Register}>Register</Nav.Link>)}
                                {isAuthenticated && (<Nav.Link as={Link} to={Path.Events + "/add"}>New Event</Nav.Link>)}
                                {isAuthenticated && (
                                <Nav.Link as={Link} to={Path.Logout}>
                                    Logout | <span>{username}</span>
                                </Nav.Link>)}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default Header;

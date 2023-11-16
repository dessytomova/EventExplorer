import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header id="header">
                <Navbar expand="lg" className="bg-body-tertiary" fluid data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/">EventExplorer</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/events">Events</Nav.Link>
                                <Nav.Link as={Link} to="/events/add">New Event</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default Header;

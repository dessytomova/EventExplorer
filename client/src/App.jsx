import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import EventList from './components/event-list/EventList';
import EventDetails from './components/event-details/EventDetails';
import CreateEventForm from './components/event-create/CreateEventForm';
import LoginForm from './components/login/LoginForm';
import NotFound from './components/not-found/NotFound';
import { Container } from 'react-bootstrap';
import '../public/styles.css'; 


function App() {
  return (
      <div className="d-flex flex-column min-vh-100 custom-body">
      <Header />

      <Container className="mt-4 mb-4 flex-grow-1">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/events' element={<EventList />} />
          <Route path='/events/:id' element={<EventDetails />} />
          <Route path='/events/add' element={<CreateEventForm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>

      <Footer />
    </div>

  );
}

export default App;
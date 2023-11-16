import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import EventList from './components/event-list/EventList';
import EventDetails from './components/event-details/EventDetails';
import CreateEventForm from './components/event-create/CreateEventForm';
import NotFound from './components/not-found/NotFound';
import { Container } from 'react-bootstrap';


function App() {
  return (
    <div>
      <Header />

      <Container className="mt-4 mb-4">
        <Routes>
          <Route path='/' element={<Home />} />
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
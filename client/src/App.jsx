import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import Home from './components/Home';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import CreateEventForm from './components/CreateEventForm';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      {/* ======= Header ======= */}
      <Header />

      {/* ======= Main Area ======= */}
      {/* <main id="main">
        <MainArea />
      </main> */}
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/events' element = {<EventList />} />
        <Route path='/events/:id' element = {<EventDetails />} />
        <Route path='/events/add' element = {<CreateEventForm />} />
        <Route path='*' element = {<NotFound/>} />
      </Routes>
       {/* ======= Footer ======= */}
      <Footer />
    </>

  );
}

export default App;
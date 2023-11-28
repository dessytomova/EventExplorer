import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import EventList from './components/event-list/EventList';
import EventDetails from './components/event-details/EventDetails';
import EditEventForm from './components/event-edit/EventEditForm';
import CreateEventForm from './components/event-create/CreateEventForm';
import LoginForm from './components/login/LoginForm';
import NotFound from './components/not-found/NotFound';
import { Container } from 'react-bootstrap';
import RegisterForm from './components/register/RegisterForm';
import Logout from './components/logout/Logout';
import {AuthProvider} from './context/authContext';
import Path from './paths';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css';
import ErrorBoundary from './components/ErrorBoundary';



function App() {

  return (
    <ErrorBoundary>
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100 custom-body">
        <Header />

        <Container className="mt-4 mb-4 flex-grow-1">
          <Routes>
            <Route path={Path.Home} element={<Home />} />
            <Route path={Path.Login} element={<LoginForm />} />
            <Route path={Path.Register} element={<RegisterForm />} />
            <Route path={Path.Events} element={<EventList />} />
            <Route path={Path.Events + '/:id'} element={<EventDetails />} />
            <Route path={Path.Events + '/add'} element={<CreateEventForm />} />
            <Route path={Path.Events + '/:id' + '/edit'} element={<EditEventForm />} />
            <Route path={Path.Logout} element={<Logout />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </AuthProvider>
    </ErrorBoundary>

  );
}

export default App;
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import EventList from './components/event-list/EventList';
import EventDetails from './components/event-details/EventDetails';
import CreateEventForm from './components/event-create/CreateEventForm';
import LoginForm from './components/login/LoginForm';
import NotFound from './components/not-found/NotFound';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css';
import RegisterForm from './components/register/RegisterForm';
import Logout from './components/logout/Logout';
import AuthContext from './context/authContext';
import { useState } from 'react';
import * as authService from './services/authService';
import Path from './paths';


function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});

  const loginSubmitHandler = async (values) => {
    const result = await authService.login(values.email, values.password);
    setAuth(result);
    navigate(Path.Home);
  };

  const registerSubmitHandler = async (values) => {
    const result = await authService.register(values.email, values.password);
    setAuth(result);
    navigate(Path.Home);
  };

   const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    username: auth.email,
    email: auth.email,
    isAuthenticated: !!auth.email
  }

  return (
    <AuthContext.Provider value={values}>
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
            <Route path={Path.Logout} element={<Logout />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </AuthContext.Provider>

  );
}

export default App;
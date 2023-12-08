# EventsExplorer

This is a course project intended for educational purposes only.

## Project Description

The project involves the development of an application for publishing music events. Here are the key features:

- Every user of the application can browse upcoming events. Past events are not displayed.
- Registered users can create new events and edit their own events.
- Each registered user has a dedicated page where they can view events they have liked.
- The Softuni Practise server is used as the backend.

## Project Structure

The application is divided into two parts: the frontend folder - `client` and the backend folder - `server`.

### Frontend (client) Setup

To start the client-side, navigate to the `/client` directory in the terminal and execute the following commands:

#### Development Build:

cd client
npm install
npm run dev

#### Production Build:

cd client
npm install
npm run build
npm run preview

### Backend :

Manually open a command prompt and run node server.js.

cd server
node server.js.

### Authentication
The service is initialized with three users, which can be used for immediate testing:

peter@abv.bg : 123456
george@abv.bg : 123456
admin@abv.bg : admin
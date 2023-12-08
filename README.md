# EventsExplorer

This is a course project for a React development course, intended for educational purposes only.

## Project Description

The project involves the development of a React application for publishing music events. Here are the key features:

- Every user of the application can browse upcoming events. Past events are not displayed.
- Registered users can create new events and edit their own events.
- Each registered user has a dedicated page where they can view events they have liked.
- The [Softuni Practise server](https://github.com/softuni-practice-server/softuni-practice-server) is used as the backend and contains preloaded data to facilitate easier project demonstration.

## Project Structure

The application is divided into two parts: the frontend folder - `client` and the backend folder - `server`.

### Frontend (client) Setup

To start the client-side, navigate to the `/client` directory in the terminal and execute the following commands:

#### Development Build:
```bash
cd client
npm install
npm run dev
```
#### Production Build:
```bash
cd client
npm install
npm run build
npm run preview
```
### Backend :

Manually open a command prompt and run node server.js.
```bash
cd server
node server.js.
```
### Authentication
The service is initialized with three users, which can be used for immediate testing:
```bash
peter@abv.bg : 123456

george@abv.bg : 123456

admin@abv.bg : admin
```

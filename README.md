# EventsExplorer

This is a course project for a React development course, intended for educational purposes only.

## Project Description

The project involves the development of a React application for publishing music events. Here are the key features:

- Every user of the application can browse upcoming events. Past events are not displayed.
- Registered users can create new events and edit their own events.
- Each registered user has a dedicated page where they can view events they have liked.
- The [Softuni Practice server](https://github.com/softuni-practice-server/softuni-practice-server) is used as the backend and contains preloaded data to facilitate easier project demonstration.

### Project Structure

The application is divided into two parts: the frontend folder - `client` and the backend folder - `server`.

#### Client-side

The client-side is organized into subdirectories for each component. Each folder contains a file for the component, as well as a modular CSS file.

- Components: Each component has its own folder with component files and modular CSS.
- Custom Hooks: Custom hooks are organized in a separate folder.
- Lib: The `lib` folder holds shared libraries.
- Utils: The `utils` folder contains utility functions.
- Services: The `services` folder includes service-related files for API requests.

#### Server-side

The [Softuni Practice server](https://github.com/softuni-practice-server/softuni-practice-server) is used as the backend

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
The service is initialized with two users, which can be used for immediate testing:
```bash
peter@abv.bg : 123456
george@abv.bg : 123456
```

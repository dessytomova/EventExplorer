import Alert from "react-bootstrap/Alert";

const ErrorAlert = (props) => {
    return(
        <Alert key="danger" variant="danger">{props.message || "Something went wrong."}.</Alert>
    );
}

export default ErrorAlert;
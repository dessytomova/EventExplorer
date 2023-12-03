import { Button, Col, InputGroup, Navbar, Row , Form} from "react-bootstrap";
import useForm from "../../hooks/useFormHook";
import styles from './InnerNav.module.css';

const InnerNav = ({searchSubmitHandler, defaultDataHandler}) => {
    const {values,onChange, onReset, onSubmit} = useForm(searchSubmitHandler,  {
         'search' : '', 
    });


    return (
        <Navbar className="bg-body-tertiary justify-content-between"  data-bs-theme="dark">
       
        <Form inline onSubmit={onSubmit}>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className={styles['mr-sm-2']}
                name="search"
                onChange={onChange}
                value={values.search}
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" className={styles['card-link']}>Search</Button>
              <Button variant="danger" className={styles['card-link']}  onClick={()=>{onReset();defaultDataHandler();}}>Reset</Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
    );
};

export default InnerNav;

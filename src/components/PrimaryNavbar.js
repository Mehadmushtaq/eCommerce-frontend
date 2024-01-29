import { Col, Row, Button, Form, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function PrimaryNavbar() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to="/">LOGO</Link>
        </Navbar.Brand>
        <Form inline>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Search</Button>
            </Col>
          </Row>
        </Form>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link to="/register" className="btn btn-outline">
              Account
              {/* <i className="fa-solid fa-user">Account</i> */}
            </Link>
          </Navbar.Text>
          <Navbar.Text>
            <a href="#" className="btn btn-outline">
              Cart(0)
              {/* <i className="fa-solid fa-cart-shopping">Cart(0)</i> */}
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PrimaryNavbar;

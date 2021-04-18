import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";

import { listCustomers } from "../actions/customerActions";

const HomeScreen = ({ match, history }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const [reload, setReload] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const customerList = useSelector((state) => state.customerList);
  const { loading, error, customers, page, pages } = customerList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(listCustomers(keyword, pageNumber));
    setReload(false);
  }, [dispatch, keyword, pageNumber, history, userInfo, reload]);

  return (
    <>
      <Meta />
      {keyword && (
        <Link to="/home" className="btn btn-light">
          Regresar
        </Link>
      )}

      <Row className="align-items-center">
        <Col>
          <h1>Mis Clientes</h1>
        </Col>
        <Col className="text-right">
          <LinkContainer to={`/customer`}>
            <Button variant="primary" className="btn-sm">
              <i className="fas fa-plus"></i> Crear Cliente
            </Button>
          </LinkContainer>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Carros</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.cars.length}</td>
                  <td className="text-center">
                    <LinkContainer to={`/cars/customer/${customer._id}/`}>
                      <Button variant="primary" className="btn-sm">
                        <i className="fas fa-list"></i> Listar Carros
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;

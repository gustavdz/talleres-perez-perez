import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";

import { listCars } from "../actions/carActions";

const CarListScreen = ({ match, history }) => {
  const pageNumber = match.params.pageNumber || 1;
  const customerId = match.params.customerId;
  const keyword = "";
  const [reload, setReload] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const carList = useSelector((state) => state.carList);
  const { loading, error, cars, page, pages } = carList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(listCars(keyword, pageNumber, customerId));
    setReload(false);
  }, [dispatch, pageNumber, history, userInfo, customerId, reload]);

  return (
    <>
      <Meta />

      <Link to="/home" className="btn btn-light">
        Regresar
      </Link>

      <Row className="align-items-center">
        <Col>
          <h1>Carros del cliente</h1>
        </Col>
        <Col className="text-right">
          <LinkContainer to={`/car/customer/${customerId}`}>
            <Button variant="primary" className="btn-sm">
              <i className="fas fa-plus"></i> Agregar Carro
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
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Reparaciones</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id}>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>{car.repairs.length}</td>
                  <td className="text-center">
                    <LinkContainer to={`/repairs/car/${car._id}/`}>
                      <Button variant="primary" className="btn-sm">
                        <i className="fas fa-list"></i> Listar Reparaciones
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} keyword={""} />
        </>
      )}
    </>
  );
};

export default CarListScreen;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";

import { listRepairsByCar } from "../actions/repairActions";

const RepairListByCarScreen = ({ match, history }) => {
  const pageNumber = match.params.pageNumber || 1;
  const carId = match.params.carId;
  const [reload, setReload] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const repairList = useSelector((state) => state.repairList);
  const { loading, error, repairs, page, pages } = repairList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(listRepairsByCar(pageNumber, carId));
    setReload(false);
  }, [dispatch, pageNumber, history, userInfo, carId, reload]);

  return (
    <>
      <Meta />

      <Link to="/home" className="btn btn-light">
        Regresar
      </Link>

      <Row className="align-items-center">
        <Col>
          <h1>Reparaciones del carro</h1>
        </Col>
        <Col className="text-right">
          <LinkContainer to={`/repair/car/${carId}`}>
            <Button variant="primary" className="btn-sm">
              <i className="fas fa-plus"></i> Agregar Reparación
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
                <th>Fecha</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {repairs.map((repair) => (
                <tr key={repair._id}>
                  <td>{repair.date}</td>
                  <td>{repair.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} screen={`repairs/car/${carId}`} />
        </>
      )}
    </>
  );
};

export default RepairListByCarScreen;

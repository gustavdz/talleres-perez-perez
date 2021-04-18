import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";

import { listRepairs } from "../actions/repairActions";

const RepairListScreen = ({ match, history }) => {
  const pageNumber = match.params.pageNumber || 1;
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
    dispatch(listRepairs(pageNumber));
    setReload(false);
  }, [dispatch, pageNumber, history, userInfo, reload]);

  return (
    <>
      <Meta />

      <Row className="align-items-center">
        <Col>
          <h1>Reparaciones</h1>
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
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Dueño</th>
              </tr>
            </thead>
            <tbody>
              {repairs.map((repair) => (
                <tr key={repair._id}>
                  <td>{repair.date}</td>
                  <td>{repair.description}</td>
                  <td>{repair.car.brand}</td>
                  <td>{repair.car.model}</td>
                  <td>{repair.car.year}</td>
                  <td>{repair.car.owner.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} keyword={""} screen={"repairs"} />
        </>
      )}
    </>
  );
};

export default RepairListScreen;

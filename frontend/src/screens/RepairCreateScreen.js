import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { createRepair } from "../actions/repairActions";

import { REPAIR_CREATE_RESET } from "../constants/repairConstants";

const RepairCreateScreen = ({ match, history }) => {
  const car = match.params.carId;
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const repairCreate = useSelector((state) => state.repairCreate);
  const { loading, error, success } = repairCreate;

  useEffect(() => {
    if (success) {
      history.push(`/home`);
    }
    dispatch({ type: REPAIR_CREATE_RESET });
  }, [dispatch, history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createRepair({
        description,
        carToRepair: car,
      })
    );
  };

  return (
    <>
      <Link to={`/home`} className="btn btn-light my-3">
        Regresar
      </Link>
      <FormContainer>
        <h1>Nueva reparación</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="description">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese el problema del carro"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                style={{ marginBottom: "10px" }}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              style={{ marginBottom: "10px" }}
            >
              Guardar
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default RepairCreateScreen;

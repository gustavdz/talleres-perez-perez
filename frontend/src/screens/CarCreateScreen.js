import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { createCar } from "../actions/carActions";

import { CAR_CREATE_RESET } from "../constants/carConstants";

const CarCreateScreen = ({ match, history }) => {
  const owner = match.params.customerId;
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const dispatch = useDispatch();

  const carCreate = useSelector((state) => state.carCreate);
  const { loading, error, success } = carCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: CAR_CREATE_RESET });
      history.push(`/cars/customer/${owner}`);
    }
  }, [dispatch, history, success, owner]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCar({
        brand,
        model,
        year,
        repairs: [],
        owner,
      })
    );
  };

  return (
    <>
      <Link to={`/cars/customer/${owner}`} className="btn btn-light my-3">
        Regresar
      </Link>
      <FormContainer>
        <h1>Nuevo carro</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="brand">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la marca"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
                style={{ marginBottom: "10px" }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="model">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el modelo"
                value={model}
                onChange={(e) => {
                  setModel(e.target.value);
                }}
                style={{ marginBottom: "10px" }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="year">
              <Form.Label>Año</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el año"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                style={{ marginBottom: "10px" }}
              ></Form.Control>
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

export default CarCreateScreen;

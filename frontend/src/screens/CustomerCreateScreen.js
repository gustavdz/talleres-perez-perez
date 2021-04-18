import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { createCustomer } from "../actions/customerActions";

import { CUSTOMER_CREATE_RESET } from "../constants/customerConstants";

const CustomerCreateScreen = ({ match, history }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const customerCreate = useSelector((state) => state.customerCreate);
  const { loading, error, success } = customerCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: CUSTOMER_CREATE_RESET });
      history.push("/home");
    }
  }, [dispatch, history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCustomer({
        name,
        phone,
      })
    );
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Regresar
      </Link>
      <FormContainer>
        <h1>Nuevo cliente</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                style={{ marginBottom: "10px" }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el teléfono"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
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

export default CustomerCreateScreen;

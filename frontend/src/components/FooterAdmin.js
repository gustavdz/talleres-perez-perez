import React from "react";
import moment from "moment-timezone";
import { Row, Col, Card } from "@themesberg/react-bootstrap";

const FooterAdmin = () => {
  const currentYear = moment().get("year");
  return (
    <footer className="footer section py-5">
      <Row>
        <Col xs={12} className="mb-4 mb-lg-0">
          <p className="mb-0 text-center">
            Copyright © {`${currentYear} `} Talleres Pérez {"&"} Pérez.
            Desarrollado por{" "}
            <Card.Link
              href="https://gustavodecker.com"
              target="_blank"
              className="text-blue text-decoration-none fw-normal"
            >
              Gustavo Decker
            </Card.Link>
          </p>
        </Col>
      </Row>
    </footer>
  );
};
export default FooterAdmin;

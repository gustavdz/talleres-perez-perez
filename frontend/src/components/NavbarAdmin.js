import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Image,
  Navbar,
  Dropdown,
  Container,
} from "@themesberg/react-bootstrap";
import { logout } from "../actions/userActions";

import ProfileDefault from "../assets/img/team/profile-picture-default.png";
import { Route } from "react-router-dom";
import SearchBox from "./SearchBox";

const NavbarAdmin = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      {userInfo && (
        <Container fluid className="px-0">
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex align-items-center">
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </div>
            <Nav className="align-items-center">
              {userInfo && (
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                    <div className="media d-flex align-items-center">
                      <Image
                        src={ProfileDefault}
                        className="user-avatar md-avatar rounded-circle"
                      />
                      <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                        <span className="mb-0 font-small fw-bold">
                          {userInfo.name}
                        </span>
                      </div>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                    <Dropdown.Item className="fw-bold" onClick={logoutHandler}>
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="text-danger me-2"
                      />{" "}
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </div>
        </Container>
      )}
    </Navbar>
  );
};

export default NavbarAdmin;

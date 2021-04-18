import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import Preloader from "./components/Preloader";
import FooterAdmin from "./components/FooterAdmin";
import NavbarAdmin from "./components/NavbarAdmin";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import CustomerCreateScreen from "./screens/CustomerCreateScreen";
import CarListScreen from "./screens/CarListScreen";
import CarCreateScreen from "./screens/CarCreateScreen";
import RepairListByCarScreen from "./screens/RepairListByCarScreen";
import RepairListScreen from "./screens/RepairListScreen";
import RepairCreateScreen from "./screens/RepairCreateScreen";

const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Preloader show={loaded ? false : true} />
          <Route path="/" component={LoginScreen} />
        </Route>
        <Route path="/login" exact>
          <Preloader show={loaded ? false : true} />
          <Route path="/login" component={LoginScreen} />
        </Route>
        <Route path="/register">
          <Preloader show={loaded ? false : true} />
          <Route path="/register" component={RegisterScreen} />
        </Route>
        <Route path="/:path?">
          <>
            <Preloader show={loaded ? false : true} />
            <Sidebar />
            <main className="content">
              {/* <Header /> */}
              <NavbarAdmin />
              <Container>
                <Switch>
                  <Route path="/home" component={HomeScreen} exact />
                  <Route path="/search/:keyword" component={HomeScreen} exact />
                  <Route
                    path="/page/:pageNumber"
                    component={HomeScreen}
                    exact
                  />
                  <Route
                    path="/search/:keyword/page/:pageNumber"
                    component={HomeScreen}
                    exact
                  />
                  <Route
                    path="/customer"
                    component={CustomerCreateScreen}
                    exact
                  />

                  <Route
                    path="/cars/customer/:customerId"
                    component={CarListScreen}
                    exact
                  />

                  <Route
                    path="/cars/customer/:customerId/page/:pageNumber"
                    component={CarListScreen}
                    exact
                  />

                  <Route
                    path="/car/customer/:customerId"
                    component={CarCreateScreen}
                    exact
                  />

                  <Route
                    path="/repairs/car/:carId"
                    component={RepairListByCarScreen}
                    exact
                  />

                  <Route
                    path="/repairs/car/:carId/page/:pageNumber"
                    component={RepairListByCarScreen}
                    exact
                  />

                  <Route
                    path="/repair/car/:carId"
                    component={RepairCreateScreen}
                    exact
                  />

                  <Route path="/repairs" component={RepairListScreen} exact />

                  <Route
                    path="/repairs/page/:pageNumber"
                    component={RepairListScreen}
                    exact
                  />

                  <Route component={NotFoundScreen} />
                </Switch>
              </Container>
              <FooterAdmin />
            </main>
          </>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

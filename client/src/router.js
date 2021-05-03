import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AuthForm from "./components/Authform/authForm";
import Home from "./Home";
const BaseRoute = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth/" component={AuthForm} />
      </Switch>
    </>
  );
};

export default BaseRoute;

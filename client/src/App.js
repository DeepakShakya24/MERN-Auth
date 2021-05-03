import BaseRoute from "./router";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <BaseRoute />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

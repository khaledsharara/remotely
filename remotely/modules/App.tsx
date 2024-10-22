import { Provider } from "react-redux";
import "./shared/styles/App.css";
import AppRouter from "./AppRouter";
import store from "./shared/utils/store";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./employee/App";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

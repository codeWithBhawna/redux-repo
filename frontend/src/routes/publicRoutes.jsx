import { Route } from "react-router-dom";
import Home from "../pages/Home";

const PublicRoutes = () => (
  <>
    <Route path="/" element={<Home />} />
  </>
);
export default PublicRoutes;

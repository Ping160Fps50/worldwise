import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

function Homepage() {
  return (
    <div>
      <PageNav />
      <h1>Home Page</h1>
      <Link to="/app">App</Link>
    </div>
  );
}

export default Homepage;

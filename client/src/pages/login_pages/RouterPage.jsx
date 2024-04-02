import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
export default function RouterPage(params) {
  return (
    <div>
      <NavBar></NavBar>

      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}

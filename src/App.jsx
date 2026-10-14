import { Link } from "react-router";
import Routing from "./components/Routing";

function App() {
  return (
    <div>
      <header>
        <div>
          <nav className="shadow-lg p-2 text-gray-600">
            <ul className="flex items-center justify-end uppercase">
              <Link className="font-medium p-1 mx-1 hover:text-black" to="/">
                Beranda
              </Link>
              <Link className="font-medium p-1 mx-1 hover:text-black" to="/about">
                Tentang
              </Link>
              <Link className="font-medium p-1 mx-1 hover:text-black" to="/contact">
                Kontak
              </Link>
            </ul>
          </nav>
        </div>
      </header>
      <Routing></Routing>
    </div>
  );
}

export default App;

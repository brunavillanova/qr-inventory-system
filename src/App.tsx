import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Scanner from "./pages/Scanner";

import RotaPrivada from "./components/RotaPrivada";
import Layout from "./components/Layout";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <RotaPrivada>
              <Layout>
                <Dashboard />
              </Layout>
            </RotaPrivada>
          }
        />

        <Route
          path="/produtos"
          element={
            <RotaPrivada>
              <Layout>
                <Produtos />
              </Layout>
            </RotaPrivada>
          }
        />

        <Route
          path="/scanner"
          element={
            <RotaPrivada>
              <Layout>
                <Scanner />
              </Layout>
            </RotaPrivada>
          }
        />

      </Routes>

    </BrowserRouter>

  )

}

export default App
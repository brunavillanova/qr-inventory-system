import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Produtos = lazy(() => import("./pages/Produtos"));
const Scanner = lazy(() => import("./pages/Scanner"));

import RotaPrivada from "./components/RotaPrivada";
import Layout from "./components/Layout";
import { HashRouter } from "react-router-dom";

function App() {

  return (

   <HashRouter>
    <Suspense fallback={<h2 style={{textAlign:"center"}}>Carregando...</h2>}></Suspense>
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

    </HashRouter>

  )

}

export default App
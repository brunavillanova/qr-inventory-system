import { Routes, Route, HashRouter } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Scanner from "./pages/Scanner";

import Layout from "./components/Layout";

function App() {

  return (

    <HashRouter>

      <Routes>

        {/* 🔥 Página inicial direto no sistema */}
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/produtos"
          element={
            <Layout>
              <Produtos />
            </Layout>
          }
        />

        <Route
          path="/scanner"
          element={
            <Layout>
              <Scanner />
            </Layout>
          }
        />

      </Routes>

    </HashRouter>

  )

}

export default App;
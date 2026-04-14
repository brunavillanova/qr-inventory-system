import { Navigate } from "react-router-dom";

function RotaPrivada({ children }: any) {

  const logado = localStorage.getItem("logado");

  if (logado !== "true") {
    return <Navigate to="/" />;
  }

  return children;
}

export default RotaPrivada;
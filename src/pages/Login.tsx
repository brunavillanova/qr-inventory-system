import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function entrar() {

    const response = await api.get("/usuarios");

    const usuario = response.data.find(
      (u: any) => u.email === email && u.senha === senha
    );

    if (usuario) {

      localStorage.setItem("logado", "true");
      navigate("/dashboard");

    } else {
      alert("Usuário ou senha inválidos");
    }

  }

  function entrarVisitante() {
    localStorage.setItem("logado", "true");
    navigate("/dashboard");
  }

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b)"
      }}
    >

      <Paper
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          animation: "fadeIn 0.6s ease"
        }}
      >

        <Typography variant="h5" align="center" gutterBottom>
          Sistema de Inventário
        </Typography>

        <Typography align="center" color="text.secondary">
          Faça login para continuar
        </Typography>

        <TextField
          label="Email"
          fullWidth
          sx={{ mt: 3 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Senha"
          type="password"
          fullWidth
          sx={{ mt: 2 }}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            height: 45,
            borderRadius: 2,
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.03)"
            }
          }}
          onClick={entrar}
        >
          Entrar
        </Button>

        <Typography align="center" sx={{ mt: 2 }}>
          ou
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 2,
            height: 45,
            borderRadius: 2,
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.03)"
            }
          }}
          onClick={entrarVisitante}
        >
          Entrar como visitante
        </Button>

        {/* Usuário teste */}
        <Paper sx={{ p: 2, mt: 3, background: "#f1f5f9" }}>

          <Typography variant="body2" align="center">
            Usuário para teste:
          </Typography>

          <Typography variant="body2" align="center">
            Email: admin@email.com
          </Typography>

          <Typography variant="body2" align="center">
            Senha: 123456
          </Typography>

        </Paper>

      </Paper>

    </Box>

  );

}

export default Login;
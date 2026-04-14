import { useState } from "react";
import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login(){

  const [email,setEmail] = useState("")
  const [senha,setSenha] = useState("")

  const navigate = useNavigate()

  async function entrar(){

    const response = await api.get("/usuarios")

    const usuario = response.data.find(
      (u:any)=>u.email === email && u.senha === senha
    )

    if(usuario){

      localStorage.setItem("logado","true")

      navigate("/dashboard")

    }else{

      alert("Usuário ou senha inválidos")

    }

  }

  return(

    <Container maxWidth="sm">

      <Paper sx={{ p:4, mt:10 }}>

        <Typography variant="h5">
          Login
        </Typography>

        <TextField
          label="Email"
          fullWidth
          sx={{ mt:3 }}
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <TextField
          label="Senha"
          type="password"
          fullWidth
          sx={{ mt:2 }}
          value={senha}
          onChange={(e)=>setSenha(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt:3 }}
          onClick={entrar}
        >
          Entrar
        </Button>

      </Paper>

    </Container>

  )

}

export default Login
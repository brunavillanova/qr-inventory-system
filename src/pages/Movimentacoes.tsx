import { useEffect, useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import { api } from "../services/api";

function Movimentacoes(){

  const [movimentacoes,setMovimentacoes] = useState<any[]>([])

  async function carregar(){

    const response = await api.get("/movimentacoes")

    setMovimentacoes(response.data)

  }

  useEffect(()=>{
    carregar()
  },[])

  return(

    <Container>

      <Typography variant="h4" sx={{ mt:3 }}>
        Histórico de Movimentações
      </Typography>

      {movimentacoes.map((mov,index)=>(

        <Paper key={index} sx={{ p:2, mt:2 }}>

          <Typography>
            Produto: {mov.produto}
          </Typography>

          <Typography>
            Tipo: {mov.tipo}
          </Typography>

          <Typography>
            Data: {mov.data}
          </Typography>

        </Paper>

      ))}

    </Container>

  )

}

export default Movimentacoes
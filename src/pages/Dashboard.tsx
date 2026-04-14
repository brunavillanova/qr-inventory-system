import { useEffect, useState } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import { api } from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface Produto {
  id: number
  nome: string
  codigo: string
  quantidade: number
}

function Dashboard(){

  const [produtos,setProdutos] = useState<Produto[]>([])
  const [movimentacoes,setMovimentacoes] = useState<any[]>([])

  const [entradas,setEntradas] = useState(0)
  const [saidas,setSaidas] = useState(0)

  async function carregar(){

    const produtosResponse = await api.get("/produtos")
    setProdutos(produtosResponse.data)

    const movResponse = await api.get("/movimentacoes")

    let totalEntradas = 0
    let totalSaidas = 0

    movResponse.data.forEach((mov:any)=>{

      if(mov.tipo === "Entrada") totalEntradas++
      if(mov.tipo === "Saída") totalSaidas++

    })

    setEntradas(totalEntradas)
    setSaidas(totalSaidas)

    setMovimentacoes([
      { nome:"Entradas", valor:totalEntradas },
      { nome:"Saídas", valor:totalSaidas }
    ])

  }

  useEffect(()=>{
    carregar()
  },[])

  // métricas
  const totalProdutos = produtos.length
  const estoqueBaixo = produtos.filter(p=>p.quantidade <= 3).length

  return(

    <Container>

      <Typography variant="h4" sx={{ mt:3, mb:3 }}>
        Painel
      </Typography>

      {/* CARDS */}
      <Box sx={{ display:"flex", gap:3, mb:4 }}>

        <Paper sx={{ p:3, flex:1 }}>
          <Typography variant="h6">Produtos</Typography>
          <Typography variant="h4">{totalProdutos}</Typography>
        </Paper>

        <Paper sx={{ p:3, flex:1 }}>
          <Typography variant="h6">Estoque Baixo</Typography>
          <Typography variant="h4" color="error">
            {estoqueBaixo}
          </Typography>
        </Paper>

        <Paper sx={{ p:3, flex:1 }}>
          <Typography variant="h6">Entradas</Typography>
          <Typography variant="h4" color="success.main">
            {entradas}
          </Typography>
        </Paper>

        <Paper sx={{ p:3, flex:1 }}>
          <Typography variant="h6">Saídas</Typography>
          <Typography variant="h4" color="warning.main">
            {saidas}
          </Typography>
        </Paper>

      </Box>

      {/* ESTOQUE */}
      <Paper sx={{ p:3, mt:3 }}>

        <Typography variant="h6">
          Estoque de Produtos
        </Typography>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={produtos}>
            <XAxis dataKey="nome"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="quantidade" radius={[8,8,0,0]} />
          </BarChart>

        </ResponsiveContainer>

      </Paper>

      {/* MOVIMENTAÇÕES */}
      <Paper sx={{ p:3, mt:3 }}>

        <Typography variant="h6">
          Movimentações
        </Typography>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={movimentacoes}>
            <XAxis dataKey="nome"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="valor" radius={[8,8,0,0]} />
          </BarChart>

        </ResponsiveContainer>

      </Paper>

    </Container>

  )

}

export default Dashboard
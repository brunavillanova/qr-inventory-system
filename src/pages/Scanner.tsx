import { useState } from "react";
import { Container, Typography, Paper, Button, Box } from "@mui/material";
import QRScanner from "../components/QRScanner";
import { api } from "../services/api";

function Scanner(){

  const [produto,setProduto] = useState<any>(null)

  async function handleScan(codigo:string){

    const response = await api.get(`/produtos?codigo=${codigo}`)

    if(response.data.length > 0){
      setProduto(response.data[0])
    }

  }

  async function entrada(){

    const novaQuantidade = produto.quantidade + 1

    await api.patch(`/produtos/${produto.id}`,{
      quantidade:novaQuantidade
    })

    // 👇 REGISTRA MOVIMENTAÇÃO
    await api.post("/movimentacoes",{
      produto: produto.nome,
      tipo: "Entrada",
      data: new Date().toLocaleString()
    })

    setProduto({
      ...produto,
      quantidade:novaQuantidade
    })

  }

  async function saida(){

    const novaQuantidade = produto.quantidade - 1

    if(novaQuantidade < 0){
      alert("Estoque não pode ficar negativo")
      return
    }

    await api.patch(`/produtos/${produto.id}`,{
      quantidade:novaQuantidade
    })

    // 👇 REGISTRA MOVIMENTAÇÃO
    await api.post("/movimentacoes",{
      produto: produto.nome,
      tipo: "Saída",
      data: new Date().toLocaleString()
    })

    setProduto({
      ...produto,
      quantidade:novaQuantidade
    })

  }

  return(

    <Container>

      <Typography variant="h4" sx={{ mt:3, mb:3 }}>
        Scanner
      </Typography>

      <Paper sx={{ p:2 }}>
        <QRScanner onScanSuccess={handleScan}/>
      </Paper>

      {produto &&(

        <Paper sx={{ p:3, mt:3 }}>

          <Typography variant="h6">
            Produto encontrado
          </Typography>

          <Typography>
            Nome: {produto.nome}
          </Typography>

          <Typography>
            Quantidade: {produto.quantidade}
          </Typography>

          <Box sx={{ display:"flex", gap:2, mt:2 }}>

            <Button
              variant="contained"
              color="success"
              onClick={entrada}
            >
              + Entrada
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={saida}
            >
              - Saída
            </Button>

          </Box>

        </Paper>

      )}

    </Container>

  )

}

export default Scanner
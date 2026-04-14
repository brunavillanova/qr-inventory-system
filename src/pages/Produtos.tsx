import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";

import { QRCodeCanvas } from "qrcode.react";
import { api } from "../services/api";
import * as XLSX from "xlsx";

interface Produto {
  id: string
  nome: string
  codigo: string
  quantidade: number
}

function Produtos(){

  const [produtos,setProdutos] = useState<Produto[]>([])
  const [busca,setBusca] = useState("")

  const [nome,setNome] = useState("")
  const [codigo,setCodigo] = useState("")
  const [quantidade,setQuantidade] = useState("")

  const [editando,setEditando] = useState<string | null>(null)

  async function carregarProdutos(){
    const response = await api.get("/produtos")
    setProdutos(response.data)
  }

  useEffect(()=>{
    carregarProdutos()
  },[])

  function exportarExcel(){

    const dados = produtos.map(produto => ({
      Nome: produto.nome,
      Codigo: produto.codigo,
      Quantidade: produto.quantidade
    }))

    const planilha = XLSX.utils.json_to_sheet(dados)

    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, planilha, "Produtos")

    XLSX.writeFile(workbook, "produtos.xlsx")

  }

  async function cadastrarProduto(){

    const novoProduto = {
      nome,
      codigo,
      quantidade:Number(quantidade)
    }

    await api.post("/produtos",novoProduto)

    setNome("")
    setCodigo("")
    setQuantidade("")

    carregarProdutos()

  }

  async function deletarProduto(id:string){

    await api.delete(`/produtos/${id}`)

    carregarProdutos()

  }

  async function salvarEdicao(id:string){

    await api.patch(`/produtos/${id}`,{
      nome,
      codigo,
      quantidade:Number(quantidade)
    })

    setEditando(null)

    setNome("")
    setCodigo("")
    setQuantidade("")

    carregarProdutos()

  }

  const produtosFiltrados = produtos.filter(produto=>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return(

    <Container>

      <Typography variant="h4" sx={{ mt:3 }}>
        Produtos
      </Typography>

      <Typography sx={{ mt:1 }}>
        Total de produtos: {produtos.length}
      </Typography>

      {/* BUSCA */}

      <TextField
        label="Buscar produto"
        fullWidth
        sx={{ mt:3 }}
        value={busca}
        onChange={(e)=>setBusca(e.target.value)}
      />

      {/* FORMULÁRIO */}

      <Paper sx={{ p:3, mt:3 }}>

        <Typography variant="h6">
          {editando ? "Editar Produto" : "Cadastrar Produto"}
        </Typography>

        <Box sx={{ display:"flex", gap:2, mt:2 }}>

          <TextField
            label="Nome"
            value={nome}
            onChange={(e)=>setNome(e.target.value)}
          />

          <TextField
            label="Código"
            value={codigo}
            onChange={(e)=>setCodigo(e.target.value)}
          />

          <TextField
            label="Quantidade"
            type="number"
            value={quantidade}
            onChange={(e)=>setQuantidade(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={() => {
              if (editando) {
                salvarEdicao(editando)
              } else {
                cadastrarProduto()
              }
            }}
          >
            {editando ? "Salvar" : "Cadastrar"}
          </Button>

          <Button
            variant="contained"
            onClick={exportarExcel}
          >
            Exportar Excel
          </Button>

        </Box>

      </Paper>

      {/* TABELA */}

      <Paper sx={{ p:3, mt:3 }}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>Nome</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>QR Code</TableCell>
              <TableCell>Ações</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {produtosFiltrados.map(produto=>(

              <TableRow key={produto.id}>

                <TableCell>{produto.nome}</TableCell>

                <TableCell>{produto.codigo}</TableCell>

                <TableCell
                  sx={{
                    color: produto.quantidade <= 3 ? "red" : "inherit",
                    fontWeight: produto.quantidade <= 3 ? "bold" : "normal"
                  }}
                >
                  {produto.quantidade}
                </TableCell>

                <TableCell>

                  <QRCodeCanvas
                    value={produto.codigo}
                    size={60}
                  />

                </TableCell>

                <TableCell>

                  <Button
                    size="small"
                    onClick={()=>{
                      setEditando(produto.id)
                      setNome(produto.nome)
                      setCodigo(produto.codigo)
                      setQuantidade(String(produto.quantidade))
                    }}
                  >
                    Editar
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    onClick={()=>{
                      if(confirm("Deseja realmente deletar este produto?")){
                        deletarProduto(produto.id)
                      }
                    }}
                  >
                    Deletar
                  </Button>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </Paper>

    </Container>

  )

}

export default Produtos
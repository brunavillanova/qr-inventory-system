import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";

function Layout({ children }: any) {

  const navigate = useNavigate();

  function logout(){
    localStorage.removeItem("logado")
    navigate("/")
  }

  return(

    <Box sx={{ display:"flex" }}>

      <Drawer
        variant="permanent"
        sx={{
          width:240,
          flexShrink:0,
          "& .MuiDrawer-paper":{
            width:240,
            background:"#111827",
            color:"white"
          }
        }}
      >

        <Box sx={{ p:3 }}>
          <Typography variant="h6">
            Inventário QR
          </Typography>
        </Box>

        <List>

          <ListItemButton onClick={()=>navigate("/dashboard")}>
            <ListItemIcon sx={{ color:"white" }}>
              <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Painel"/>
          </ListItemButton>

          <ListItemButton onClick={()=>navigate("/produtos")}>
            <ListItemIcon sx={{ color:"white" }}>
              <InventoryIcon/>
            </ListItemIcon>
            <ListItemText primary="Produtos"/>
          </ListItemButton>

          <ListItemButton onClick={()=>navigate("/scanner")}>
            <ListItemIcon sx={{ color:"white" }}>
              <QrCodeScannerIcon/>
            </ListItemIcon>
            <ListItemText primary="Scanner"/>
          </ListItemButton>

          <ListItemButton onClick={logout}>
            <ListItemIcon sx={{ color:"white" }}>
              <LogoutIcon/>
            </ListItemIcon>
            <ListItemText primary="Logout"/>
          </ListItemButton>

        </List>

      </Drawer>

      <Box
        sx={{
          flexGrow:1,
          p:4,
          background:"#0f172a",
          minHeight:"100vh"
        }}
      >
        {children}
      </Box>

    </Box>

  )

}

export default Layout
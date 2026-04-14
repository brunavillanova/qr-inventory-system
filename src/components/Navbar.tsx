import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {

  return (
    <AppBar position="static">
      <Toolbar>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          QR Inventory
        </Typography>

        <Box>

          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>

          <Button color="inherit" component={Link} to="/produtos">
            Produtos
          </Button>

          <Button color="inherit" component={Link} to="/scanner">
            Scanner
          </Button>

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
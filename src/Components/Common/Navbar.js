import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            User Management
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Users</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

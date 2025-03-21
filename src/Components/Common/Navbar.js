import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/router"; // Import useRouter for navigation

export default function Navbar() {
  const router = useRouter(); // Initialize router

  const handleNavigation = (path) => {
    router.push(path); // Navigate to the specified path
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#5E9DD7" }}>
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => handleNavigation("/dashboard")}>
            Demo
          </Typography>
          <div>
            <Button color="inherit" onClick={() => handleNavigation("/dashboard")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => handleNavigation("/products")}>
              Products
            </Button>
            <Button color="inherit" onClick={() => handleNavigation("/users")}>
              Users
            </Button>
            <Button color="inherit" onClick={() => handleNavigation("/")}>
              Logout
            </Button>
            {/* Add more buttons as needed */}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

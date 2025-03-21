import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import { loginUser } from "@/Components/Services/authServices";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     setError("Please fill in all fields.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!response.ok) {
  //       const data = await response.json();
  //       throw new Error(data.error || "Login failed");
  //     }

  //     const data = await response.json();
  //     // Redirect to dashboard on successful login
  //     router.push("/dashboard");
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userData"));
    if (savedUser) {
      setEmail(savedUser.email);
      setPassword(savedUser.password);
    }
  }, []);

  const handleLogin = async () => {
    let valid = true;

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Email validation
    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format.");
      valid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    }

    if (!valid) return;

    try {
      const user = await loginUser(email, password);

      // Save user data in local storage
      localStorage.setItem("userData", JSON.stringify({ email, password }));

      router.push("/dashboard");
    } catch (err) {
      setPasswordError(err.message); // Show error below password field
    }
  };
  

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="97vh"
      // sx={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}
      sx={{
        backgroundImage: "url('/Background1.jfif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card sx={{ width: 400, padding: 4, boxShadow: 6, borderRadius: 3, bgcolor: "white" }}>
        <CardHeader
          title={<Typography variant="h5" align="center" fontWeight="bold" color="primary">Login</Typography>}
        />
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              sx={{ padding: 1, fontSize: "1rem", fontWeight: "bold", textTransform: "none" }}
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

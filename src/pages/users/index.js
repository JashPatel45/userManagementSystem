import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  IconButton,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "@/Components/Common/Navbar";
import Sidebar from "@/Components/Common/Sidebar";
import { getUsers, addUser, updateUser, deleteUser } from "../../Components/Services/userServices";
import DeleteModal from "@/Components/Common/Delete";
import BreadcrumbsNav from "@/Components/Common/Breadcrumb";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!validate()) return;
    try {
      const newUser = await addUser({ name, email, mobile, password });
      setUsers([...users, newUser]);
      closeModal();
      toast.success("User added successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdateUser = async () => {
    if (!validate()) return;
    try {
      await updateUser(editingUser._id, { name, email, mobile, password });
      setUsers(users.map(user => user._id === editingUser._id ? { ...user, name, email, mobile, password } : user));
      closeModal();
      toast.success("User updated successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUserId);
      setUsers(users.filter(user => user._id !== selectedUserId));
      toast.success("User deleted successfully!");
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!name.trim()) tempErrors.name = "Name is required.";
    if (!password.trim()) tempErrors.password = "Password is required.";
    if (!email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Invalid email format.";
    }
    if (!mobile.trim()) {
      tempErrors.mobile = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(mobile)) {
      tempErrors.mobile = "Mobile number must be 10 digits.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setMobile(user.mobile);
    setPassword(user.password);
    setOpen(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setOpen(false);
    setErrors({});
  };

  return (
    <>
      {/* <Sidebar /> */}
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <BreadcrumbsNav title="Users Management"/>
        <Toaster />

        {loading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}
        {error && <Alert severity="error">{error}</Alert>}

        <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Add User
          </Button>
        </Grid>

        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell><b>Email</b></TableCell>
                    <TableCell><b>Mobile</b></TableCell>
                    <TableCell><b>Date and Time</b></TableCell>
                    <TableCell><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.mobile}</TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => openEditModal(user)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            setSelectedUserId(user._id);
                            setIsModalOpen(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Dialog open={open} onClose={closeModal} fullWidth maxWidth="sm">
          <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent>
            <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} error={!!errors.name} helperText={errors.name} sx={{ mb: 2 }} />
            <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} error={!!errors.email} helperText={errors.email} sx={{ mb: 2 }} />
            <TextField label="Mobile" fullWidth value={mobile} onChange={(e) => setMobile(e.target.value)} error={!!errors.mobile} helperText={errors.mobile} sx={{ mb: 2 }} />
            <TextField label="Password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} error={!!errors.password} helperText={errors.password} />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="secondary">Cancel</Button>
            <Button onClick={editingUser ? handleUpdateUser : handleAddUser} color="primary" variant="contained">{editingUser ? "Update" : "Add"}</Button>
          </DialogActions>
        </Dialog>

        <DeleteModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteUser}
        />

      </Container>
    </>
  );
}

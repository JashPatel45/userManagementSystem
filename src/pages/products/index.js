import { useEffect, useState } from "react";
import {
  Container,
  Typography,
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
import AddIcon from "@mui/icons-material/Add";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "@/Components/Common/Navbar";
import Sidebar from "@/Components/Common/Sidebar";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../../Components/Services/productServices";
import DeleteModal from "@/Components/Common/Delete";
import BreadcrumbsNav from "@/Components/Common/Breadcrumb";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [baseUom, setBaseUom] = useState("");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!validate()) return;
    try {
      const newProduct = await addProduct({ productCode, productName, baseUom });
      setProducts([...products, newProduct]);
      closeModal();
      toast.success("Product added successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdateProduct = async () => {
    if (!validate()) return;
    try {
      await updateProduct(editingProduct._id, { productCode, productName, baseUom });
      setProducts(products.map(product => product._id === editingProduct._id ? { ...product, productCode, productName, baseUom } : product));
      closeModal();
      toast.success("Product updated successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product._id !== id));
      toast.success("Product deleted successfully!");
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!productCode.trim()) tempErrors.productCode = "Product Code is required.";
    if (!productName.trim()) tempErrors.productName = "Product Name is required.";
    if (!baseUom.trim()) tempErrors.baseUom = "Base UOM is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductCode(product.productCode);
    setProductName(product.productName);
    setBaseUom(product.baseUom);
    setOpen(true);
  };

  const closeModal = () => {
    setEditingProduct(null);
    setProductCode("");
    setProductName("");
    setBaseUom("");
    setOpen(false);
    setErrors({});
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
      <BreadcrumbsNav title="Products Management"/>
        <Toaster />

        {loading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}
        {error && <Alert severity="error">{error}</Alert>}

        <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Add Product
          </Button>
        </Grid>

        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Product Code</b></TableCell>
                    <TableCell><b>Product Name</b></TableCell>
                    <TableCell><b>Base UOM</b></TableCell>
                    <TableCell><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>{product.productCode}</TableCell>
                      <TableCell>{product.productName}</TableCell>
                      <TableCell>{product.baseUom}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => openEditModal(product)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            setSelectedProductId(product._id);
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
          <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogContent>
            <TextField label="Product Code" fullWidth value={productCode} onChange={(e) => setProductCode(e.target.value)} error={!!errors.productCode} helperText={errors.productCode} sx={{ mb: 2 }} />
            <TextField label="Product Name" fullWidth value={productName} onChange={(e) => setProductName(e.target.value)} error={!!errors.productName} helperText={errors.productName} sx={{ mb: 2 }} />
            <TextField label="Base UOM" fullWidth value={baseUom} onChange={(e) => setBaseUom(e.target.value)} error={!!errors.baseUom} helperText={errors.baseUom} />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="secondary">Cancel</Button>
            <Button onClick={editingProduct ? handleUpdateProduct : handleAddProduct} color="primary" variant="contained">{editingProduct ? "Update" : "Add"}</Button>
          </DialogActions>
        </Dialog>

        <DeleteModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleDeleteProduct(selectedProductId)} // Ensure id is passed
        />

      </Container>
    </>
  );
}

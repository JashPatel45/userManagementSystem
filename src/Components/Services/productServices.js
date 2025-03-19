const API_URL = "/api/products";

export const getProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const addProduct = async (productData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!response.ok) throw new Error("Failed to add product");
  return response.json();
};

export const updateProduct = async (productId, productData) => {
  const response = await fetch(`${API_URL}/${productId}`, { // Use dynamic URL
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({...productData}),
  });

  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

export const deleteProduct = async (productId) => {  
  const response = await fetch(`${API_URL}/${productId}`, { // Use dynamic URL
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) throw new Error("Failed to delete product");
  return response.json();
};

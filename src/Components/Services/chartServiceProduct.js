export const fetchProductActivityData = async () => {
  try {
    const response = await fetch("/api/productChart");
    if (!response.ok) {
      throw new Error("Failed to fetch product activity data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product activity data:", error);
    throw error;
  }
}; 
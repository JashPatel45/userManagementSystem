export const fetchDashboardCounts = async () => {
  try {
    const response = await fetch("/api/dashboard");
    if (!response.ok) {
      throw new Error("Failed to fetch dashboard counts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching dashboard counts:", error);
    throw error;
  }
}; 
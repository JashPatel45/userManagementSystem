export const fetchChartData = async () => {
  try {
    const response = await fetch("/api/chart");
    if (!response.ok) {
      throw new Error("Failed to fetch chart data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw error;
  }
}; 
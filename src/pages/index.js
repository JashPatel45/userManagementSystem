import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import Sidebar from "@/Components/Common/Sidebar";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { fetchDashboardCounts } from "@/Components/Services/dashboardService";
import { fetchProductActivityData } from "@/Components/Services/chartServiceProduct";
import { fetchChartData } from "@/Components/Services/chartService";

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [userChartData, setUserChartData] = useState([]);
  const [productChartData, setProductChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardCounts = async () => {
      try {
        const data = await fetchDashboardCounts();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    const getUserChartData = async () => {
      try {
        const data = await fetchChartData();
        setUserChartData(data);
      } catch (error) {
        console.error("Error fetching user chart data:", error);
      }
    };

    const getProductChartData = async () => {
      try {
        const data = await fetchProductActivityData();
        setProductChartData(data);
      } catch (error) {
        console.error("Error fetching product chart data:", error);
      }
    };

    getDashboardCounts();
    getUserChartData();
    getProductChartData();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        {/* Loading State */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Stats Cards */}
            <Grid container spacing={3}>
              {analytics &&
                Object.entries(analytics).map(([key, value]) => (
                  <Grid item xs={12} sm={6} md={6} key={key}>
                    <Card sx={{ backgroundColor: "#f5f5f5", boxShadow: 3 }}>
                      <CardContent>
                        <Typography variant="h6" color="textSecondary">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </Typography>
                        <Typography variant="h4">{value}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>

            {/* User Activity Chart */}
            <Card sx={{ marginTop: "20px", padding: "20px", boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>
                User Activity
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userChartData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="count" stroke="#3f51b5" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Product Activity Chart */}
            <Card sx={{ marginTop: "20px", padding: "20px", boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>
                Product Activity
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={productChartData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="count" stroke="#ff5722" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </>
        )}
      </Box>
    </Box>
  );
}

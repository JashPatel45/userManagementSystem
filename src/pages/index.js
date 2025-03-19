import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import Sidebar from "@/Components/Common/Sidebar";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { fetchDashboardCounts } from "@/Components/Services/dashboardService";
import BreadcrumbsNav from "@/Components/Common/Breadcrumb";
import Navbar from "@/Components/Common/Navbar";

export default function Dashboard() {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalProducts: 0,
    userActivity: [],
    productActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardCounts = async () => {
      try {
        const data = await fetchDashboardCounts();
        setAnalytics({
          totalUsers: data.totalUsers,
          totalProducts: data.totalProducts,
          userActivity: data.userActivity,
          productActivity: data.productActivity,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    getDashboardCounts();
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, padding: "20px" }}>
          <BreadcrumbsNav title="Dashboard" />

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Stats Cards */}
              <Grid container spacing={3}>
                {[
                  { label: "Total Users", value: analytics.totalUsers },
                  { label: "Total Products", value: analytics.totalProducts },
                ].map((stat, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card sx={{ backgroundColor: "#f5f5f5", boxShadow: 3 }}>
                      <CardContent>
                        <Typography variant="h6" color="textSecondary">
                          {stat.label}
                        </Typography>
                        <Typography variant="h4">{stat.value}</Typography>
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
                  <LineChart data={analytics.userActivity}>
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
                  <LineChart data={analytics.productActivity}>
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
    </>
  );
}

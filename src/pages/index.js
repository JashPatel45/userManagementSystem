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
      <Box sx={{ display: "flex", bgcolor: "#f4f6f8", minHeight: "100vh" }}>
        {/* <Sidebar /> */}
        <Box component="main" sx={{ flexGrow: 1, padding: "24px" }}>
          <BreadcrumbsNav title="Dashboard" />

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Stats Cards */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                {[
                  { label: "Total Users", value: analytics.totalUsers, color: "#3f51b5" },
                  { label: "Total Products", value: analytics.totalProducts, color: "#ff5722" },
                ].map((stat, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      sx={{
                        backgroundColor: "#fff",
                        boxShadow: 4,
                        borderLeft: `6px solid ${stat.color}`,
                        transition: "0.3s",
                        "&:hover": { transform: "scale(1.03)" },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" color="textSecondary">
                          {stat.label}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: "bold", color: stat.color }}>
                          {stat.value}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Charts Grid */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ boxShadow: 4, borderRadius: "12px" }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        User Activity
                      </Typography>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={analytics.userActivity}>
                          <XAxis dataKey="day" stroke="#8884d8" />
                          <YAxis stroke="#8884d8" />
                          <Tooltip />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Line type="monotone" dataKey="count" stroke="#3f51b5" strokeWidth={3} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ boxShadow: 4, borderRadius: "12px" }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Product Activity
                      </Typography>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={analytics.productActivity}>
                          <XAxis dataKey="day" stroke="#ff5722" />
                          <YAxis stroke="#ff5722" />
                          <Tooltip />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Line type="monotone" dataKey="count" stroke="#ff5722" strokeWidth={3} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

import Link from "next/link";
import { useRouter } from "next/router";
import { Breadcrumbs, Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function BreadcrumbsNav({ title }) {
  const router = useRouter();
  const pathnames = router.asPath.split("/").filter((x) => x);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
      {/* Title on the left */}
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>

      {/* Breadcrumbs on the right */}
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link href="/" passHref>
          <Typography
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              color: "inherit",
            }}
          >
            {/* <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> */}
            Dashboard
          </Typography>
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return index === pathnames.length - 1 ? (
            <Typography key={to} color="text.primary">
              {decodeURIComponent(value)}
            </Typography>
          ) : (
            <Link key={to} href={to} passHref>
              <Typography style={{ textDecoration: "none", color: "inherit" }}>
                {decodeURIComponent(value)}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}

import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        sx={{ position: "absolute", top: 10, left: 10 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="permanent" // Use permanent variant for a fixed drawer
        open={open}
        sx={{
          width: open ? 240 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 240 : 60,
            transition: "width 0.3s",
            boxSizing: "border-box",
            overflowX: "hidden",
          },
        }}
      >
        <List sx={{ width: '100%' }}>
          <ListItem button onClick={() => { router.push('/'); setOpen(false); }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => { router.push('/users'); setOpen(false); }}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button onClick={() => { router.push('/products'); setOpen(false); }}>
            <ListItemIcon>
              <ProductionQuantityLimitsIcon />
            </ListItemIcon>
            <ListItemText primary="Product" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

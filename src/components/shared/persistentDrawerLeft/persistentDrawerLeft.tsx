import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Image from "next/image";
import profileName from "/public/idonamir.png";
import Labels from "@/utils/labels";
import Link from "next/link";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import style from "./persistentDrawerLeft.module.css"
const drawerWidth = 240;

interface IPersistentDrawerLeftProps {
  items: string[];
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft(
  props: IPersistentDrawerLeftProps
) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const BlackToolbar = styled(Toolbar)`
    background-color: black;
  `;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <BlackToolbar>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ marginRight: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" style={{marginTop:'0.2rem'}}>
                {Labels.DeloitteNavbarTitle}
              </Typography>
              <Typography variant="h6" noWrap component="div" style={{marginTop:'0.2rem'}}>
                {Labels.DataInsightNavbarTitle}
              </Typography>
              <Typography variant="h6" noWrap component="div" style={{marginTop:'0.2rem'}}>
                {Labels.DataAINavbarTitle}
              </Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {" "}
              {/* Right side content */}
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ marginRight: 1 }}
              >
                {Labels.UsernameNavbarTitle}
              </Typography>
              <Image
                src={profileName}
                alt="profile image"
                width={30} 
                height={30} 
                style={{ borderRadius: '50%' }} 
              />
            </div>
          </Toolbar>
        </BlackToolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background:'black'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{background:'black'}}>
          <IconButton onClick={handleDrawerClose} style={{background:'white'}}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {props.items && props.items.map((text, index) => (
            <ListItem key={text} disablePadding onClick={handleDrawerClose}>
              <Link href={`/survey/${text}`} className={style.linkItemWrapper}>
                <ListItemButton style={{ textDecoration: 'none' }}>
                  <ListItemIcon style={{ color: 'white' }}>
                    {index % 2 === 0 ? <FilePresentIcon /> : <FilePresentIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} style={{ color: 'white', textDecoration: 'none' }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider style={{background:'white'}}/>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}

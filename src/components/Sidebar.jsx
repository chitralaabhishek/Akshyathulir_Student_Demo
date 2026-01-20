import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import TimelineIcon from "@mui/icons-material/Timeline";
import BusinessIcon from "@mui/icons-material/Business";
import GavelIcon from "@mui/icons-material/Gavel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "#1f4d3a",
        color: "white",
        position: "fixed",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Startup Hub
        </Typography>
      </Box>

      <List>
        <MenuItem
          icon={<DashboardIcon />}
          text="Dashboard"
          onClick={() => navigate("/")}
        />
        <MenuItem
          icon={<AccountCircleIcon />}
          text="Profile"
          onClick={() => navigate("/profile")}
        />
        <MenuItem
          icon={<TrendingUpIcon />}
          text="Fundraising Tracker"
          onClick={() => navigate("/fundraising")}
        />
        <MenuItem
          icon={<GroupIcon />}
          text="Team Management"
          onClick={() => navigate("/team")}
        />
        <MenuItem
          icon={<PeopleAltIcon />}
          text="My Clients"
          onClick={() => navigate("/clients")}
        />
        <MenuItem
          icon={<TimelineIcon />}
          text="Milestone Tracking"
          onClick={() => navigate("/milestones")}
        />
        <MenuItem
          icon={<BusinessIcon />}
          text="Investor Relations"
          onClick={() => navigate("/investors")}
        />
        <MenuItem
          icon={<HelpOutlineIcon />}
          text="Product Roadmap"
          onClick={() => navigate("/roadmap")}
        />
        <MenuItem
          icon={<GavelIcon />}
          text="Legal Compliance"
          onClick={() => navigate("/legal")}
        />
      </List>

      <Box sx={{ position: "absolute", bottom: 20, width: "100%" }}>
        <MenuItem icon={<LogoutIcon />} text="Logout" />
      </Box>
    </Box>
  );
}

function MenuItem({ icon, text, onClick }) {
  return (
    <ListItemButton onClick={onClick}>
      <ListItemIcon sx={{ color: "white" }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
}

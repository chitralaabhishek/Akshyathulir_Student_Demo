import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ ml: "250px", p: 3, width: "100%" }}>
        <Header />
            <Box mt={2}>
            {children}
            </Box>
      </Box>
    </Box>
  );
}

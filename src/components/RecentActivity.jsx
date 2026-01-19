import { Card, CardContent, Typography, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function RecentActivity() {
  return (
    <Card sx={{ borderRadius: 3, height: 400 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Recent Activity
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <TrendingUpIcon color="success" />
          <Box>
            <Typography fontWeight="500">New investor meeting</Typography>
            <Typography variant="body2" color="text.secondary">
              2 hours ago
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <GroupIcon color="success" />
          <Box>
            <Typography fontWeight="500">New team member added</Typography>
            <Typography variant="body2" color="text.secondary">
              1 day ago
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <CheckCircleOutlineIcon color="success" />
          <Box>
            <Typography fontWeight="500">Milestone completed</Typography>
            <Typography variant="body2" color="text.secondary">
              3 days ago
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

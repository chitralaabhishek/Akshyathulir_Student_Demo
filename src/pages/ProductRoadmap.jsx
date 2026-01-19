import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
  IconButton,
} from "@mui/material";

import MapIcon from "@mui/icons-material/Map";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductRoadmap() {
  return (
    <Box>
      {/* PAGE HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <MapIcon color="success" />
          Product Roadmap
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#1f4d3a" }}
        >
          Add Feature
        </Button>
      </Box>

      {/* METRIC CARDS */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="body2">Total Features</Typography>
              <Typography variant="h4" fontWeight="bold">
                32
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In roadmap
              </Typography>
              <Chip label="+0 today" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="body2">In Development</Typography>
              <Typography variant="h4" fontWeight="bold">
                8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active features
              </Typography>
              <Chip label="+0 today" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="body2">Released</Typography>
              <Typography variant="h4" fontWeight="bold">
                12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This quarter
              </Typography>
              <Chip label="+0 today" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="body2">Planned</Typography>
              <Typography variant="h4" fontWeight="bold">
                12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Next quarter
              </Typography>
              <Chip label="+0 today" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* FEATURE TIMELINE TABLE */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Feature Development Timeline
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Feature</b></TableCell>
                <TableCell><b>Priority</b></TableCell>
                <TableCell><b>Start Date</b></TableCell>
                <TableCell><b>Target Date</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Progress</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {[
                {
                  feature: "User Authentication",
                  priority: "High",
                  start: "Jan 15, 2026",
                  target: "Feb 15, 2026",
                  status: "In Development",
                  progress: 90,
                },
                {
                  feature: "Payment Integration",
                  priority: "High",
                  start: "Jan 1, 2026",
                  target: "Jan 31, 2026",
                  status: "Planned",
                  progress: 10,
                },
                {
                  feature: "Mobile App",
                  priority: "Medium",
                  start: "Feb 1, 2026",
                  target: "Apr 30, 2026",
                  status: "Planned",
                  progress: 0,
                },
              ].map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.feature}</TableCell>
                  <TableCell>{item.priority}</TableCell>
                  <TableCell>{item.start}</TableCell>
                  <TableCell>{item.target}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={
                        item.status === "In Development"
                          ? "success"
                          : "default"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    <LinearProgress
                      variant="determinate"
                      value={item.progress}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        mb: 0.5,
                      }}
                    />
                    <Typography variant="caption">
                      {item.progress}%
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton color="success">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
} 

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TimelineIcon from "@mui/icons-material/Timeline";

export default function MilestoneTracking() {
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
          <TimelineIcon color="success" />
          Milestone Tracking
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#1f4d3a" }}
        >
          Add Milestone
        </Button>
      </Box>

      {/* METRIC CARDS */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography>Total Milestones</Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ color: "#1f4d3a", my: 1 }}
              >
                15
              </Typography>
              <Typography color="text.secondary">This quarter</Typography>

              <Box display="flex" gap={1} mt={2}>
                <Chip label="+0 today" color="success" size="small" />
                <Chip label="↑ 0%" color="success" size="small" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography>Completed</Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ color: "#1f4d3a", my: 1 }}
              >
                8
              </Typography>
              <Typography color="text.secondary">On schedule</Typography>

              <Box display="flex" gap={1} mt={2}>
                <Chip label="+0 today" color="success" size="small" />
                <Chip label="↑ 53.3%" color="success" size="small" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography>Upcoming</Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ color: "#1f4d3a", my: 1 }}
              >
                4
              </Typography>
              <Typography color="text.secondary">Next 30 days</Typography>

              <Box display="flex" gap={1} mt={2}>
                <Chip label="+0 today" color="success" size="small" />
                <Chip label="↑ 0%" color="success" size="small" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography>Overdue</Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ color: "#1f4d3a", my: 1 }}
              >
                1
              </Typography>
              <Typography color="text.secondary">Needs attention</Typography>

              <Box display="flex" gap={1} mt={2}>
                <Chip label="+0 today" color="success" size="small" />
                <Chip label="↑ 0%" color="success" size="small" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* TABLE */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Current Milestones
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Milestone</b></TableCell>
                <TableCell><b>Category</b></TableCell>
                <TableCell><b>Due Date</b></TableCell>
                <TableCell><b>Priority</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Progress</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* ROW 1 */}
              <TableRow>
                <TableCell>MVP Launch</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Dec 31, 2026</TableCell>
                <TableCell>High</TableCell>
                <TableCell>
                  <Chip label="In Progress" color="success" size="small" />
                </TableCell>
                <TableCell sx={{ width: 160 }}>
                  <LinearProgress
                    variant="determinate"
                    value={75}
                    sx={{ height: 8, borderRadius: 5 }}
                  />
                  <Typography variant="body2" mt={0.5}>
                    75.0%
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

              {/* ROW 2 */}
              <TableRow>
                <TableCell>Seed Funding Close</TableCell>
                <TableCell>Fundraising</TableCell>
                <TableCell>Jan 15, 2026</TableCell>
                <TableCell>Critical</TableCell>
                <TableCell>
                  <Chip label="In Progress" color="success" size="small" />
                </TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={40}
                    sx={{ height: 8, borderRadius: 5 }}
                  />
                  <Typography variant="body2" mt={0.5}>
                    40.0%
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

              {/* ROW 3 */}
              <TableRow>
                <TableCell>Team Expansion</TableCell>
                <TableCell>Business</TableCell>
                <TableCell>Feb 1, 2026</TableCell>
                <TableCell>Medium</TableCell>
                <TableCell>
                  <Chip label="Planning" color="default" size="small" />
                </TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={20}
                    sx={{ height: 8, borderRadius: 5 }}
                  />
                  <Typography variant="body2" mt={0.5}>
                    20.0%
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
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}

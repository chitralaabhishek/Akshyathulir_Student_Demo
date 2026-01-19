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
  IconButton,
} from "@mui/material";

import GavelIcon from "@mui/icons-material/Gavel";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function LegalCompliance() {
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
          <GavelIcon color="success" />
          Legal Compliance
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#1f4d3a" }}
        >
          Add Item
        </Button>
      </Box>

      {/* METRIC CARDS */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="body2">Total Items</Typography>
              <Typography variant="h4" fontWeight="bold">
                12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Compliance requirements
              </Typography>
              <Chip label="+0 today" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="body2">Completed</Typography>
              <Typography variant="h4" fontWeight="bold">
                9
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Up to date
              </Typography>
              <Chip label="+75%" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="body2">Pending</Typography>
              <Typography variant="h4" fontWeight="bold">
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Needs attention
              </Typography>
              <Chip label="+0 today" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="body2">Compliance Score</Typography>
              <Typography variant="h4" fontWeight="bold">
                75%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overall health
              </Typography>
              <Chip label="+0 today" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* COMPLIANCE TABLE */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Compliance Checklist
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Requirement</b></TableCell>
                <TableCell><b>Category</b></TableCell>
                <TableCell><b>Due Date</b></TableCell>
                <TableCell><b>Priority</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Action</b></TableCell>
                <TableCell><b>Manage</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {[
                {
                  req: "Privacy Policy Update",
                  cat: "Regulatory",
                  due: "Jan 15, 2026",
                  priority: "High",
                  status: "Pending",
                },
                {
                  req: "Employment Contracts",
                  cat: "Employment",
                  due: "Jan 31, 2027",
                  priority: "Medium",
                  status: "Completed",
                },
                {
                  req: "Trademark Filing",
                  cat: "IP",
                  due: "Feb 28, 2026",
                  priority: "High",
                  status: "In Progress",
                },
                {
                  req: "Tax Registration",
                  cat: "Corporate",
                  due: "Jan 31, 2026",
                  priority: "Critical",
                  status: "Pending",
                },
              ].map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.req}</TableCell>
                  <TableCell>{item.cat}</TableCell>
                  <TableCell>{item.due}</TableCell>
                  <TableCell>{item.priority}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      size="small"
                      color={
                        item.status === "Completed"
                          ? "success"
                          : item.status === "In Progress"
                          ? "warning"
                          : "default"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      color={
                        item.status === "Completed"
                          ? "success"
                          : item.status === "In Progress"
                          ? "warning"
                          : "primary"
                      }
                    >
                      {item.status === "Completed"
                        ? "View"
                        : item.status === "In Progress"
                        ? "Update"
                        : "Review"}
                    </Button>
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

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

import BusinessIcon from "@mui/icons-material/Business";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function InvestorRelations() {
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
          <BusinessIcon color="success" />
          Investor Relations
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#1f4d3a" }}
        >
          Add Investor
        </Button>
      </Box>

      {/* METRIC CARDS */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="body2">Total Investors</Typography>
              <Typography variant="h4" fontWeight="bold">
                24
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active relationships
              </Typography>
              <Chip label="+0 today" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="body2">Recent Updates</Typography>
              <Typography variant="h4" fontWeight="bold">
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sent this month
              </Typography>
              <Chip label="+0 today" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="body2">Meetings Scheduled</Typography>
              <Typography variant="h4" fontWeight="bold">
                5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Next 2 weeks
              </Typography>
              <Chip label="+0 today" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="body2">Response Rate</Typography>
              <Typography variant="h4" fontWeight="bold">
                85%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email engagement
              </Typography>
              <Chip label="+0 today" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* INVESTOR COMMUNICATIONS TABLE */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Investor Communications
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Investor</b></TableCell>
                <TableCell><b>Last Contact</b></TableCell>
                <TableCell><b>Type</b></TableCell>
                <TableCell><b>Next Follow-up</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {[
                { 
                  name: "Acme Ventures",
                  last: "Dec 20, 2026",
                  type: "Monthly Update",
                  next: "Jan 20, 2027",
                  status: "Engaged",
                  color: "success",
                },
                {
                  name: "Tech Capital",
                  last: "Dec 18, 2026",
                  type: "Due Diligence",
                  next: "Jan 2, 2027",
                  status: "Pending",
                  color: "default",
                },
                {
                  name: "Angel Group",
                  last: "Dec 15, 2026",
                  type: "Pitch Meeting",
                  next: "Jan 5, 2027",
                  status: "Interested",
                  color: "success",
                },
              ].map((inv, index) => (
                <TableRow key={index}>
                  <TableCell>{inv.name}</TableCell>
                  <TableCell>{inv.last}</TableCell>
                  <TableCell>{inv.type}</TableCell>
                  <TableCell>{inv.next}</TableCell>
                  <TableCell>
                    <Chip label={inv.status} color={inv.color} size="small" />
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

import { useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

export default function InvestorRelations() {
  /* ================= STATE ================= */
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [investors, setInvestors] = useState([
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
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    lastContact: "",
    contactType: "Monthly Update",
    nextFollowUp: "",
    status: "Pending",
  });

  /* ================= ADD ================= */
  const openAdd = () => {
    setEditIndex(null);
    setForm({
      name: "",
      email: "",
      lastContact: "",
      contactType: "Monthly Update",
      nextFollowUp: "",
      status: "Pending",
    });
    setOpen(true);
  };

  /* ================= EDIT ================= */
  const openEdit = (index) => {
    const inv = investors[index];
    setEditIndex(index);
    setForm({
      name: inv.name,
      email: "",
      lastContact: "",
      contactType: inv.type,
      nextFollowUp: "",
      status: inv.status,
    });
    setOpen(true);
  };

  /* ================= SAVE ================= */
  const handleSave = () => {
    const updatedInvestor = {
      name: form.name,
      last: form.lastContact || investors[editIndex]?.last,
      type: form.contactType,
      next: form.nextFollowUp || investors[editIndex]?.next,
      status: form.status,
      color: form.status === "Pending" ? "default" : "success",
    };

    if (editIndex === null) {
      setInvestors([...investors, updatedInvestor]);
    } else {
      const updated = [...investors];
      updated[editIndex] = updatedInvestor;
      setInvestors(updated);
    }

    setOpen(false);
  };

  /* ================= DELETE ================= */
  const openDelete = (index) => {
    setDeleteIndex(index);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    setInvestors(investors.filter((_, i) => i !== deleteIndex));
    setDeleteOpen(false);
  };

  return (
    <Box>
      {/* PAGE HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <BusinessIcon color="success" />
          Investor Relations
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#1f4d3a" }}
          onClick={openAdd}
        >
          Add Investor
        </Button>
      </Box>

      {/* METRIC CARDS — UNCHANGED */}
      <Grid container spacing={2} mb={3}>
        {[
          { title: "Total Investors", value: "24", sub: "Active relationships" },
          { title: "Recent Updates", value: "3", sub: "Sent this month" },
          { title: "Meetings Scheduled", value: "5", sub: "Next 2 weeks" },
          { title: "Response Rate", value: "85%", sub: "Email engagement" },
        ].map((m, i) => (
          <Grid key={i} size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="body2">{m.title}</Typography>
                <Typography variant="h4" fontWeight="bold">{m.value}</Typography>
                <Typography variant="body2" color="text.secondary">{m.sub}</Typography>
                <Chip label="+0 today" color="success" size="small" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* TABLE */}
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
              {investors.map((inv, index) => (
                <TableRow key={index}>
                  <TableCell>{inv.name}</TableCell>
                  <TableCell>{inv.last}</TableCell>
                  <TableCell>{inv.type}</TableCell>
                  <TableCell>{inv.next}</TableCell>
                  <TableCell>
                    <Chip label={inv.status} color={inv.color} size="small" />
                  </TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={() => openEdit(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => openDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ADD / EDIT DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          {editIndex === null ? "Add Investor" : "Edit Investor"}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Name / Company"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                type="date"
                fullWidth
                label="Last Contact"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setForm({ ...form, lastContact: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Contact Type"
                value={form.contactType}
                onChange={(e) => setForm({ ...form, contactType: e.target.value })}
              >
                <MenuItem value="Monthly Update">Monthly Update</MenuItem>
                <MenuItem value="Pitch Meeting">Pitch Meeting</MenuItem>
                <MenuItem value="Due Diligence">Due Diligence</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                type="date"
                fullWidth
                label="Next Follow-up"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setForm({ ...form, nextFollowUp: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Engaged">Engaged</MenuItem>
                <MenuItem value="Interested">Interested</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "#1f4d3a" }} onClick={handleSave}>
            {editIndex === null ? "Add Investor" : "Update Investor"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRMATION */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          Confirm Delete
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Typography>Are you sure you want to delete this investor?</Typography>
          <Typography fontWeight="bold" mt={2}>
            {investors[deleteIndex]?.name}
          </Typography>
          <Typography color="text.secondary" mt={1}>
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

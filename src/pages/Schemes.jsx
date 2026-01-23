import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  TextField,
  IconButton,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BusinessIcon from "@mui/icons-material/Business";
import ScienceIcon from "@mui/icons-material/Science";
import WomanIcon from "@mui/icons-material/Woman";
import PublicIcon from "@mui/icons-material/Public";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { SCHEMES_DATA } from "../data/schemesData";

/* ================= CATEGORIES ================= */
const CATEGORIES = [
  { name: "Tech & Innovation", icon: <BusinessIcon sx={{ fontSize: 38 }} /> },
  { name: "Research & Science", icon: <ScienceIcon sx={{ fontSize: 38 }} /> },
  { name: "Women Empowerment", icon: <WomanIcon sx={{ fontSize: 38 }} /> },
  { name: "Govt. Schemes", icon: <PublicIcon sx={{ fontSize: 38 }} /> },
];

export default function Schemes() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");

  const filteredSchemes = SCHEMES_DATA.filter(
    (s) =>
      s.category === selectedCategory &&
      (s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        ))
  );

  /* ================= CATEGORY VIEW ================= */
  if (!selectedCategory) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Startup Schemes
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",                 // ✅ tighter spacing
            gridAutoRows: "1fr",         // ✅ equal height rows
          }}
        >
          {CATEGORIES.map((cat) => (
            <Card
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              sx={{
                height: "100%",
                bgcolor: "#1f4d3a",
                color: "white",
                borderRadius: 3,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "0.2s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                {cat.icon}
                <Typography fontWeight="bold" mt={1}>
                  {cat.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    );
  }

  /* ================= SCHEMES VIEW ================= */
  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER */}
      <Box display="flex" alignItems="center" gap={1.5} mb={1}>
        <IconButton onClick={() => setSelectedCategory(null)} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography fontWeight="bold">
            {selectedCategory}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filteredSchemes.length} schemes available
          </Typography>
        </Box>
      </Box>

      {/* SEARCH */}
      <TextField
        fullWidth
        size="small"
        placeholder={`Search in ${selectedCategory}`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* SCHEMES GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",                 // ✅ fixed gap
          gridAutoRows: "1fr",         // ✅ equal height
        }}
      >
        {filteredSchemes.map((scheme) => (
          <Card
            key={scheme.id}
            sx={{
              height: "100%",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography fontWeight="bold" gutterBottom>
                {scheme.title}
              </Typography>

              <Box display="flex" alignItems="center" gap={0.5} mb={1}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">
                  {scheme.location}
                </Typography>
              </Box>

              <Typography variant="h6" color="primary">
                {scheme.amount}
              </Typography>

              <Typography variant="body2" color="text.secondary" mb={1.5}>
                Deadline: {scheme.deadline}
              </Typography>

              <Box>
                {scheme.tags.map((tag, i) => (
                  <Chip
                    key={i}
                    label={tag}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </Box>
            </CardContent>

            {/* BUTTON */}
            <Box p={1.5}>
              <Button
                fullWidth
                size="small"
                variant="contained"
                sx={{
                  bgcolor: "#1f4d3a",
                  "&:hover": { bgcolor: "#163d2e" },
                }}
              >
                APPLY
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

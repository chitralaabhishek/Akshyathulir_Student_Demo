import { Card, CardContent, Typography, Chip, Box } from "@mui/material";

export default function MetricCard({ title, value, subtitle, percent }) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography color="text.secondary">{title}</Typography>

        <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
          {value}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>

        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Chip label="+0 today" size="small" color="success" />
          <Chip label={percent} size="small" color="success" />
        </Box>
      </CardContent>
    </Card>
  );
}

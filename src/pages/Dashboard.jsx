import { Grid, Box } from "@mui/material";
import MetricCard from "../components/MetricCard";
import DashboardOverview from "../components/DashboardOverview";
import RecentActivity from "../components/RecentActivity";

export default function Dashboard() {
  return (
    <Box>
      {/* ===== METRIC CARDS ===== */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Current Funding Round"
            value="Seed"
            subtitle="0.8M raised"
            percent="37.5%"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Team Size"
            value="8"
            subtitle="+3 this month"
            percent="0%"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Milestones"
            value="8/15"
            subtitle="Completed this quarter"
            percent="53.3%"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Legal Compliance"
            value="9/12"
            subtitle="Items completed"
            percent="75.0%"
          />
        </Grid>
      </Grid>

      {/* ===== CHART + RECENT ACTIVITY ===== */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <DashboardOverview />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <RecentActivity />
        </Grid>
      </Grid>
    </Box>
  );
}


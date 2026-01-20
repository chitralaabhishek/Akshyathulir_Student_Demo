import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import FundraisingTracker from "./pages/FundraisingTracker";
import Profile from "./pages/Profile";
import TeamManagement from "./pages/TeamManagement";
import MilestoneTracking from "./pages/MilestoneTracking";
import InvestorRelations from "./pages/InvestorRelations";
import ProductRoadmap from "./pages/ProductRoadmap";
import LegalCompliance from "./pages/LegalCompliance";
import MyClients from "./pages/MyClients";

import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Dashboard */}
          <Route
            path="/"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />

          <Route
            path="/milestones"
            element={
              <DashboardLayout>
                <MilestoneTracking />
              </DashboardLayout>
            }
          />

          <Route
            path="/fundraising"
            element={
              <DashboardLayout>
                <FundraisingTracker />
              </DashboardLayout>
            }
          />

          <Route
            path="/profile"
            element={
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            }
          />

          <Route
            path="/team"
            element={
              <DashboardLayout>
                <TeamManagement />
              </DashboardLayout>
            }
          />

          {/* ✅ MY CLIENTS ROUTE */}
          <Route
            path="/clients"
            element={
              <DashboardLayout>
                <MyClients />
              </DashboardLayout>
            }
          />

          <Route
            path="/investors"
            element={
              <DashboardLayout>
                <InvestorRelations />
              </DashboardLayout>
            }
          />

          <Route
            path="/roadmap"
            element={
              <DashboardLayout>
                <ProductRoadmap />
              </DashboardLayout>
            }
          />

          <Route
            path="/legal"
            element={
              <DashboardLayout>
                <LegalCompliance />
              </DashboardLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;

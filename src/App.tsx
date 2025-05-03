import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoutes from "./pages/publicRoutes";
import ProtectedRoutes from "./pages/protextedRoutes";
import Layout from "./pages/layout";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/auth/signUp";
import EventsPage from "./pages/events";
import SettingsPage from "./pages/settings";
import ActivitiesPage from "./pages/activities";
import VenuesPage from "./pages/venues";
import VenueDetailPage from "./pages/venues/detail";
import Media from "./components/media/media";
import BannerPage from "./pages/Banner";
import ReviewsPage from "./pages/reviews";
import PerformerPage from "./pages/performers";
import Privacy from "./components/privacy";
import Terms from "./components/terms";
import PerformerDetailPage from './pages/performers/detail';
import PerformerEventDetail from "./components/events/details/PerformerEventDetail";
import VenuesDetailPage from "./components/events/details/venuesDetailPage";
import ForgotPassword from "./pages/auth/forgot-password";
import PasswordResetEmailSent from "./pages/auth/PasswordResetEmailSent";
import ResetPassword from "./pages/auth/reset-password";
import PasswordChangedSuccess from "./pages/auth/PasswordChangedSuccess";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/email-sent" element={<PasswordResetEmailSent />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password-changed" element={<PasswordChangedSuccess />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route path="performers" element={<PerformerPage />} /> 
            <Route path="events" element={<EventsPage />} />
            <Route path="events/:id" element={<PerformerEventDetail />} />
            <Route path="events/admin/:id" element={<VenuesDetailPage />} />
            <Route path="venues" element={<VenuesPage />} />  
            <Route path="venues/:id" element={<VenueDetailPage />} />
            <Route path="settings" element={<SettingsPage />} />  
            <Route path="activities" element={<ActivitiesPage />} /> 
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="media" element={<Media />} />
            <Route path="banner" element={<BannerPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/performers/:id" element={<PerformerDetailPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { StrictMode } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Header, Footer } from './components';
import { ScrollToTop } from './components/common/ScrollToTop';
import * as Pages from './pages';


// Import dashboard pages
import {
  DashboardOverview,
  DashboardTenders,
  DashboardAuctions,
  DashboardJobs,
  DashboardNotifications,
  DashboardSettings,
  DashboardPayments
} from './pages/dashboard';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <Router>
            <AuthProvider>
              <NotificationProvider>
                <ScrollToTop />
                <div className="flex flex-col min-h-screen">
                  <Toaster position="top-center" />
                  <Routes>
                    {/* Public Routes */}
                    <Route
                      path="/*"
                      element={
                        <>
                          <Header />
                          <main className="flex-1">
                            <Routes>
                              <Route path="/" element={<Pages.HomePage />} />
                              <Route path="/about" element={<Pages.AboutPage />} />
                              <Route path="/contact" element={<Pages.ContactPage />} />
                              <Route path="/login" element={<Pages.LoginPage />} />
                              <Route path="/signup" element={<Pages.SignupPage />} />
                              <Route path="/support" element={<Pages.SupportPage />} />
                              <Route path="/map" element={<Pages.MapPage />} />
                              <Route path="/news" element={<Pages.NewsPage />} />
                              <Route path="/news/:id" element={<Pages.NewsDetailsPage />} />
                              <Route path="/jobs" element={<Pages.JobsPage />} />
                              <Route path="/jobs/:id" element={<Pages.JobDetailsPage />} />
                              <Route path="/jobs/:id/apply" element={<Pages.JobApplicationPage />} />
                              <Route path="/tenders" element={<Pages.TendersPage />} />
                              <Route path="/tenders/:id/submit" element={<Pages.TenderSubmissionPage />} />
                              <Route path="/auctions" element={<Pages.AuctionsPage />} />
                              <Route path="/auctions/:id" element={<Pages.AuctionDetailsPage />} />
                              <Route path="/auctions/:id/submit" element={<Pages.AuctionSubmissionPage />} />
                              <Route path="/results" element={<Pages.ResultsPage />} />
                              <Route path="/projects" element={<Pages.ProjectsPage />} />
                              <Route path="/projects/:id" element={<Pages.ProjectDetailsPage />} />
                              <Route path="/payment" element={<Pages.PaymentPage />} />
                            </Routes>
                          </main>
                          <Footer />
                        </>
                      }
                    />

                    {/* Dashboard Routes */}
                    <Route path="/dashboard" element={<DashboardOverview />} />
                    <Route path="/dashboard/tenders" element={<DashboardTenders />} />
                    <Route path="/dashboard/auctions" element={<DashboardAuctions />} />
                    <Route path="/dashboard/jobs" element={<DashboardJobs />} />
                    <Route path="/dashboard/notifications" element={<DashboardNotifications />} />
                    <Route path="/dashboard/settings" element={<DashboardSettings />} />
                    <Route path="/dashboard/payments" element={<DashboardPayments />} />
                    <Route path="/dashboard/applications" element={<Pages.JobApplicationsPage />} />
                  </Routes>
                </div>
              </NotificationProvider>
            </AuthProvider>
          </Router>
        </LanguageProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;

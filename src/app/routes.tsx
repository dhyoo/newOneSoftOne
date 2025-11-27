import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Header } from '../shared/ui/Header';

// Lazy load pages - Feature-based architecture
const HomePage = lazy(() => import('../features/home/pages/HomePage'));
const CompanyPage = lazy(() => import('../features/company/pages/CompanyPage'));
const BusinessPage = lazy(() => import('../features/business/pages/BusinessPage'));
const PortfolioPage = lazy(() => import('../features/portfolio/pages/PortfolioPage'));
const RecruitPage = lazy(() => import('../features/recruit/pages/RecruitPage'));
const SupportPage = lazy(() => import('../features/support/pages/SupportPage'));

// Loading component
const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
);

function Layout() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <Suspense fallback={<PageLoader />}>
                <Outlet />
            </Suspense>
        </div>
    );
}

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />

                {/* Company Routes */}
                <Route path="company" element={<Navigate to="/company/about" replace />} />
                <Route path="company">
                    <Route path="about" element={<CompanyPage tab="about" />} />
                    <Route path="ceo" element={<CompanyPage tab="ceo" />} />
                    <Route path="organization" element={<CompanyPage tab="organization" />} />
                    <Route path="history" element={<CompanyPage tab="history" />} />
                    <Route path="ci" element={<CompanyPage tab="ci" />} />
                    <Route path="partner" element={<CompanyPage tab="partner" />} />
                    <Route path="location" element={<CompanyPage tab="location" />} />
                </Route>

                {/* Business Routes */}
                <Route path="business">
                    <Route index element={<BusinessPage tab="si" />} />
                    <Route path="si" element={<BusinessPage tab="si" />} />
                    <Route path="solution" element={<BusinessPage tab="solution" />} />
                    <Route path="ito" element={<BusinessPage tab="ito" />} />
                    <Route path="rnd" element={<BusinessPage tab="rnd" />} />
                </Route>

                {/* Portfolio Routes */}
                <Route path="portfolio">
                    <Route index element={<PortfolioPage tab="list" />} />
                    <Route path="list" element={<PortfolioPage tab="list" />} />
                    <Route path="clients" element={<PortfolioPage tab="clients" />} />
                </Route>

                {/* Recruit Routes */}
                <Route path="recruit">
                    <Route index element={<RecruitPage tab="culture" />} />
                    <Route path="culture" element={<RecruitPage tab="culture" />} />
                    <Route path="process" element={<RecruitPage tab="process" />} />
                    <Route path="benefits" element={<RecruitPage tab="benefits" />} />
                    <Route path="jobs" element={<RecruitPage tab="jobs" />} />
                </Route>

                {/* Support Routes */}
                <Route path="support">
                    <Route index element={<SupportPage tab="notice" />} />
                    <Route path="notice" element={<SupportPage tab="notice" />} />
                    <Route path="contact" element={<SupportPage tab="contact" />} />
                </Route>
            </Route>
        </Routes>
    );
}

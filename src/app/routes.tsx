import { lazy, Suspense } from 'react';
import { useRoutes, Outlet, Navigate } from 'react-router-dom';
import { Header } from '../shared/ui/Header';
import { agGridRoutes } from '../features/ag-grid/routes';
import { ErrorBoundary } from '../shared/components/ErrorBoundary';

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
            <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
}

export function AppRoutes() {
    const routes = useRoutes([
        {
            path: "/",
            element: <Layout />,
            children: [
                { index: true, element: <HomePage /> },

                // Company Routes
                { path: "company", element: <Navigate to="/company/about" replace /> },
                {
                    path: "company",
                    children: [
                        { path: "about", element: <CompanyPage tab="about" /> },
                        { path: "ceo", element: <CompanyPage tab="ceo" /> },
                        { path: "organization", element: <CompanyPage tab="organization" /> },
                        { path: "history", element: <CompanyPage tab="history" /> },
                        { path: "ci", element: <CompanyPage tab="ci" /> },
                        { path: "partner", element: <CompanyPage tab="partner" /> },
                        { path: "location", element: <CompanyPage tab="location" /> },
                    ]
                },

                // Business Routes
                {
                    path: "business",
                    children: [
                        { index: true, element: <BusinessPage tab="si" /> },
                        { path: "si", element: <BusinessPage tab="si" /> },
                        { path: "solution", element: <BusinessPage tab="solution" /> },
                        { path: "ito", element: <BusinessPage tab="ito" /> },
                        { path: "rnd", element: <BusinessPage tab="rnd" /> },
                    ]
                },

                // Portfolio Routes
                {
                    path: "portfolio",
                    children: [
                        { index: true, element: <PortfolioPage tab="list" /> },
                        { path: "list", element: <PortfolioPage tab="list" /> },
                        { path: "clients", element: <PortfolioPage tab="clients" /> },
                    ]
                },

                // Recruit Routes
                {
                    path: "recruit",
                    children: [
                        { index: true, element: <RecruitPage tab="culture" /> },
                        { path: "culture", element: <RecruitPage tab="culture" /> },
                        { path: "process", element: <RecruitPage tab="process" /> },
                        { path: "benefits", element: <RecruitPage tab="benefits" /> },
                        { path: "jobs", element: <RecruitPage tab="jobs" /> },
                    ]
                },

                // Support Routes
                {
                    path: "support",
                    children: [
                        { index: true, element: <SupportPage tab="notice" /> },
                        { path: "notice", element: <SupportPage tab="notice" /> },
                        { path: "contact", element: <SupportPage tab="contact" /> },
                    ]
                },

                // AG Grid Routes
                ...agGridRoutes
            ]
        }
    ]);

    return routes;
}

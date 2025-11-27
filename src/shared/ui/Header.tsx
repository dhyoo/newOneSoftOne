import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAVIGATION } from '../../shared/lib/navigation';
import logoCi from '../../features/company/assets/logo_ci.png';

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const location = useLocation();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center -ml-2 md:-ml-4">
                        <img 
                            src={logoCi} 
                            alt="SoftOne" 
                            className="h-10 md:h-12 object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {NAVIGATION.map((item) => (
                            <div
                                key={item.id}
                                className="relative group"
                                onMouseEnter={() => setActiveDropdown(item.id)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    to={item.path}
                                    className={`flex items-center text-sm font-medium transition-colors py-2
                    ${location.pathname.startsWith(item.path)
                                            ? 'text-primary'
                                            : 'text-slate-600 hover:text-primary'
                                        }`}
                                >
                                    {item.label}
                                    {item.children && (
                                        <ChevronDown className="ml-1 w-4 h-4" />
                                    )}
                                </Link>

                                {/* Dropdown */}
                                {item.children && activeDropdown === item.id && (
                                    <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.id}
                                                to={child.path}
                                                className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md text-slate-600 hover:text-primary hover:bg-slate-100"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-200 h-[calc(100vh-5rem)] overflow-y-auto">
                    <div className="px-4 py-6 space-y-6">
                        {NAVIGATION.map((item) => (
                            <div key={item.id} className="space-y-3">
                                <Link
                                    to={item.path}
                                    className="block text-lg font-bold text-slate-900"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                                {item.children && (
                                    <div className="pl-4 space-y-2 border-l-2 border-slate-100">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.id}
                                                to={child.path}
                                                className="block text-sm text-slate-600 py-1"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}

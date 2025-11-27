import { type LucideIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    to: string;
}

export function ServiceCard({ title, description, icon: Icon, to }: ServiceCardProps) {
    return (
        <Link
            to={to}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-secondary/50"
        >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-primary group-hover:bg-secondary group-hover:text-white transition-colors">
                <Icon className="h-6 w-6" />
            </div>

            <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                {title}
            </h3>

            <p className="mb-6 text-slate-600 leading-relaxed">
                {description}
            </p>

            <div className="mt-auto flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                자세히 보기
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
        </Link>
    );
}

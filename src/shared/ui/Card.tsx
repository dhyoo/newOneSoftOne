import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    elevated?: boolean;
    hover?: boolean;
}

export function Card({ children, className, elevated = false, hover = true }: CardProps) {
    return (
        <div
            className={cn(
                'card-softone',
                elevated && 'card-softone-elevated',
                hover && 'hover:shadow-lg hover:-translate-y-1',
                className
            )}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return (
        <div className={cn('mb-4', className)}>
            {children}
        </div>
    );
}

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
    return (
        <h3 className={cn('heading-3 mb-2', className)}>
            {children}
        </h3>
    );
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
    return (
        <div className={cn('text-body', className)}>
            {children}
        </div>
    );
}

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
    return (
        <div className={cn('mt-4 pt-4 border-t border-slate-200', className)}>
            {children}
        </div>
    );
}


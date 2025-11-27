import React from 'react';
import { cn } from '../lib/utils';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    spacing?: 'none' | 'sm' | 'md' | 'lg';
    background?: 'white' | 'gray' | 'dark' | 'gradient';
}

export function Section({
    children,
    className,
    spacing = 'md',
    background = 'white',
}: SectionProps) {
    const spacingStyles = {
        none: '',
        sm: 'section-spacing-sm',
        md: 'section-spacing',
        lg: 'section-spacing-lg',
    };
    
    const backgroundStyles = {
        white: 'bg-white',
        gray: 'bg-slate-50',
        dark: 'bg-slate-900 text-white',
        gradient: 'bg-gradient-softone text-white',
    };
    
    return (
        <section
            className={cn(
                spacingStyles[spacing],
                backgroundStyles[background],
                className
            )}
        >
            <div className="container-softone">
                {children}
            </div>
        </section>
    );
}

interface SectionTitleProps {
    children: React.ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

export function SectionTitle({ children, className, align = 'left' }: SectionTitleProps) {
    const alignStyles = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };
    
    return (
        <h2 className={cn('heading-2 mb-8', alignStyles[align], className)}>
            {children}
        </h2>
    );
}

interface SectionDescriptionProps {
    children: React.ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

export function SectionDescription({ children, className, align = 'left' }: SectionDescriptionProps) {
    const alignStyles = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };
    
    return (
        <p className={cn('text-body-lg max-w-3xl mb-12', alignStyles[align], className)}>
            {children}
        </p>
    );
}


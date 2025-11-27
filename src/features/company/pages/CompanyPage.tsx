import React from 'react';
import { SubLayout } from '../../../shared/ui/SubLayout';
import { COMPANY_MOCK_DATA } from '../utils/mockData';
import type { CompanyData } from '../types';
import { Building2, MapPin, Phone, Quote, Cake, Users, Puzzle, RefreshCw, Monitor, BarChart3, Server, ExternalLink } from 'lucide-react';
import logoCi from '../assets/logo_ci.png';
import imgOrganization from '../assets/img_organization.jpg';
import mapImage from '../assets/map_jeungmi_station.jpg';

interface CompanyPageProps {
    tab: string;
}

export default function CompanyPage({ tab }: CompanyPageProps) {
    const data: CompanyData = COMPANY_MOCK_DATA;
    const [activeHistoryTab, setActiveHistoryTab] = React.useState(0);

    const renderContent = () => {
        switch (tab) {
            case 'ceo':
                return (
                    <div className="card-company">
                        {/* Hero Section */}
                        <div className="section-dark py-24 px-8 md:px-16">
                            {/* Background Effects */}
                            <div className="section-dark-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')" }} />
                            <div className="section-dark-gradient" />

                            {/* Content */}
                            <div className="section-dark-content max-w-4xl mx-auto">
                                <Quote className="w-12 h-12 text-primary mb-6 opacity-80" />
                                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight whitespace-pre-line">
                                    {data.ceo.subtitle}
                                </h3>
                            </div>
                        </div>

                        {/* Message Body */}
                        <div className="max-w-4xl mx-auto py-16 px-8 md:px-16">
                            <div className="prose prose-lg max-w-none text-slate-600 leading-loose whitespace-pre-line">
                                {data.ceo.content}
                            </div>

                            <div className="mt-16 text-right divider-slate pt-8">
                                <p className="text-xl font-bold text-slate-900">
                                    {data.ceo.sign}
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case 'about':
                return (
                    <div className="spacing-section">
                        {/* Intro Section */}
                        <section className="flex flex-col lg:flex-row gap-12 items-center">
                            <div className="flex-1 title-with-divider">
                                <h3 className="text-company-title">
                                    {data.about.intro.headline}
                                </h3>
                                <div className="divider-primary" />
                                <div className="space-y-4 text-company-body">
                                    {data.about.intro.desc.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 w-full aspect-video bg-slate-200 rounded-2xl overflow-hidden relative group">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                            </div>
                        </section>

                        {/* General Status Section */}
                        <section>
                            <div className="section-header">
                                <h3 className="section-title">{data.about.status.title}</h3>
                            </div>
                            <div className="grid-company">
                                {data.about.status.items.map((item, index) => (
                                    <div key={index} className="flex flex-col items-center text-center group">
                                        <div className="icon-circle-large mb-6">
                                            {item.icon === 'building' && <Building2 className="w-10 h-10 mb-2" />}
                                            {item.icon === 'cake' && <Cake className="w-10 h-10 mb-2" />}
                                            {item.icon === 'user' && <Users className="w-10 h-10 mb-2" />}
                                            {item.icon === 'phone' && <Phone className="w-10 h-10 mb-2" />}
                                            <span className="text-sm font-medium opacity-90">{item.label}</span>
                                        </div>
                                        <p className="text-lg font-bold text-slate-800">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Philosophy Section */}
                        <section className="section-dark py-20 -mx-8 px-8">
                            <div className="section-dark-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80')", opacity: 0.2 }} />
                            <div className="section-dark-content max-w-6xl mx-auto">
                                <div className="section-header-lg">
                                    <h3 className="section-title mb-4">{data.about.philosophy.title}</h3>
                                </div>
                                <div className="grid-company-3">
                                    {data.about.philosophy.items.map((item, index) => (
                                        <div key={index} className="card-company-philosophy">
                                            <div className="icon-container-lg mx-auto mb-6 text-primary">
                                                <Puzzle className="w-full h-full" />
                                            </div>
                                            <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                                            <p className="text-company-body font-medium">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Business Areas Section */}
                        <section>
                            <div className="section-header-centered">
                                <h3 className="section-title mb-6">{data.about.business.title}</h3>
                                <p className="text-company-body">
                                    {data.about.business.desc}
                                </p>
                            </div>

                            <div className="relative max-w-5xl mx-auto">
                                {/* Desktop Layout: Central Circle with surrounding items */}
                                <div className="hidden lg:grid grid-cols-3 gap-8 items-center">
                                    {/* Left Column */}
                                    <div className="space-y-24 text-right">
                                        <div className="group">
                                            <h4 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                                                {data.about.business.areas[0].title}
                                            </h4>
                                            <p className="text-slate-600 whitespace-pre-line text-sm leading-relaxed">
                                                {data.about.business.areas[0].desc}
                                            </p>
                                        </div>
                                        <div className="group">
                                            <h4 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                                                {data.about.business.areas[2].title}
                                            </h4>
                                            <p className="text-slate-600 whitespace-pre-line text-sm leading-relaxed">
                                                {data.about.business.areas[2].desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center Column (Circle) */}
                                    <div className="flex justify-center">
                                        <div className="w-64 h-64 rounded-full bg-primary flex items-center justify-center shadow-2xl z-10 relative border-8 border-white ring-4 ring-primary/20">
                                            <span className="text-3xl font-bold text-white tracking-widest">BUSINESS</span>

                                            {/* Connecting Lines (Visual only) */}
                                            <div className="absolute top-1/2 -left-12 w-12 h-0.5 bg-primary/30" />
                                            <div className="absolute top-1/2 -right-12 w-12 h-0.5 bg-primary/30" />
                                            <div className="absolute -top-12 left-1/2 w-0.5 h-12 bg-primary/30" />
                                            <div className="absolute -bottom-12 left-1/2 w-0.5 h-12 bg-primary/30" />

                                            {/* Satellite Icons */}
                                            <div className="icon-circle-satellite -top-16 left-1/2 -translate-x-1/2">
                                                <RefreshCw className="w-8 h-8" />
                                            </div>
                                            <div className="icon-circle-satellite -bottom-16 left-1/2 -translate-x-1/2">
                                                <Monitor className="w-8 h-8" />
                                            </div>
                                            <div className="icon-circle-satellite top-1/2 -left-16 -translate-y-1/2">
                                                <BarChart3 className="w-8 h-8" />
                                            </div>
                                            <div className="icon-circle-satellite top-1/2 -right-16 -translate-y-1/2">
                                                <Server className="w-8 h-8" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-24 text-left">
                                        <div className="group">
                                            <h4 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                                                {data.about.business.areas[1].title}
                                            </h4>
                                            <p className="text-slate-600 whitespace-pre-line text-sm leading-relaxed">
                                                {data.about.business.areas[1].desc}
                                            </p>
                                        </div>
                                        <div className="group">
                                            <h4 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                                                {data.about.business.areas[3].title}
                                            </h4>
                                            <p className="text-slate-600 whitespace-pre-line text-sm leading-relaxed">
                                                {data.about.business.areas[3].desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Layout: Simple Grid */}
                                <div className="lg:hidden grid grid-cols-1 gap-8">
                                    {data.about.business.areas.map((area, index) => (
                                        <div key={index} className="card-company-base">
                                            <div className="icon-container-lg mx-auto mb-4">
                                                {index === 0 && <RefreshCw className="w-8 h-8" />}
                                                {index === 1 && <BarChart3 className="w-8 h-8" />}
                                                {index === 2 && <Monitor className="w-8 h-8" />}
                                                {index === 3 && <Server className="w-8 h-8" />}
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-900 mb-2">{area.title}</h4>
                                            <p className="text-company-body text-sm">{area.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Vision Section */}
                        <section className="section-dark py-32 -mx-8 px-8 text-center">
                            <div className="section-dark-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')", opacity: 0.3 }} />
                            <div className="section-dark-content max-w-4xl mx-auto">
                                <h3 className="section-title-lg mb-8">{data.about.vision.title}</h3>
                                <p className="text-xl leading-relaxed font-medium whitespace-pre-line">
                                    {data.about.vision.desc}
                                </p>
                            </div>
                        </section>
                    </div>
                );

            case 'history':
                return (
                    <div className="spacing-section-sm">
                        {/* Tabs */}
                        <div className="timeline-tabs">
                            {data.history.tabs.map((tab, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveHistoryTab(index)}
                                    className={`btn-company ${activeHistoryTab === index ? 'btn-company-active' : 'btn-company-inactive'}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Timeline Content */}
                        <div className="timeline-container">
                            {/* Center Line */}
                            <div className="timeline-line" />

                            <div className="timeline-content">
                                {data.history.tabs[activeHistoryTab].years.map((yearGroup, index) => (
                                    <div key={index} className={`timeline-item ${index % 2 === 0 ? 'timeline-item-even' : 'timeline-item-odd'}`}>
                                        {/* Center Dot */}
                                        <div className="timeline-dot" />

                                        {/* Left Side */}
                                        <div className={`timeline-side ${index % 2 === 0 ? 'timeline-side-left' : 'timeline-side-right'}`}>
                                            {index % 2 === 0 ? (
                                                <div className="timeline-year">{yearGroup.year}</div>
                                            ) : (
                                                <ul className="timeline-events">
                                                    {yearGroup.events.map((event, eventIndex) => (
                                                        <li key={eventIndex} className="timeline-event">
                                                            {event}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        {/* Right Side */}
                                        <div className={`timeline-side ${index % 2 === 0 ? 'timeline-side-right' : 'timeline-side-left'}`}>
                                            {index % 2 === 0 ? (
                                                <ul className="timeline-events">
                                                    {yearGroup.events.map((event, eventIndex) => (
                                                        <li key={eventIndex} className="timeline-event">
                                                            {event}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <div className="timeline-year">{yearGroup.year}</div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'organization':
                return (
                    <div className="spacing-section">
                        {/* Organization Chart */}
                        <section>
                            <div className="section-header-lg">
                                <h3 className="section-title mb-4">{data.organization.title}</h3>
                                <p className="text-company-body-lg">{data.organization.intro.desc}</p>
                            </div>

                            <div className="flex justify-center pb-12">
                                <img
                                    src={imgOrganization}
                                    alt="SoftOne Organization Chart"
                                    className="max-w-full h-auto shadow-lg rounded-xl"
                                />
                            </div>
                        </section>

                        {/* Features Section */}
                        <section className="bg-slate-50 -mx-8 px-8 py-24">
                            <div className="container-center-lg">
                                <div className="section-header-lg">
                                    <h3 className="section-title">조직의 특장점</h3>
                                </div>
                                <div className="grid-company">
                                    {data.organization.features.map((feature, index) => (
                                        <div key={index} className="card-company-feature">
                                            <div className="icon-container-xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                                                {feature.icon === 'synergy' && <Users className="w-10 h-10" />}
                                                {feature.icon === 'flat' && <Puzzle className="w-10 h-10" />}
                                                {feature.icon === 'quality' && <RefreshCw className="w-10 h-10" />}
                                                {feature.icon === 'freelancer' && <Users className="w-10 h-10" />}
                                            </div>
                                            <h4 className="text-lg font-bold text-slate-900 mb-4 whitespace-pre-line leading-snug">
                                                {feature.title}
                                            </h4>
                                            {feature.description && (
                                                <p className="text-sm text-company-body text-left bg-slate-50 p-4 rounded-lg">
                                                    {feature.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Personnel Status Section */}
                        <section className="container-center-lg text-center">
                            <div className="mb-16 space-y-4">
                                <h3 className="section-title">{data.organization.personnel.title}</h3>
                                <p className="text-company-body-lg max-w-4xl mx-auto">
                                    {data.organization.personnel.description}
                                </p>
                            </div>

                            <div className="relative py-12">
                                <div className="divider-primary-top" />
                                <h4 className="text-2xl font-bold text-slate-900 mb-12 mt-8">{data.organization.personnel.subtitle}</h4>

                                <div className="grid-company-2-4">
                                    {data.organization.personnel.stats.map((stat, index) => (
                                        <div key={index} className="relative group">
                                            <div className="stat-circle">
                                                <span className="stat-label">{stat.label}</span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="stat-value">
                                                        {stat.count}
                                                    </span>
                                                    <span className="text-slate-400">명</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                );

            case 'ci':
                return (
                    <div className="spacing-section">
                        {/* CI Header */}
                        <div className="text-center">
                            <h3 className="section-title-lg mb-16">{data.ci.title}</h3>

                            {/* Logo Display */}
                            <div className="logo-display-box">
                                <div className="logo-display-pattern" />
                                <img src={logoCi} alt={data.ci.logo.alt} className="logo-display-img" />
                            </div>

                            {/* Download Buttons */}
                            <div className="flex justify-center gap-4">
                                <button className="btn-company-download">
                                    PNG 파일
                                </button>
                                <button className="btn-company-download">
                                    AI 파일
                                </button>
                            </div>
                        </div>

                        {/* Meaning Section */}
                        <div className="bg-blue-50/50 py-24 -mx-8 px-8">
                            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
                                {/* Left Text */}
                                <div className="flex-1 text-right space-y-2 order-2 md:order-1">
                                    <h4 className="text-xl font-bold text-slate-800">{data.ci.meaning.left.subtitle}</h4>
                                    <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">
                                        {data.ci.meaning.left.desc}
                                    </p>
                                </div>

                                {/* Center Circles */}
                                <div className="relative w-[400px] h-[200px] flex items-center justify-center order-1 md:order-2 flex-shrink-0">
                                    {/* Left Circle (Blue) */}
                                    <div className="absolute left-1/2 -translate-x-[90%] w-52 h-52 rounded-full bg-[#1C94D2] flex flex-col items-center justify-center text-white z-10 mix-blend-multiply opacity-90">
                                        <span className="text-xl font-medium mb-1">{data.ci.meaning.left.title.split('+')[0]}</span>
                                        <span className="text-2xl font-bold">+</span>
                                        <span className="text-4xl font-bold">{data.ci.meaning.left.title.split('+')[1]}</span>
                                    </div>

                                    {/* Right Circle (Purple) */}
                                    <div className="absolute left-1/2 -translate-x-[10%] w-52 h-52 rounded-full bg-[#31347F] flex flex-col items-center justify-center text-white z-10 mix-blend-multiply opacity-90">
                                        <span className="text-xl font-medium mb-1">{data.ci.meaning.right.title.split('+')[0]}</span>
                                        <span className="text-2xl font-bold">+</span>
                                        <span className="text-4xl font-bold">{data.ci.meaning.right.title.split('+')[1]}</span>
                                    </div>
                                </div>

                                {/* Right Text */}
                                <div className="flex-1 text-left space-y-2 order-3">
                                    <h4 className="text-xl font-bold text-slate-800">{data.ci.meaning.right.subtitle}</h4>
                                    <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">
                                        {data.ci.meaning.right.desc}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Logo Description */}
                        <div className="max-w-5xl mx-auto divider-top">
                            <div className="flex flex-col md:flex-row gap-12">
                                <div className="w-32 flex-shrink-0">
                                    <h3 className="text-2xl font-bold text-slate-900">Logo</h3>
                                </div>
                                <div className="flex-1 space-y-6">
                                    <p className="text-company-body text-justify">
                                        {data.ci.logo.desc}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Color Section */}
                        <div className="max-w-5xl mx-auto divider-top">
                            <div className="flex flex-col md:flex-row gap-12 mb-16">
                                <div className="w-32 flex-shrink-0">
                                    <h3 className="text-2xl font-bold text-slate-900">Color</h3>
                                </div>
                                <div className="flex-1">
                                    <p className="text-company-body text-justify">
                                        {data.ci.color.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Color Palette Grid */}
                            <div className="grid-company-responsive">
                                {data.ci.color.palette.map((color, index) => (
                                    <div key={index} className="border border-slate-200 bg-white">
                                        <div
                                            className="h-40 w-full"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        <div className="p-6 space-y-4">
                                            <div>
                                                <h5 className="font-bold text-white text-lg mb-1" style={{ color: index === 0 ? 'white' : 'white' }}>
                                                    <span className="text-slate-900 block">{color.name.split(' ')[0]}</span>
                                                    <span className="text-slate-900">{color.name.split(' ').slice(1).join(' ')}</span>
                                                </h5>
                                            </div>
                                            <div className="space-y-1 text-xs font-mono text-slate-500">
                                                <p>{color.cmyk}</p>
                                                <p>{color.rgb}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'partner':
                return (
                    <div className="container-center-lg">
                        <div className="section-header-lg">
                            <h3 className="section-title mb-4">{data.partner.title}</h3>
                            <p className="section-subtitle">{data.partner.description}</p>
                        </div>

                        <div className="grid-company-2-4">
                            {data.partner.list.map((partner, index) => (
                                <div key={index} className="card-company-partner group">
                                    <span className="text-xl font-bold text-slate-300 group-hover:text-slate-500 transition-colors">
                                        {partner}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'location':
                return (
                    <div className="container-center-lg">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Info Side */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-8">{data.location.title}</h3>

                                    {/* Address & Phone */}
                                    <div className="space-y-6 mb-8">
                                        <div className="info-item">
                                            <div className="icon-container">
                                                <MapPin className="w-6 h-6" />
                                            </div>
                                            <div className="info-item-content">
                                                <h4 className="info-item-title">주소</h4>
                                                <p className="info-item-text">
                                                    {data.location.address}
                                                </p>
                                                <p className="info-item-text-sm">
                                                    {data.location.addressDetail}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="info-item">
                                            <div className="icon-container">
                                                <Phone className="w-6 h-6" />
                                            </div>
                                            <div className="info-item-content">
                                                <h4 className="info-item-title">전화</h4>
                                                <p className="text-slate-700 font-medium">{data.location.phone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subway */}
                                    <div className="bg-box-blue mb-6">
                                        <h4 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2">
                                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                                                9
                                            </span>
                                            지하철
                                        </h4>
                                        <p className="text-slate-700 leading-relaxed">
                                            {data.location.subway.line} <span className="font-bold">{data.location.subway.station}</span> {data.location.subway.exit} 증미역 {data.location.subway.distance}
                                        </p>
                                    </div>

                                    {/* Bus */}
                                    <div className="bg-box-slate">
                                        <h4 className="font-bold text-slate-900 mb-4 text-lg">버스</h4>
                                        <div className="space-y-3">
                                            <div className="flex gap-3">
                                                <span className="badge-blue">간선</span>
                                                <p className="text-slate-700 text-sm">
                                                    {data.location.bus.간선.join(', ')}
                                                </p>
                                            </div>
                                            <div className="flex gap-3">
                                                <span className="badge-green">지선</span>
                                                <p className="text-slate-700 text-sm">
                                                    {data.location.bus.지선.join(', ')}
                                                </p>
                                            </div>
                                            <div className="flex gap-3">
                                                <span className="badge-red">광역</span>
                                                <p className="text-slate-700 text-sm">
                                                    {data.location.bus.광역.join(', ')}
                                                </p>
                                            </div>
                                            <div className="flex gap-3">
                                                <span className="badge-yellow">마을</span>
                                                <p className="text-slate-700 text-sm">
                                                    {data.location.bus.마을.join(', ')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Side */}
                            <div className="lg:col-span-1 map-container">
                                <a
                                    href={data.location.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full h-full relative"
                                >
                                    {mapImage ? (
                                        <img
                                            src={mapImage}
                                            alt="소프트원 위치 지도 - 증미역 주변"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        // 이미지가 없을 때 표시되는 임시 UI
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
                                            <div className="text-center p-8">
                                                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                                                <h4 className="text-xl font-bold text-slate-900 mb-2">소프트원</h4>
                                                <p className="text-slate-600 mb-4">{data.location.address}</p>
                                                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                                                    <ExternalLink className="w-4 h-4 text-primary" />
                                                    <span className="text-sm font-medium text-slate-700">카카오맵에서 보기</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* 오버레이 - 호버 시 표시 */}
                                    <div className="map-overlay">
                                        <div className="map-overlay-content">
                                            <ExternalLink className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-medium text-slate-700">카카오맵에서 보기</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Content not found</div>;
        }
    };

    return (
        <SubLayout
            title="COMPANY"
            activeTab={tab}
            sectionId="company"
        >
            <div className="content-box">
                {renderContent()}
            </div>
        </SubLayout>
    );
}

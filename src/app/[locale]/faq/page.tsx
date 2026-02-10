import type { Metadata } from 'next';
import FAQPageClient from './FAQPageClient';

export const runtime = 'edge';

export const metadata: Metadata = {
    title: 'FAQs | Alvolo Consulting',
    description: 'Frequently asked questions about Alvolo Consulting services, the Startup Corridor, and cross-border expansion between Turkey and Italy.',
};

export default function FAQPage() {
    return <FAQPageClient />;
}

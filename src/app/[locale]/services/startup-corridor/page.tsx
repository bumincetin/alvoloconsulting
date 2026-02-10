import type { Metadata } from 'next';
import StartupCorridorClient from './StartupCorridorClient';

export const runtime = 'edge';

export const metadata: Metadata = {
    title: 'Startup Corridor | Alvolo Consulting',
    description: 'The definitive data-driven bridge between Turkish and Italian innovation ecosystems.',
};

export default function StartupCorridorPage() {
    return <StartupCorridorClient />;
}

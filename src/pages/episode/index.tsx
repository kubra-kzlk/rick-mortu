/**
 * Serverside Rendering
Maak gebruik van serverside rendering om een dynamische route te maken voor elke episode, 
op basis van de id van elke episode. Bovenaan deze pagina moet een zoekbalk staan, waarin 
je kan zoeken nr andere episodes obv name of air_date. Klikken op 1 vd zoekresultaten brengt je nr de correcte episode-pag.
 */

import { GetStaticProps } from 'next';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Episode } from '@/types';

//### Static Site Generation

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch('https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/episodes.json');
    const episodes = await response.json();

    return {
        props: {
            episodes
        },
    };
};

export default function EpisodeListPage({ episodes }: { episodes: Episode[] }) {
    const [q, setSearch] = useState('');
    // Filter list on the client; same HTML is rendered on server
    const filtered = useMemo(
        () => episodes.filter(w => w.name.toLowerCase().includes(q.toLowerCase())),
        [q, episodes]
    );

    return (
        <main  >
            <h1>All Episodes </h1>
            < input
                type="text"
                placeholder="Search Episodes by name"
                value={q}
                onChange={(e) => setSearch(e.target.value)}
            />
            {filtered.length === 0 ? (
                <p>No episode found.</p>
            ) : (
                <ul>
                    {filtered.map(d => (
                        <li key={d.id}>
                            <Link href={`/episode/${d.id}`}>{d.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
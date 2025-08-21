/**
 * Serverside Rendering
Maak gebruik van serverside rendering om een dynamische route te maken voor elke episode, 
obvd id van elke episode. Bovenaan deze pagina moet een zoekbalk staan, waarin je kan 
zoeken naar andere episodes obv name of air_date. Klikken op 1 vd zoekresultaten brengt je nr de correcte episode-pag.
 */
import { Episode } from '../../types';
import Link from 'next/link';
import type { GetServerSideProps } from 'next';
import { useMemo, useState } from 'react';

interface Props {
    episode: Episode | null;
    episodes: Episode[];
    params: { id: string };
}


export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const res = await fetch('https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/characters.json');
    const episodes: Episode[] = res.ok ? await res.json() : [];

    const id = String(ctx.params?.id ?? '');
    const episode = episodes.find((e) => String(e.id) === id) ?? null;

    return {
        props: {
            episode,
            episodes,
            params: { id },
        },
    };
};


function Search({ episodes }: { episodes: Episode[] }) {
    const [q, setQ] = useState('');
    const filtered = episodes.filter(
        (e) =>
            !q ||
            e.name.toLowerCase().includes(q.toLowerCase()) ||
            e.air_date.toLowerCase().includes(q.toLowerCase())
    );

    return (
        <div>
            <input
                type="search"
                placeholder="Zoek op naam of air date…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
            />
            <ul>
                {filtered.map((ep) => (
                    <li key={ep.id}>
                        <Link href={`/episodes/${ep.id}`}>
                            {ep.name} — {ep.air_date}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}



export default function EpisodePage({ episode, episodes, params }: Props) {
    if (!episode) {
        return (
            <main style={{ padding: 24 }}>
                <h1>Episode niet gevonden</h1>
                <p style={{ opacity: 0.7 }}>Gevraagde id: {params.id}</p>
                <Link href="/">← Terug naar overzicht</Link>
                <h2 style={{ marginTop: 24 }}>Zoek andere episodes</h2>
                <Search episodes={episodes} />
            </main>
        );
    }

    return (
        <main style={{ padding: 24 }}>
            <Link href="/">← Terug naar overzicht</Link>
            <h1>{episode.name}</h1>
            <p style={{ opacity: 0.7 }}>Episode id (uit params): {params.id}</p>
            <p><strong>Air date:</strong> {episode.air_date}</p>
            <p>
                <strong>Season:</strong> {episode.season} — <strong>Episode:</strong> {episode.episode}
            </p>

            <h2 style={{ marginTop: 32 }}>Zoek andere episodes</h2>
            <Search episodes={episodes} />
        </main>
    );
}
/**
 * 
Clientside Rendering
Maak gebruik van clientside rendering om een overzichtspagina te bouwen, waarin een overzicht van alle locaties en de daarbijhorende characters worden getoond.
Gebruik hiervoor de route /
Maak hierbij gebruik van de NextJS API routes die je reeds aanmaakte.
Wanneer je klikt op een character, dan wordt je naar de character-pagina gestuurd van dat character (uit de vorige oefening), op basis van de character-id.
 */
import { useEffect, useState, useMemo } from 'react';
import { Location as BaseLocation, Character } from '../types';
import Link from 'next/link';

type Location = BaseLocation & { characters?: number[] };

export default function HomePage() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const [locRes, charRes] = await Promise.all([
                    fetch('/api/locations').then((r) => r.json()),
                    fetch('/api/characters').then((r) => r.json()),
                ]);
                setLocations(locRes);
                setCharacters(charRes);
            } catch (e) {
                setErr('Kon data niet laden.');
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const byId = useMemo(() => {
        const map = new Map<number, Character>();
        for (const c of characters) map.set(c.id, c);
        return map;
    }, [characters]);

    if (loading) return <main style={{ padding: 24 }}>Laden…</main>;
    if (err) return <main style={{ padding: 24, color: 'crimson' }}>{err}</main>;


    // When loaded successfully
    return (
        <div>
            <h1>Locaties & Characters</h1>
            <p>Klik op een character om naar de detailpagina te gaan.</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 16 }}>
                {locations.map((loc) => (
                    <li key={loc.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
                        <h2 style={{ margin: '0 0 8px' }}>{loc.name}</h2>
                        <p style={{ margin: 0, opacity: 0.8 }}>
                            {loc.type} — {loc.dimension}
                        </p>

                        {loc.characters && loc.characters.length > 0 ? (
                            <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {loc.characters.map((id) => {
                                    const c = byId.get(id);
                                    if (!c) return null;
                                    return (
                                        <Link
                                            key={id}
                                            href={`/characters/${id}`}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                padding: '6px 10px',
                                                border: '1px solid #eee',
                                                borderRadius: 6,
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <img
                                                src={c.image}
                                                alt={c.name}
                                                width={28}
                                                height={28}
                                                style={{ borderRadius: '50%', objectFit: 'cover' }}
                                            />
                                            <span>{c.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <p style={{ marginTop: 12, fontStyle: 'italic', opacity: 0.7 }}>
                                Geen characters met deze origin.
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );

}
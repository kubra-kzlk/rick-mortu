//Static Site Generation
//Maak gebruik van static site generation om een dynamische route te maken voor elk character,
// obv id van het character.Gebruik hiervoor de route / characters / 1
//Je mag hiervoor rechtstreeks gebruik maken van de data op https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/characters.json.

// pages/characters/[id].tsx
// SSG op basis van externe characters.json (Pages Router)

import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import type { Character } from '../../types';

const CHARACTERS_URL =
    'https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/characters.json';

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(CHARACTERS_URL);
    const characters: Character[] = await res.json();
    return {
        paths: characters.map((c) => ({ params: { id: String(c.id) } })),
        fallback: false,
    };
};

interface Props {
    character: Character | null;
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
    const id = Number(ctx.params?.id);
    const res = await fetch(CHARACTERS_URL);
    const characters: Character[] = await res.json();
    const character = characters.find((c) => c.id === id) ?? null;
    return { props: { character } };
};

export default function CharacterDetailPage({ character }: Props) {
    if (!character) {
        return (
            <main style={{ padding: 24 }}>
                <h1>Character niet gevonden</h1>
                <Link href="/">← Terug</Link>
            </main>
        );
    }

    return (
        <main style={{ padding: 24 }}>
            <Link href="/">← Terug</Link>
            <h1>{character.name}</h1>

            {/* Gebruik <img> om direct te testen zonder next/image config */}
            <img
                src={character.image}
                alt={character.name}
                width={300}
                height={300}
                style={{ borderRadius: 8, objectFit: 'cover' }}
            />

            <h2>Status</h2><p>{character.status}</p>
            <h2>Species</h2><p>{character.species}</p>
            {character.type && (<><h2>Type</h2><p>{character.type}</p></>)}
            <h2>Gender</h2><p>{character.gender}</p>
            <h2>Origin</h2>
            {character.origin?.url ? (
                <p>
                    <a href={character.origin.url} target="_blank" rel="noreferrer">
                        {character.origin.name}
                    </a>
                </p>
            ) : (
                <p>{character.origin?.name ?? 'unknown'}</p>
            )}    </main>
    );
}

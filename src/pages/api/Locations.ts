import { Location, Character, EnrichedLocation } from '../../types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const response = await fetch('https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/locations.json');
        const locations: Location[] = await response.json();

        // 2) haal characters via EIGEN endpoint
        const charRes = await fetch(`${origin}/api/characters`);
        if (!charRes.ok) {
            return NextResponse.json({ error: 'Failed to fetch characters' }, { status: 500 });
        }
        const characters: Character[] = await charRes.json();

        // 3) maak een map: originName -> ids[]
        const originToIds = new Map<string, number[]>();
        for (const c of characters) {
            const arr = originToIds.get(c.origin) ?? [];
            arr.push(c.id);
            originToIds.set(c.origin, arr);
        }

        // 4) verrijk locaties; enkel "characters" toevoegen als er ids zijn
        const enriched: EnrichedLocation[] = locations.map((loc) => {
            const ids = originToIds.get(loc.name) ?? [];
            if (ids.length === 0) return { ...loc }; // geen property toevoegen
            return { ...loc, characters: ids };
        });
        res.status(200).json(enriched);
    } catch (error) {
        console.error('Error fetching dinomon:', error);
        res.status(500).json({ message: 'Failed to fetch dinomon' });
    }
}

/*
Maak een API endpoint, waarin de locations van https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/locations.json 
worden uitgebreid met een characters property. Deze property is een array, met daarin alle ids van characters die als origin die location hebben.
Gebruik de juiste NextJS API Endpoint om de character IDs op te vragen.
Wanneer er geen enkel character van deze locatie afkomstig is, moet deze niet worden ingevuld.
*/
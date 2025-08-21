import { Location, Character, EnrichedLocation } from '../../types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // 1) Haal locaties binnen
        const response = await fetch(
            'https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/locations.json'
        );
        const locations: Location[] = await response.json();

        // 2) Haal characters via eigen endpoint
        const baseUrl = `http://${req.headers.host}`;
        const charRes = await fetch(`${baseUrl}/api/characters`);
        if (!charRes.ok) {
            return res.status(500).json({ error: 'Failed to fetch characters' });
        }
        const characters: Character[] = await charRes.json();

        // 3) Maak een map: originName -> ids[]
        const originToIds = new Map<string, number[]>();

        for (const c of characters) {
            const originName = c.origin?.name?.trim().toLowerCase(); // origin is object { name, url }
            if (!originName) continue;

            const arr = originToIds.get(originName) ?? [];
            arr.push(c.id);
            originToIds.set(originName, arr);
        }

        // 4) Verrijk locaties
        const enriched: EnrichedLocation[] = locations.map((loc) => {
            const locName = loc.name.trim().toLowerCase();
            const ids = originToIds.get(locName) ?? [];
            if (ids.length === 0) return { ...loc };
            return { ...loc, characters: ids };
        });

        // 5) Stuur resultaat terug
        res.status(200).json(enriched);
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ message: 'Failed to fetch locations' });
    }
}

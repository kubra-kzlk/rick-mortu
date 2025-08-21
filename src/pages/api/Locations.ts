import { Location } from '../../types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const response = await fetch('https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/locations.json');
        const jsonData = await response.json();
   

        // Get the list of regions and dinomon
        const regions = jsonData.region;
        const dinomons = jsonData.dinomon;

        //Transform dinomons by adding full region object
        const enrichedDinomons = dinomons.map((dinomon: any) => {
            const regionsById = regions.find((r: any) => r.id === dinomon.region);
            return {
                ...dinomon,
                region: regionsById || null, // Replace regionId with full region object
            };
        });


        res.status(200).json(enrichedDinomons);
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
import { Character } from '../../types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const response = await fetch('https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/episodes.json');
    const characters = await response.json();

    res.status(200).json(characters);
}

/*
De Characters Endpoint voorziet de data die je terugkrijgt van https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/characters.json. Er moet verder niets gewijzigd worden aan deze data. */
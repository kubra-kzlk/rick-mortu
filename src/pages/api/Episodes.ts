import { Episode } from '../../types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const response = await fetch('https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/episodes.json');
    const episodes = await response.json();

    res.status(200).json(episodes);
}
/*
De Episodes Endpoint voorziet de data die je terugkrijgt van https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/episodes.json. Er moet verder niets gewijzigd worden aan deze data.
 */
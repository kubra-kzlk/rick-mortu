/**
 * Serverside Rendering
Maak gebruik van serverside rendering om een dynamische route te maken voor elke episode, 
obvd id van elke episode. Bovenaan deze pagina moet een zoekbalk staan, waarin je kan 
zoeken naar andere episodes obv name of air_date. Klikken op 1 vd zoekresultaten brengt je nr de correcte episode-pag.
 */

//### Static Site Generation

import { GetStaticPaths, GetStaticProps } from 'next';
import { Episode } from '../../types';

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch('https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/episodes.json');
    const episodes: Episode[] = await response.json();
    return {
        paths: episodes.map(w => ({ params: { id: String(w.id) } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const response = await fetch('https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/episodes.json');
    const episode: Episode[] = await response.json();
    return { props: { episode } };
};

export default function EpisodeDetailPage({ episode }: { episode: Episode }) {

    return (
        <main>
            <h1>{episode.name}</h1>

            <p>{episode.air_date}</p>

            <p>{episode.episode}</p>
            <p>{episode.season}</p>

        </main>
    );
}
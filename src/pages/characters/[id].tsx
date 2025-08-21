//Static Site Generation
//Maak gebruik van static site generation om een dynamische route te maken voor elk character,
// obv id van het character.Gebruik hiervoor de route / characters / 1
//Je mag hiervoor rechtstreeks gebruik maken van de data op https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/characters.json.


import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { Character } from '../../types';

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch('https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/characters.json');
    const characters: Character[] = await response.json();

    return {
        paths: characters.map(w => ({ params: { id: String(w.id) } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<{ character: Character | null }> = async (ctx) => {
    const id = Number(ctx.params?.id);
    const response = await fetch('https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/characters.json');
    const characters: Character[] = await response.json();
    const character = characters.find((c) => c.id === id) ?? null;
    return { props: { character } };
};


export default function CharacterDetailPage(props: Character) {

    return (
        <main>
            <h1>{props.name}</h1>
            <Image
                src={props.image} alt={''}
                width={300}
                height={300}
            />

            <h2>Status</h2>
            <p>{props.status}</p>

            <h2>Species</h2>
            <p>{props.species}</p>

            <p>{props.type}</p>

            <p>{props.gender}</p>


        </main>
    );
}
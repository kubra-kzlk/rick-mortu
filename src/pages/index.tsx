/**
 * 
Clientside Rendering
Maak gebruik van clientside rendering om een overzichtspagina te bouwen, waarin een overzicht van alle locaties en de daarbijhorende characters worden getoond.
Gebruik hiervoor de route /
Maak hierbij gebruik van de NextJS API routes die je reeds aanmaakte.
Wanneer je klikt op een character, dan wordt je naar de character-pagina gestuurd van dat character (uit de vorige oefening), op basis van de character-id.
 */

import { useEffect, useState } from 'react';
import { Location, Character } from '../types';

export default function WeaponsPage() {
    const [weapons, setWeapons] = useState<Weapon[] | null>(null);

    useEffect(() => {
        fetch('/api/weapons') // Fetch from our own API endpoint
            .then(res => res.json()) // Parse the JSON response
            .then(data => {
                setWeapons(data);// Set the regions state with the fetched data
            })
    }, []);

    // While loading
    if (weapons === null) {
        return <p>Loading...</p>;
    }

    // When loaded successfully
    return (
        <div>
            <h1>WEAPONS</h1>
            <ul>
                {weapons.map(weapon => (
                    <li key={weapon.id} >
                        <p>{weapon.name}</p>
                        <p>Type: {weapon.type}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
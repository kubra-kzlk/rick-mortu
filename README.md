Voorzie 3 API Endpoints met behulp van de API router in NextJS:
Characters
Episodes
Locations

Characters Endpoint
De Characters Endpoint voorziet de data die je terugkrijgt van https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/characters.json. Er moet verder niets gewijzigd worden aan deze data.


Episodes Endpoint
De Episodes Endpoint voorziet de data die je terugkrijgt van https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/episodes.json. Er moet verder niets gewijzigd worden aan deze data.


Locations Endpoint
Maak een API endpoint, waarin de locations van https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/locations.json worden uitgebreid met een characters property. Deze property is een array, met daarin alle ids van characters die als origin die location hebben.
Gebruik de juiste NextJS API Endpoint om de character IDs op te vragen.
Wanneer er geen enkel character van deze locatie afkomstig is, moet deze niet worden ingevuld.

oude interface:
interface location {
    id:        number;
    name:      string;
    type:      string;
    dimension: string;
}
  
nieuwe interface:
interface location {
    id:        number;
    name:      string;
    type:      string;
    dimension: string;
    characters?: number[];
}
  
Static Site Generation
Maak gebruik van static site generation om een dynamische route te maken voor elk character, op basis van de id van het character. Gebruik hiervoor de route /characters/1
Je mag hiervoor rechtstreeks gebruik maken van de data op https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/characters.json. Je moet hiervoor dus niet de locale API gebruiken.


Clientside Rendering
Maak gebruik van clientside rendering om een overzichtspagina te bouwen, waarin een overzicht van alle locaties en de daarbijhorende characters worden getoond.
Gebruik hiervoor de route /
Maak hierbij gebruik van de NextJS API routes die je reeds aanmaakte.
Wanneer je klikt op een character, dan wordt je naar de character-pagina gestuurd van dat character (uit de vorige oefening), op basis van de character-id.

Serverside Rendering
Maak gebruik van serverside rendering om een dynamische route te maken voor elke episode, op basis van de id van elke episode. Bovenaan deze pagina moet een zoekbalk staan, waarin je kan zoeken naar andere episodes op basis van name of air_date. Klikken op één van de zoekresultaten brengt je naar de correcte episode-pagina.
Je mag hiervoor rechtstreeks gebruik maken van de data op https://raw.githubusercontent.com/AP-G-2PRO-Webframeworks/DATA/refs/heads/main/rickandmorty/episodes.json. Je moet hiervoor dus niet de locale API gebruiken.

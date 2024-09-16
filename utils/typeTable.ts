// get pokemons by the types use selected
// for example:
// if user select poison, then I need to get the dependent id from the poison type
// and then fetch /types/4 (4 is the id of poison) and it offer the pokemon array which contains the name and url
// then I need to call this url and update state with the result

// first create a mapping of the type id to the type name
export const types = [
    { id: 1, name: "normal" },
    { id: 2, name: "fighting" },
    { id: 3, name: "flying" },
    { id: 4, name: "poison" },
    { id: 5, name: "ground" },
    { id: 6, name: "rock" },
    { id: 7, name: "bug" },
    { id: 8, name: "ghost" },
    { id: 9, name: "steel" },
    { id: 10, name: "fire" },
    { id: 11, name: "water" },
    { id: 12, name: "grass" },
    { id: 13, name: "electric" },
    { id: 14, name: "psychic" },
    { id: 15, name: "ice" },
    { id: 16, name: "dragon" },
    { id: 17, name: "dark" },
    { id: 18, name: "fairy" },
    { id: 19, name: "stellar" },
    { id: 10001, name: "unknown" },
];

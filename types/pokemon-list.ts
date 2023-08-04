export interface PokemonListParams {
    limit?: number
    offset?: number
}

export interface PokemonData {
    default_image?: string | null
    default_image_shiny?: string | null
    id: number
    name: string
    speciesData: SpeciesData
    sprites: any[]
    types: Types[]
}

export interface PokemonListResponseBody {
    params: PokemonListParams | null
    pokemonData: PokemonData[]
}

export interface Types {
    slot: number
    type: DefaultPokeApiDataObject
}

interface DefaultPokeApiDataObject {
    name: string
    url: string
}

interface EvolutionChain {
    url: string
}

interface FlavorTextEntries {
    flavor_text: string
    language: DefaultPokeApiDataObject
    version: DefaultPokeApiDataObject
}

interface Genera {
    genus: string
    language: DefaultPokeApiDataObject
}

interface PalParkEncounters {
    area: DefaultPokeApiDataObject
    base_score: number
    rate: number
}

interface PokedexNumbers {
    entry_number: number
    pokedex: DefaultPokeApiDataObject
}

interface Varieties {
    is_default: boolean
    pokemon: DefaultPokeApiDataObject
}
export interface SpeciesData {
    base_happiness: number
    capture_rate: number
    color: DefaultPokeApiDataObject
    egg_groups: DefaultPokeApiDataObject[]
    evolution_chain: EvolutionChain
    evolves_from_species: DefaultPokeApiDataObject
    flavor_text_entries: FlavorTextEntries[]
    form_descriptions: any[]
    forms_switchable: boolean
    gender_rate: number
    genera: Genera[]
    generation: DefaultPokeApiDataObject
    growth_rate: DefaultPokeApiDataObject
    habitat: DefaultPokeApiDataObject
    has_gender_differences: boolean
    hatch_counter: number
    id: number
    is_baby: boolean
    is_legendary: boolean
    is_mythical: boolean
    name: string
    names: Names[]
    order: number
    pal_park_encounters: PalParkEncounters[]
    pokedex_numbers: PokedexNumbers[]
    shape: DefaultPokeApiDataObject
    varieties: Varieties[]
}

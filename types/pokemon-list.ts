export interface PokemonListParams {
    limit?: number
    offset?: number
}

export interface PokemonData {
    default_image?: string | null
    default_image_shiny?: string | null
    id: number
    name: string
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

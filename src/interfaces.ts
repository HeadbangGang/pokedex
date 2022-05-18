export interface PokemonDataInterface {
    id?: number|string
    name?: string
    img?: string
    img_shiny?: string
    sprites?: Sprites[]
}

export interface Sprites {
    back_default?: string
    back_shiny?: string
    front_default?: string
    front_shiny?: string
}

export interface ResponseParamsInterface {
    limit?: string
    offset?: string
}

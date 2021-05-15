/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Container } from 'react-bootstrap'
import PokemonHome from './pokemonHome'
import './pokemon.css'

export default class PokemonContainer extends React.Component {
    render():any {
        return (
            <Container>
                <PokemonHome />
            </Container>
        )
    }
}
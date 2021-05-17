/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function PokemonProfile({ pokemon }) {

    const [isCallInProgress, setIsCallInProgress] = useState(false)
    const [pokemonData, setPokemonData] = useState()

    useEffect(() => {
        async function getPokemon() {
            setIsCallInProgress(true)
            try{
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                if (res.status === 200){
                    await res.json().then(function (data) {
                        setPokemonData(data)
                    })
                } else {
                    console.log('Whoops, shits broke')
                }
            } catch (e) {
                console.log(e)
            } finally {
                setIsCallInProgress(false)
            }
        }
        getPokemon()
    }, [])

    return (
        <>
            { !isCallInProgress
                ? <div>{pokemon}</div>
                :<div>Loading...</div> }
        </>
    )
}

PokemonProfile.propTypes = {
    pokemon: PropTypes.string
}
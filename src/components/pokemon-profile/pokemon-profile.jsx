import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { boxArt } from '../../media/boxart/index'
import { GENERAL } from '../../language-map'
import spinner from '../../media/spinner.webp'
import PokemonGameSprite from './pokemon-game-sprite'
import './pokemon-profile.less'

export default function PokemonProfile ({ selectedPokemon, allPokemonData, showShiny }) {
    const [allSprites, setAllSprites] = useState([])
    const [pokemonData, setPokemonData] = useState({})
    const [image, setImage] = useState(spinner)

    useEffect(() => {
        setPokemonData(allPokemonData[allPokemonData.findIndex(item => item.name === selectedPokemon)])
        if (Object.keys(pokemonData).length > 0) {
            const { sprites } = pokemonData
            let sortedSprites = Object.keys(sprites).map(key => {
                const sprite = sprites[key]
                if (sprite) {
                    return { [key]: sprite }
                }
            }).filter(item => item && !item?.other && !item?.versions)
            const additionalSprites = Object.keys(sprites.versions).map(version => sprites.versions[version])
            if (additionalSprites) {
                additionalSprites.forEach(gen => {
                    Object.keys(gen).forEach(game => {
                        if (game !== 'icons' && gen[game].front_default) {
                            sortedSprites.push({ [game]: gen[game] })
                        }
                    })
                })
            }
            setAllSprites(sortedSprites)
        }
    }, [pokemonData])

    useEffect(() => {
        if (allSprites.length > 0) {
            const { front_default } = allSprites[allSprites.findIndex(item => item.front_default)]
            const { front_shiny } = allSprites[allSprites.findIndex(item => item.front_shiny)]
            showShiny && front_shiny
                ? setImage(front_shiny)
                : setImage(front_default)
        }
    }, [showShiny, allSprites])

    const renderBoxart = () => {
        let gameTitles = []
        allSprites.length > 0 && allSprites.map(title => {
            title = Object.keys(title)[0]
            if (!title.includes('_')) {
                if (title.includes('-')) {
                    if (title.match(/-/g).length > 2) {
                        title = title.split('-') //This entire block is for ultra sun and ultra moon. Need to find better solution
                        const first = `${ title[0] }-${ title[1] }`
                        const second = `${ title[2] }-${ title[3] }`
                        gameTitles.push(first, second)
                    } else {
                        title = title.split('-')
                        gameTitles = gameTitles.concat(title)
                    }
                } else {
                    gameTitles.push(title)
                }
            }
        })
        return (
            gameTitles.map(game => {
                const imageGameMatcher = allSprites.findIndex(item => {
                    return Object.keys(item)[0].includes(game === 'y' ? 'x' : game) // temp solution for x & y games sharing sprites
                })
                const { front_default, front_shiny } = allSprites[imageGameMatcher][Object.keys(allSprites[imageGameMatcher])[0]]
                return (
                    <div key={ game } style={{ width: '400px', height: '400px' }}>
                        <div>
                            <img
                                alt={ game }
                                src={ boxArt[game] }
                                height='300'
                                width='300'
                            />
                            {front_default &&
                        <PokemonGameSprite
                            alt={ name }
                            sprite={ showShiny && front_shiny ? front_shiny : front_default }
                        /> }
                        </div>
                    </div>
                )
            })
        )
    }

    const { name } = pokemonData

    return (
        <>
            { pokemonData
                ? <div className="pokemon-profile-container">
                    <h1 className="pokemon-profile-name">
                        { name }
                    </h1>
                    <div>
                        <img
                            alt={ name }
                            className="d-block pokemon-profile-img"
                            draggable={ false }
                            src={ image }
                        />
                    </div>
                    <div className='pokemon-profile-boxart-wrapper'>
                        {renderBoxart()}
                    </div>
                </div>
                :<div className="pokemon-container__spinner-wrapper">
                    <img
                        alt={ GENERAL.loading }
                        className="pokemon-container__spinner"
                        src={ spinner }
                    />
                </div>
            }
        </>
    )
}

PokemonProfile.propTypes = {
    allPokemonData: PropTypes.array,
    selectedPokemon: PropTypes.string,
    showShiny: PropTypes.bool
}
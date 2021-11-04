import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { boxArt } from '../../media/boxart/index'
import spinner from '../../media/spinner.webp'
import PokemonGameSprite from './pokemon-game-sprite'
import './pokemon-profile.less'

export default function PokemonProfile ({ selectedPokemonData, showShiny }) {
    const { name, sprites } = selectedPokemonData

    const [image, setImage] = useState(spinner)

    useEffect(() => {
        const { img, img_shiny } = selectedPokemonData
        showShiny && img_shiny
            ? setImage(img_shiny)
            : setImage(img)
    })

    useEffect(() => {
        document.getElementsByClassName('navbar-brand-name')[0].scrollIntoView(true)
    }, [])

    const renderBoxart = () => {
        let gameTitles = []
        sprites?.length > 0 && sprites.map(title => {
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
                const imageGameMatcher = sprites.findIndex(item => {
                    return Object.keys(item)[0].includes(game === 'y' ? 'x' : game) // temp solution for x & y games sharing sprites
                })
                const { front_default, front_shiny } = sprites[imageGameMatcher][Object.keys(sprites[imageGameMatcher])[0]]
                return (
                    <div key={ game } style={{ margin: '0 20px', maxHeight: '380px' }}>
                        <div>
                            <img
                                alt={ game }
                                src={ boxArt[game] }
                                height='300'
                                width='300'
                                style={{ boxShadow: 'grey 0px 0px 40px 10px', border: '1px solid grey' }}
                            />
                        </div>
                        {front_default &&
                            <PokemonGameSprite
                                alt={ name }
                                sprite={ showShiny && front_shiny ? front_shiny : front_default }
                            />}
                    </div>
                )
            })
        )
    }

    return (
        <div className="pokemon-profile-container">
            <h1 className="pokemon-profile-name" tabIndex='-1'>
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
    )
}

PokemonProfile.propTypes = {
    selectedPokemonData: PropTypes.object,
    showShiny: PropTypes.bool
}
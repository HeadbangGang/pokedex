import React, { useContext, useState } from 'react'
import { Form, Offcanvas } from 'react-bootstrap'
import { PokemonDataContext } from '../../providers/pokemon-data'
import { UIContext } from '../../providers/ui'
import './footer.less'

const Footer = () => {
    const [showSpoke, setShowSpoke] = useState(false)
    const { showShiny, setShowShiny, pokedexCount } = useContext(PokemonDataContext)
    const { isSmallView } = useContext(UIContext)

    if (isSmallView) {
        return (
            <>
                <button className='footer-content__button' onClick={() => setShowSpoke(true)}>
                    <img alt='Menu' src="/assets/media/menu-icon.png" />
                </button>
                <Offcanvas className="offcanvas__content" show={showSpoke} onHide={() => setShowSpoke(false)} placement='bottom'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="offcanvas__body">
                        <div>
                            <Form.Check
                                checked={ showShiny }
                                id="shiny-pokemon"
                                label="Show Shiny Pokemon"
                                onChange={ () => setShowShiny(!showShiny) }
                                type="switch"
                            />
                        </div>
                        <div className="pokedex-count">
                            Pokédex Count: { pokedexCount }
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        )
    }

    return (
        <div className='footer-content'>
            <div className={isSmallView ? 'small__shiny' : 'right'}>
                <Form.Check
                    checked={ showShiny }
                    id="shiny-pokemon"
                    label="Show Shiny Pokemon"
                    onChange={ () => setShowShiny(!showShiny) }
                    type="switch"
                />
            </div>
            <div className={isSmallView ? 'small__count' : 'left'}>
                Total Pokemon: {pokedexCount}
            </div>
        </div>
    )
}

export default Footer

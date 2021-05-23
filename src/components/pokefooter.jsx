import React from 'react'
import { Navbar } from 'react-bootstrap'
import PropTypes from 'prop-types'
import pokeball from '../media/pokeball.png'

export default class PokeFooter extends React.Component {
    render() {
        const date = new Date

        PokeFooter.propTypes = {
            error: PropTypes.string,
            pokemonCount: PropTypes.number,
            setError: PropTypes.func
        }

        const { pokemonCount } = this.props

        return (
            <Navbar bg="dark" fixed="bottom">
                <Navbar.Brand href="/pokedex">
                    <img
                        src={ pokeball }
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt=''
                        draggable={ false }
                    />
                </Navbar.Brand>
                <span style={{color: 'white'}}>
                © {date.getFullYear()} Tayden Flitcroft
                </span>
                { this.props.pokemonCount &&
                <div className="ml-auto" style={{color: 'white'}}>
                    National Pokédex Count: { pokemonCount }
                </div> }
            </Navbar>
        )
    }
}
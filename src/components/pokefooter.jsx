import React from 'react'
import { Navbar } from 'react-bootstrap'
import pokeball from '../media/pokeball.png'

export default class PokeFooter extends React.Component {
    render(){
        const date = new Date

        return (
            <Navbar bg="dark">
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
                <div className="ml-auto" style={{color: 'white'}}>
                    Currently Existing Pokemon: 
                </div>
            </Navbar>
        )
    }
}
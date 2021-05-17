/* eslint-disable no-console */
import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Row, Alert } from 'react-bootstrap'
import PokemonCard from './pokemonCard'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function PokemonHome ({ setPokemonCount, setSelectedPokemon }) {
    const [pokemonList, setPokemonList] = useState()
    const [nextPokemonURL, setNextPokemonURL] = useState()
    const [isCallInProgress, setIsCallInProgress] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertParams, setAlertParams] = useState()

    useEffect(() => {
        getPokemon()
    }, [])

    async function getPokemon() {
        setIsCallInProgress(true)
        try{
            const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=60')
            if (res.status === 200){
                await res.json().then(function (data) {
                    setPokemonList(data.results)
                    setNextPokemonURL(data.next)
                    setPokemonCount(data.count)
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

    async function updatePokemonList() {
        try{
            const res = await fetch(nextPokemonURL)
            if (res.status === 200){
                await res.json().then(function (data) {
                    const mergedData = pokemonList.concat(data.results)
                    setPokemonList(mergedData)
                    setNextPokemonURL(data.next)
                    setPokemonCount(data.count)
                })
            } else {
                console.log('Whoops, shits broke')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            { showAlert &&
            <Alert
                dismissible
                variant={ alertParams.variant }
                onClose={() => {
                    setShowAlert(false)
                    setAlertParams({})
                }}
            >
                <Alert.Heading>{ alertParams.heading }</Alert.Heading>
                <p>{alertParams.message || 'I\'m not sure what happened, please try again'}</p>
            </Alert>
            }
            { pokemonList && !isCallInProgress
                ?    <InfiniteScroll
                    dataLength={pokemonList.length}
                    next={() => updatePokemonList()}
                    hasMore={!!nextPokemonURL}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <Row xl={6} lg={4} md={3} sm={2} xs={1}>
                        { pokemonList.map(function (pokemon, index) {
                            return (
                                <PokemonCard
                                    key={ index }
                                    pokemon={ pokemon }
                                    setSelectedPokemon={ setSelectedPokemon }
                                />
                            )
                        }) }
                    </Row>
                </InfiniteScroll>
                : <div>Loading...</div> }
        </div>
    )
}

PokemonHome.propTypes = {
    alertParams: PropTypes.string,
    setAlertParams: PropTypes.func,
    setPokemonCount: PropTypes.func,
    setSelectedPokemon: PropTypes.func,
    setShowAlert: PropTypes.func,
    showAlert: PropTypes.bool
}
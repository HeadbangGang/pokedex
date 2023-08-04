import React, { useEffect, useContext } from 'react'
import { PokemonListContext } from '../../providers/pokemon-list'
import {
	motion,
	useScroll,
	useSpring
} from 'framer-motion'
import styled from 'styled-components'
import { PokemonData } from '../../../types/pokemon-list'
import PokemonDataSection from '../pokemon-data-section/'

const ProgressBar = styled(motion.div)`
  position: fixed;
  left: 0;
  right: 0;
  height: 5px;
  background: var(--accent);
  bottom: 100px;
  z-index: 2;
`

const Home = (): React.ReactNode => {
	const { getPokemonList, pokemonList } = useContext(PokemonListContext)
	const { scrollYProgress } = useScroll()

	useEffect(() => {
		getPokemonList()
	}, [])

	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001
	})

	return (
		<div>
			{ pokemonList.map(
				(data: PokemonData): React.ReactNode => (
					<PokemonDataSection
						key={data.id}
						image={data.default_image}
						{...data}
					/>
				)) }
			<ProgressBar style={{ scaleX }} />
		</div>
	)
}

export default Home

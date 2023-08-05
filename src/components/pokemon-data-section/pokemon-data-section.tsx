import React, { useRef } from 'react'
import {
	motion,
	useScroll,
	type MotionValue,
	useTransform
} from 'framer-motion'
import styled from 'styled-components'
import { Species } from '../../../types/pokemon-list'

const PokemonLabel = styled(motion.div)`
  align-self: center;
  background: linear-gradient(
    var(--${ (props) => props.color }),
    ${ (props) => (props.color === 'white' ? 'black' : 'white') }
  );
  color: transparent;
  font-size: 13vw;
  font-weight: 700;
  margin-top: 50px;
  position: absolute;
  text-transform: uppercase;
  z-index: 1;
  -webkit-background-clip: text;
`

const PokemonIdLabel = styled(motion.h2)`
  color: lightgray;
  font-size: 50vw;
  font-weight: 900;
  letter-spacing: -3px;
  line-height: 1.2;
  opacity: 0.6;
  position: absolute;
  z-index: -1;
`

const PokemonImageContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  perspective: 500px;
  position: relative;
  scroll-snap-align: center;
`

const ImageWrapper = styled.div`
  height: 600px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  width: 600px;
`

const PokemonImage = styled.img`
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 3;
`

const PokemonDataContainer = styled.section`
  display: flex;
  flex-direction: column;
`

const PokemonDataSection = ({
	id,
	image,
	name,
	...rest
}: {
  id: number;
  image: string;
  name: string;
  species: Species;
}): React.ReactNode => {
	const useParallax = (
		value: MotionValue<number>,
		distance: number
	): MotionValue<number> => useTransform(value, [ 0, 1 ], [ -distance, distance ])

	const ref = useRef(null)
	const { scrollYProgress } = useScroll({ target: ref })
	const y = useParallax(scrollYProgress, 300)

	return (
		<PokemonDataContainer>
			<PokemonLabel color={rest.species.color.name} style={{ y }}>
				{name}
			</PokemonLabel>
			<PokemonImageContainer>
				<ImageWrapper ref={ref}>
					<PokemonImage src={image} alt='' />
				</ImageWrapper>
				<PokemonIdLabel style={{ y }}>
					{id.toString().padStart(3, '0')}
				</PokemonIdLabel>
			</PokemonImageContainer>
		</PokemonDataContainer>
	)
}

export default PokemonDataSection

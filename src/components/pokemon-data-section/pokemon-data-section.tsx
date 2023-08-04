import React, { useRef } from 'react'
import {
	motion,
	useScroll,
	type MotionValue,
	useTransform
} from 'framer-motion'
import styled from 'styled-components'
import { PokemonData, SpeciesData, Types } from '../../../types/pokemon-list'

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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  scroll-snap-align: center;
  perspective: 500px;
`

const ImageWrapper = styled.div`
  width: 600px;
  height: 600px;
  position: relative;
  max-height: 90vh;
  overflow: hidden;
`

const PokemonImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`

const PokemonDataContainer = styled.section`
  display: flex;
  flex-direction: column;
`

const TypesContainer = styled(motion.div)`
  align-self: center;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  position: absolute;
  width: 100%;
  height: 85vh;
  margin-bottom: 10vh;
  z-index: 1;
`

const TypeImage = styled(motion.img)`
  width: 18vw;
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
  speciesData: SpeciesData;
  types: Types[];
}): React.ReactNode => {
	const useParallax = (
		value: MotionValue<number>,
		distance: number
	): MotionValue<number> => useTransform(value, [ 0, 1 ], [ -distance, distance ])

	const ref = useRef(null)
	const { scrollYProgress } = useScroll({ target: ref })
	const y = useParallax(scrollYProgress, 300)

	const types: string[] = rest.types.reduce(
		(acc: string[], item: Types) => [ ...acc, item.type.name ],
		[]
	)

	return (
		<PokemonDataContainer>
			<PokemonLabel color={rest.speciesData.color.name} style={{ y }}>
				{name}
			</PokemonLabel>
			<TypesContainer style={{ y }}>
				{types.map((type, idx) => (
					<TypeImage key={idx} src={`/media/types/${ type }.png`} />
				))}
			</TypesContainer>
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

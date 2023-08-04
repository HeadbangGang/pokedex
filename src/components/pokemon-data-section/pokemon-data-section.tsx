import React, { useRef } from 'react'
import {
	motion,
	useScroll,
	type MotionValue,
	useTransform
} from 'framer-motion'
import styled from 'styled-components'

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
  z-index: 0;
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
  z-index: 0;
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
  z-index: 2;
`

const PokemonImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`


const PokemonDataContainer = styled.section`
  display: flex;
  flex-direction: column;
`


const PokemonDataSection = ({
	id,
	image,
	name,
	speciesData
}: {
  id: number;
  image: string;
  name: string;
  speciesData: any;
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
			<PokemonLabel color={speciesData.color.name} style={{ y }}>
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

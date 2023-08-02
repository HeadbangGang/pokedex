import React from 'react'
import styled from 'styled-components'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

const CheckboxWrapper = styled(Checkbox.Root)`
     background-color: white;
  width: 25px;
  height: 25px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px var(--black-a7);

  &:hover {
  background-color: var(--violet-3);
}

&:focus {
  box-shadow: 0 0 0 2px black;
}
`

const Indicator = styled(Checkbox.Indicator)`
    color: var(--violet-11);
`

const Label = styled.label`
     color: white;
  padding-left: 15px;
  font-size: 15px;
  line-height: 1;
`

const Homepage = () => {
	return (
		<div>
			<CheckboxWrapper id='bleh'>
				<Indicator />
				<CheckIcon />
			</CheckboxWrapper>
			<Label className='Label' htmlFor='bleh'>
        Accept terms and conditions.
			</Label>
		</div>
	)
}

export default Homepage


// const CheckboxDemo = () => (
//     <form>
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
//           <Checkbox.Indicator className="CheckboxIndicator">
//             <CheckIcon />
//           </Checkbox.Indicator>
//         </Checkbox.Root>
//         <label className="Label" htmlFor="c1">
//           Accept terms and conditions.
//         </label>
//       </div>
//     </form>
//   );

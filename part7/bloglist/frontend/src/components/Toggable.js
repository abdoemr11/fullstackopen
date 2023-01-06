import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { MyButton } from './MyButton'
const Toggable = forwardRef((props, refs) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className={''+props.className}>
      <div style={hideWhenVisible}>
        <MyButton onClick={toggleVisibility} btnText={props.buttonLabel}/>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <MyButton onClick={toggleVisibility} btnText='cancel'/>
      </div>
    </div>
  )


})
Toggable.displayName = 'Toggable'
Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
export default Toggable
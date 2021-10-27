import React from 'react'
import './Button.css'

const Button = ({children,label, ...rest}) => {
    return (
<button className="nextbutton" {...rest}>
    {label}
</button>
        )
}

export default Button

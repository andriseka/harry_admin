import React from 'react'

const ButtonPrimary = (props) => {
    return (
        <div>
            <button className={`uk-button rounded-md bg-blue-400 hover:bg-blue-500 text-white hover:text-white`} type={props.type} onClick={props.onClick}>
                {props.name}
            </button>
        </div>
    )
}

export default ButtonPrimary

import React from 'react'

const ButtonDanger = (props) => {
    return (
        <div>
            <button className={`uk-button rounded-md bg-red-400 hover:bg-red-500 text-white hover:text-white`} type={props.type} onClick={props.onClick}>
                {props.name}
            </button>
        </div>
    )
}

export default ButtonDanger

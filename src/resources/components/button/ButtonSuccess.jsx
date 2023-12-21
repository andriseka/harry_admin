import React from 'react'

const ButtonSuccess = (props) => {
    return (
        <div>
            <button className={`uk-button rounded-md bg-green-500 hover:bg-green-600 text-white hover:text-white`} type={props.type} onClick={props.onClick}>
                {props.name}
            </button>
        </div>
    )
}

export default ButtonSuccess

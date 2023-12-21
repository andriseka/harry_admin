import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <div className="w-screen h-screen bg-black fixed top-0 right-0 opacity-50" style={{zIndex: "100"}}>
            <div className="w-full h-full flex justify-center items-center">
                <ReactLoading type="spinningBubbles" color="#FFFFFF" width={80} height={80} />
            </div>
        </div>
    )
}

export default Loading

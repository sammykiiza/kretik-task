import React from 'react'

function Spinner() {
    return (
        <div className={`h-full`}>
            <div className="flex justify-center items-center h-full">
                <img className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="spinner" />
            </div>
        </div>
    )
}

export default Spinner
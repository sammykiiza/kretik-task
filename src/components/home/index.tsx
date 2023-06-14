import React from 'react'
import AddItem from '../addItem'
import Items from '../items'

function Home() {
    return (
        <div>
            <div>
                <AddItem />
            </div>
            <div>
                <Items />
            </div>
        </div>
    )
}

export default Home
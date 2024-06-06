import { useState } from "react"
import React from 'react'

const Cart = () => {

    const [store, setStore] = useState(["book", "suger", "Food"]);
    const [purchased, setPurchased] = useState([])

const purchaseThis=(index)=>{

    const Good = store[index]; // Get the item at the given index
    console.log(Good)
setPurchased([...purchased, Good])
const update=[...store]
update.splice(index, 1)
setStore(update)
}

const returnThis=(index)=>{
    const Good = purchased[index]; // Get the item at the given index
    console.log(Good)
setStore([...store, Good])
const update=[...purchased]
update.splice(index, 1)
setPurchased(update)
}

    return (
        <div>
            <div id="one">
                {store.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={()=>purchaseThis(index)}>Purchase This</button>
                    </li>
                ))}
            </div>

            <br />
            <br />
            <br />

            <div id="two">
                {purchased.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={()=>returnThis(index)}>Return This</button>
                    </li>
                ))}
            </div>
        </div>
    )
}

export default Cart

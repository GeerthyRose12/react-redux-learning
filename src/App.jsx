import React from "react"

import {increment, decrement, reset } from "./features/counter/counterSlice"
import {useDispatch, useSelector} from "react-redux"
import Students from "./students"


function App () {
    const count = useSelector(
        (state) => state.counter.value  
    )
    const dispatch = useDispatch()
    return (
        <div style={{textAlign:"center", marginTop: "100px"}}>
            {/* <h1>Redux Counter</h1>
            <h2>Count: {count}</h2>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <button onClick={() => dispatch(reset())}>reset</button> */}
            <Students />
        </div>
    )
}
export default App
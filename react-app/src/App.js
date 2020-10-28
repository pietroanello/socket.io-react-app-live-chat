import React, { useState, useEffect } from "react"
import io from "socket.io-client"

const socket = io()

function App() {
    const [name, setName] = useState("")

    function handleSubmit(event) {
        event.preventDefault()
        socket.emit("sendData", name)
    }

    function handleChange(event) {
        const { value } = event.target
        setName(value)
    }

    return (
        <div>
            <h1>My React App</h1>
            <h3>My name is {name}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='name'
                    placeholder='Your Name'
                    onChange={handleChange}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default App

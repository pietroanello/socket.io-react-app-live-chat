import React, { useState, useEffect } from "react"
import io from "socket.io-client"

const socket = io()

function App() {
    const [username, setUsername] = useState("")
    const [usersConnected, setUsersConnected] = useState(0)
    const [msg, setMsg] = useState("")
    const [finalMsg, setFinalMsg] = useState("")
    const [chat, setChat] = useState([])

    useEffect(() => {
        socket.on("msgData", data => {
            setMsg("")
            setChat(prevChat => {
                let newArr = prevChat.concat(data)
                return newArr
            })
        })
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        setFinalMsg(msg)
        socket.emit("sendMsg", { name: username, msg: msg })
    }

    function handleChange(event) {
        const { value, name } = event.target
        name === "username" ? setUsername(value) : setMsg(value)
    }

    return (
        <div>
            <h1 className='title'>socket.io live chat</h1>
            <div className='main-container'>
                <p>
                    <span className='connected-users'></span>
                    connected {usersConnected > 1 ? "users" : "user"}
                </p>
                <div className='chat-container'>
                    {chat.map(user => (
                        <p key={user.name + user.msg}>
                            <span>{user.name}: </span>
                            {user.msg}
                        </p>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type='name'
                        name='username'
                        className='username'
                        placeholder='Your Username'
                        value={username}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        className='usermessage'
                        name='msg'
                        placeholder='Type your message...'
                        value={msg}
                        onChange={handleChange}
                    />
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}

export default App

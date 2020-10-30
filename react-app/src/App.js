import React, { useState, useEffect } from "react"
import io from "socket.io-client"

const socket = io()

function App() {
    const [username, setUsername] = useState("")
    const [usersConnected, setUsersConnected] = useState(0)
    const [msg, setMsg] = useState("")
    const [chat, setChat] = useState([])

    useEffect(() => {
        socket.on("msgData", data => {
            setMsg("")
            setChat(prevChat => {
                let newArr = prevChat.concat(data)
                return newArr
            })
        })
        socket.on("userNumber", data => {
            setUsersConnected(data)
        })
        socket.on("disconnect", () => {
            console.log("disconnected")
            socket.close()
        })
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        socket.emit("sendMsg", { name: username, msg: msg })
    }

    function handleChange(event) {
        const { value, name } = event.target
        name === "username" ? setUsername(value) : setMsg(value)
    }

    return (
        <>
            <h1 className='title'>socket.io live chat</h1>
            <div className='main-container'>
                <div className='chat-container'>
                    <p className='users-count'>
                        <span className='connected-users'>
                            {usersConnected}{" "}
                        </span>
                        connected {usersConnected > 1 ? "users" : "user"}
                    </p>
                    <div className='messages-container'>
                        {chat.map(user => (
                            <p key={user.name + user.msg}>
                                <span>{user.name}: </span>
                                {user.msg}
                            </p>
                        ))}
                    </div>
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
                    <button onClick={handleSubmit}>Send</button>
                </div>
            </div>
            <p className='credits'>
                For the love of learning
                <span>
                    <a
                        href='https://github.com/pietroanello/socket.io-react-app-live-chat'
                        target='_blank'
                    >
                        <img src='github-logo-small.svg' alt='github logo' />
                    </a>
                </span>
            </p>
        </>
    )
}

export default App

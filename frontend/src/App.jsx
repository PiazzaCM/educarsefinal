import { useEffect, useReducer, useState } from "react"
import { UserContext } from "./context/UserContext"
import { AppRoutes } from "./router/AppRoutes"
import { userReducer } from "./context/userReducer"
import io from 'socket.io-client';

const socket = io('http://localhost:3000')

function App() {

  const getUser = () => JSON.parse(localStorage.getItem('user')) || { logged: false };

  const [userState, userDispatch] = useReducer(userReducer, {}, getUser);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const peticion = await fetch('http://localhost:3000/post');

    const payload = await peticion.json();

    if (peticion.ok) {
      return setPosts(payload)
    }
  };

  useEffect(()=>{
      getPosts()
  },[])

  useEffect(()=>{
    socket.on('new_posts', (data) => {
      setPosts(valorPrevio => [...valorPrevio, data])
    });

    return () => socket.off('new_posts');
  },[])

  return (
    <>
      <UserContext.Provider value={{userState, userDispatch, posts, setPosts, socket}}>
        <AppRoutes />
      </UserContext.Provider>
    </>
  )
}

export default App

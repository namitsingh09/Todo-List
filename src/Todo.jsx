import "./todo.css"


import React from 'react';
import Card from "./Card";
import { useState } from "react";
import axios from 'axios';
import  {  useEffect } from 'react';

const Todo = () => {
  
  const [todo, setTodo] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const [todoss, setTodoss] = useState([]);
  const [errorr, setErrorr] = useState(null);


  const fetchData = async () => {
    try {
      const { data } = await axios.get("https://shine-free-paw.glitch.me/posts");
      setTodoss(data);
    } catch (err) {
      setError(err);
    }
  };
  useEffect(() => {
    axios
      .get("https://shine-free-paw.glitch.me/posts")
      .then((response) => {
        setTodoss(response.data);
        
        
      })
      
      .catch((err) => {
       
        setErrorr(err);
      });
  }, [todo]);
  

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("https://shine-free-paw.glitch.me/posts" , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo }),
      });
      const json = await res.json();
      setResponse(json);
      return alert("Success!");
    } catch (err) {
      setError(err);
    }
  };
    return (
        <div className="ko">
            <form onSubmit={handleSubmit}>
            <div id="myDIV" class="header">
  <h2>Todo-List</h2>
 
  <input type="text" value={todo} onChange={(event) => setTodo(event.target.value)} id="myInput" placeholder="Add a New Task" />
  <button className="addBtn" type="submit">+</button>
     
</div>

<ul id="myUL">
  
  <>
{todoss.map((todo, isHidden) => (
  
  <li  key={todo.id}class="">{todo.todo} </li> 

  
  ))}
  

  </>
</ul> 
</form>
<button id="ui" onClick={fetchData}>Refresh</button>

        </div>
    );
}

export default Todo;

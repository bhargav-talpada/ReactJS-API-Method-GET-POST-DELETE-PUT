import './App.css';
import React,{ useEffect, useId, useState } from 'react';
import {Router, Link} from "react-router-dom"

function App() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [city, setCity] = useState('')
  const [fedata, setFedata] = useState([])
  const [userId, setUserId] = useState(null)

  // .....POST Fetch Method for API.....
  // function SaveUser(){
  //   console.log({name,surname,email,age,city})
  //   let data = {name,surname,email,age,city}
  //   fetch('http://localhost:8000/user',{
  //     method: 'POST',
  //     headers:{
  //       'Accept':'application/json',
  //       'Content-type':'application/json'
  //     },
  //     body:JSON.stringify(data)
  //   }).then((result)=>{
  //     result.json().then((res)=>{
  //       console.log("Response", res)
  //     })
  //   })
    
  // }

  //.....GET Fetch Method for API.....
  useEffect(()=>{
    getData()
  },[])
  function getData(){
    fetch('http://localhost:8000/user').then((resu)=>{
    resu.json().then((res)=>{
      setFedata(res)
      setUserId(res[0].id)
      setName(res[0].name)
      setSurname(res[0].surname)
      setEmail(res[0].email)
      setAge(res[0].age)
      setCity(res[0].city)
    })
  })
  }
  
  //.....DELETE Fetch Method for API.....
  function deleteUser(id){
    fetch(`http://localhost:8000/user/${id}`,{
      method:"DELETE"
    }).then((result)=>{
      result.json().then((res1)=>{
        console.log(res1)
        getData()
      })
    })
  }

  //.....filled data form for API.....
  function selectUser(id){
    // console.log(fedata[id-1])
    setUserId(fedata[id-1].id)
    setName(fedata[id-1].name)
    setSurname(fedata[id-1].surname)
    setEmail(fedata[id-1].email)
    setAge(fedata[id-1].age)
    setCity(fedata[id-1].city)
  }

    //.....Update(PUT) Fetch Method for API.....
  function updateUser(){
    let item = {userId,name,surname,email,age,city}
    fetch(`http://localhost:8000/user/${userId}`,{
      method:'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result=>{
      result.json().then((res)=>{
        console.log(res)
        getData()
      })
    }))
  }
  return (
    <>
      {/*.....POST Fetch Method for API.....
       <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}} name='name' placeholder='Name'></input><br/>
      <input type='text' value={surname} onChange={(e)=>{setSurname(e.target.value)}} name='surname' placeholder='Surname'></input><br/>
      <input type='text' value={email} onChange={(e)=>{setEmail(e.target.value)}} name='email' placeholder='Email'></input><br/>
      <input type='text' value={age} onChange={(e)=>{setAge(e.target.value)}} name='age' placeholder='Age'></input><br/>
      <input type='text' value={city} onChange={(e)=>{setCity(e.target.value)}} name='city' placeholder='City'></input><br/>
      <button type='button' onClick={SaveUser}>Save USer</button> */}


      {/* .....GET & DELETE Fetch Method for API..... */}
      <table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Age</th>
          <th>City</th>
          <th colSpan={2}>Action</th>
        </tr>
        {
          fedata.map((item)=>{
            return (
              <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>{item.city}</td>
              <td><button onClick={()=>deleteUser(item.id)}>Delete</button></td>
              <td><button onClick={()=>selectUser(item.id)}>Update</button></td>
            </tr>
            )
          }
           
          )
        }
      </table>
      <div>
      {/* .....Prifilled Form and Update Fetch Method for API..... */}
        <form>
          {/* <input type='text' value={id} onChange={(e)=>setUserId(e.target.value)} placeholder='Id'></input><br/> */}
          <input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name'></input><br/>
          <input type='text' value={surname} onChange={(e)=>setSurname(e.target.value)} placeholder='Surname'></input><br/>
          <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'></input><br/>
          <input type='text' value={age} onChange={(e)=>setAge(e.target.value)} placeholder='Age'></input><br/>
          <input type='text' value={city} onChange={(e)=>setCity(e.target.value)} placeholder='City'></input><br/>
          <button type='button' onClick={updateUser}>Update User</button>
        </form>
      </div>

    </>
  );
}

export default App;

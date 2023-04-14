import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Homepage.css'
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const[firstName,setFirstName]=useState("")
    const[lastName,setLastName]=useState("")
    const[error,setError]=useState("")
    const navigate=useNavigate()
    const onSubmitHandler=(e)=>{
        e.preventDefault()
        console.log(firstName);
        console.log(lastName);

        if(firstName===""){
            setError("FirstName cannot be empty")
        }
        else if(lastName===""){
            setError("LastName cannot be empty")
        }
        else{
           
            setError("")  
            localStorage.setItem("fullName",JSON.stringify({firstName:firstName,lastName:lastName}));
            navigate("/comment")

        }


    }
  return (
    <>
    <div >
    <Form className="formBox" onSubmit={(e)=>{onSubmitHandler(e)}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>FirstName</Form.Label>
        <Form.Control type="text" placeholder="Enter FirstName" onChange={(e)=>setFirstName(e.target.value)} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>LastName</Form.Label>
        <Form.Control type="text" placeholder="Enter LastName"  onChange={(e)=>setLastName(e.target.value)}  />
      </Form.Group>
      <p className="error">{error}</p>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </>
  );
};

export default HomePage;

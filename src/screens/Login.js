import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'


export default function Signup() {
    const [credentials , setCredentials] = useState({name:"",email:"",password:"",geolocation:""})
    let navigate=useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await fetch("http://localhost:5000/api/loginuser", {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  name: credentials.name,
                  email: credentials.email,
                  password: credentials.password,
                  location: credentials.geolocation
              })
          });
  
          const json = await response.json(); // Wait for the JSON parsing
  
          console.log(json);
          
          if (!json.success) {
              alert("Enter valid credentials");
          }
          if(json.success){
          localStorage.setItem("userEmail",credentials.email)

            localStorage.setItem("authToken",json.authToken)
            console.log(localStorage.getItem("authToken"))

            navigate("/")

          }
      } catch (error) {
          console.error("Error during fetch:", error);
      }
  }
  
    const onChange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <>
    <div className='container'>
    <form onSubmit={handleSubmit}>
  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value ={credentials.password} onChange={onChange}/>
  </div>
  
  
  <button type="submit" className=" m-3 btn btn-success">Submit</button>
  <Link to ='/createuser' className="m-3 btn btn-danger">Iam New User</Link>
</form>
</div>
    </>
  )
}


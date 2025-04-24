import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
export default function Login(){
  const loginUrl = 'http://localhost:4000/api/v1/login';
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const navigate = useNavigate();
  const login = (identifier, password) => { 
    fetch(loginUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ "user": { 'identifier' : identifier,'password' :  password } })
    }).then(async (response) => {
      console.log('success-------------------', response.ok)
      if (!response.ok) {
        const errorData = await response.json();
        console.log('::::::::::::', errors)
        setErrors( errorData.errors)
        setSuccess("")
      } else{
          setErrors({})
          setSuccess('Logged In Successfully')
          let token = response.headers.get('Authorization')
          localStorage.setItem('token', token)
          navigate('/')
      }
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    login(identifier, password)
  }

  return (
<form onSubmit={(e)=>{handleSubmit(e)}}>
  <div className="form-group">
    <label for="exampleInputEmail1">Email or Mobile Number</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email or mobile number" onChange={(e)=>{setIdentifier(e.target.value)}}/>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  )
}
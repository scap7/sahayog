import { useState, useEffect } from "react"

export default function Signup() {
  const signupUrl = 'http://localhost:4000/api/v1/signup';
  const verifyOtpUrl = 'http://localhost:4000/api/v1/verify_otp';
  const setPasswordUrl = 'http://localhost:4000/api/v1/set_password';
  // const signUpUrl = 'http://localhost:4000/api/v1/signUp';
  // const logoutUrl = 'http://localhost:4000/api/v1/logout';
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('show email_or_mobile_no');
  const [otp, setOtp] = useState();
  const [userId, setUserId] = useState();
  // useEffect(()=>{
  //   if(Object.keys(formData).length){
  //     signUp(identifier, password);
  //   }
  // }, [formData])
  const signUp = (identifier, password) => {
    
      fetch(signupUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ "user": { identifier, password } })
      }).then(async (response) => {
        console.log('success-------------------', response.ok)
        if (!response.ok) {
          const errorData = await response.json();
          console.log('::::::::::::', errors)
          setErrors( errorData.errors)
          setSuccess("show email_or_mobile_no")
        } else if(response.ok){
          const data = await response.json();
            console.log('success-------------------', data)
            setErrors({})
            setSuccess('Please Verify OTP')
            setUserId(data.id)
        }
      })
  }
  const verifyOtp = (otp) =>{
    console.log(userId)
    fetch(verifyOtpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      credentials: "include",
      body: JSON.stringify({"otp": otp, "id": userId})
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        console.log('::::::::::::', errors)
        setErrors( errorData.errors)
        setSuccess("Please Verify OTP")
      } else if(response.ok){
          const data = await response.json();
          console.log('success-------------------', data)
          setErrors({})
          setSuccess('Set Password')
          localStorage.setItem("token", data.token)
      }
    })
  }

  const makePassword = () =>{
    fetch(setPasswordUrl, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      credentials: "include",
      body: JSON.stringify({'password': password})
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        console.log('::::::::::::', errors)
        setErrors( errorData.errors)
        setSuccess("Set Password")
      } else if(response.ok){
          const data = await response.json();
          console.log('success-------------------', data)
          setErrors({})
          setSuccess('Password created successfully')
      }
    })
  }
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};
    // console.log([...e.target.elements]);
    [...e.target.elements].forEach((q, index) => {
      if(q.name){
        // console.log(q.name, index)
        data[q.name] = q.value
      }
    });
    setFormData(data)
    if(success == 'Please Verify OTP'){
      verifyOtp(otp)
    }else if(success == 'show email_or_mobile_no'){
      signUp(identifier, password);
    }else if(success == 'Set Password'){
      makePassword()
    }
    // signUp(identifier, password);
  }
  return (
    <div className="container mt-5 d-flex justify-content-center">      
      <div className={`col-6 text-white p-5 ${success == 'Password created successfully' ? 'bg-light' : 'bg-dark'}`}>
        {success == 'Password created successfully' ? (<span className="text-center text-success">User Created Successfully</span>): (
        <form action="api/v1/signup" method="post" onSubmit={(e) => { handleSubmit(e) }} className="needs-validation" noValidate>
        {success == "show email_or_mobile_no" && (
          <div className="row">
            <div className="col-4">
              <label htmlFor="" className="">Email or Mobile No.</label>
            </div>
            <div className="col-8">
              <input name="identifier" type="text" className="form-control" placeholder="email or mobile no." onChange={(e) => { setIdentifier(e.target.value) }} required />

              {errors.email && (
                <span className="d-block text-start text-danger">
                  {errors.email && `email ${errors.email.join(', ')}`}
                  {errors.mobile_no && `mobile no. ${errors.mobile_no.join(', ')}`}
                </span>
              )}
            </div>
          </div>
        )}
        {success == 'Please Verify OTP' && (
        <div className="row  mt-3">
          <div className="col-4">
            <label htmlFor="" className="">OTP</label>
          </div>
          <div className="col-8">
            <input name="otp" type="text" className="form-control" placeholder="OTP" onChange={(e) => { setOtp(e.target.value) }} required />
            {errors.email && (
              <span className="d-block text-start text-danger">
                {errors.otp && `OTP ${errors.otp.join(', ')}`}
              </span>
            )}
          </div>
        </div>
        )}
          
          { success == 'Set Password' &&
          <div className="row  mt-3">
            <div className="col-4">
              <label htmlFor="" className="">Password</label>
            </div>
            <div className="col-8">
              <input name="password" type="password" className="form-control" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} required />
            </div>
          </div>
          }
          <div className="row justify-content-center mt-5">
            <div className="col-4">
              {success != 'Password created successfully' && <input type="submit" value="sumbit" className="form-control btn btn-success" />}
            </div>
          </div>
        </form>
        )}
      </div>
    </div>
  )
}

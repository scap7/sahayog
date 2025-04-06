export default function Signup(){
  return(
  <div className="container mt-5 d-flex justify-content-center">
    <div className="col-6 bg-dark text-white p-5">
      <form action="api/v1/users" method="post">
    <div className="row">
      <div className="col-4">
        <label htmlFor="" className="">Email</label>
      </div>
      <div className="col-8">
        <input name="email" type="text" className="form-control" required/>
      </div>
    </div>
    <div className="row justify-content-center mt-5">
      <div className="col-4">
        <input type="submit" value="sumbit" className="form-control btn btn-success"/> 
      </div>
    </div>
    </form>
    </div>
  </div>
  )
}

import { useState } from "react";
import "./Login.css";
import axios from "axios";

function Signup(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(){
        if(name==="" || email==="" || password==="" || confirmPassword===""){
            alert("All Fields are Required");
        }
        else if(password!==confirmPassword){
            alert("Password must be Same");
        }
        else{
            await axios.post(process.env.REACT_APP_BASE_URL+'/signup', {name, email, password, confirmPassword})
            .then((res)=>{
                alert(res?.data?.message);
            }).catch((error)=>{
                alert(error?.response?.data?.message);
            })
        }
    }

    return(
        <div className="admissionForm-main-div">
            <div className="web-heading">Sign Up</div>
            <div className="form-outer-div">
                <div className="form-main-div">
                    <div className="form-elements">
                        <label className="label1">Name: </label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} className="input1" type="text"/>
                    </div>
                    <div className="form-elements">
                        <label className="label1" htmlFor="email">Email: </label>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="input1" type="text"/>
                    </div>
                    <div className="form-elements">
                        <label className="label1" htmlFor="email">Password: </label>
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} className="input1" type="password"/>
                    </div>
                    <div className="form-elements">
                        <label className="label1" htmlFor="email">Confirm Password: </label>
                        <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="input1" type="password"/>
                    </div>
                    <div className="form-elements">
                        <button onClick={handleSubmit} className="btn">SignUp</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup;
import { useContext, useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { Context } from "../../utils/Context";
import { useNavigate } from "react-router-dom";

function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {loginInfo, setLoginInfo} = useContext(Context);
    const navigate = useNavigate();

    async function handleSubmit(){
        if(email==="" || password===""){
            alert("All Fields are Required");
        }
        else{
            await axios.post(process.env.REACT_APP_BASE_URL+'/login', {email, password})
            .then((res)=>{
                setLoginInfo({status: true, email: res?.data?.user?.email, name: res?.data?.user?.name, role: res?.data?.user?.role})
                alert(res?.data?.message);
                navigate("/")
            }).catch((error)=>{
                alert(error?.response?.data?.message);
            })
        }
    }

    return(
        <div className="admissionForm-main-div">
            <div className="web-heading">Login</div>
            <div className="form-outer-div">
                <div className="form-main-div">
                    <div className="form-elements">
                        <label className="label1">Email: </label>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="input1" type="text"/>
                    </div>
                    <div className="form-elements">
                        <label className="label1">Password: </label>
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} className="input1" type="password"/>
                    </div>
                    <div className="form-elements">
                        <button onClick={handleSubmit} className="btn">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;
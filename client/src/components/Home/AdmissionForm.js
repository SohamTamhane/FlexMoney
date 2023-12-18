import { useContext, useEffect, useState } from "react";
import "./AdmissionForm.css";
import { Context } from "../../utils/Context";
import axios from "axios";

function AdmissionForm(){
    
    let d1 = new Date();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [age, setAge] = useState("");
    const [month, setMonth] = useState(d1.toLocaleString('default', { month: 'long' }));
    const [year, setYear] = useState(d1.getUTCFullYear());
    const [batch, setBatch] = useState("select batch");

    const {loginInfo} = useContext(Context);
    const [user, setUser] = useState(undefined);


    async function handleSubmit(){
        // let date1 = new Date(month);
        // let date2 = new Date();

        if(name==="" || email==="" || mobile==="" || age==="" || month==="" || batch==="" || batch==="select batch"){
            alert("All Fields are Required");
        }
        else if(age<18 || age>65){
            alert("Age limit of 18-65");
        }
        // else if(date2.getFullYear()>date1.getFullYear()){
        //     alert("Please Select Appropriate Date of Yoga Class");
        // }
        // else if(date2.getMonth()+1 > date1.getMonth()+1){
        //     if(date2.getFullYear()>=date1.getFullYear()){
        //         alert("Please Select Appropriate Date of Yoga Class");
        //     }
        //     else{
        //         await axios.post(process.env.REACT_APP_BASE_URL+'/admission', {role: loginInfo.role, name, email, age, mobile, month: (date1.getMonth()+1), year: date1.getFullYear(), batch})
        //         .then((res)=>{
        //             alert(res?.data?.message);
        //         }).catch((error)=>{
        //             alert(error?.response?.data?.message);
        //         })
        //     }
        // }
        else{
            await axios.post(process.env.REACT_APP_BASE_URL+'/admission', {role: loginInfo.role, name, email, age, mobile, month: d1.toLocaleString('default', { month: 'long' }), year: d1.getFullYear(), batch})
            .then((res)=>{
                alert(res?.data?.message);
            }).catch((error)=>{
                alert(error?.response?.data?.message);
            })
        }
    }

    async function getUserDetails(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/user', {role: loginInfo.role, email: loginInfo.email})
        .then((res)=>{
            setUser(res?.data?.user);
        }).catch((error)=>{
            alert(error?.response?.data?.message);
        })
    }

    useEffect(()=>{
        getUserDetails();
    }, [])

    useEffect(()=>{
        setName(user?.name);
        setEmail(user?.email);
        if(user?.batch && user?.mobile && user?.age){
            setMobile(user?.mobile);
            setAge(user?.age);
            setBatch(user?.batch);
        }
    }, [user])


    return(
        <div className="admissionForm-main-div">
            <div className="web-heading">Admission Form</div>
            <div className="form-outer-div">
                <div className="form-main-div">
                    <div className="form-elements">
                        <label className="label1" htmlFor="name">Name: </label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} className="input1" type="text" name="name"/>
                    </div>
                    <div className="form-elements">
                        <label className="label1" htmlFor="email">Email: </label>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="input1" type="text" name="email"/>
                    </div>
                    <div className="form-elements">
                        <label className="label1">Mobile No: </label>
                        <input value={mobile} onChange={(e)=>setMobile(e.target.value)} className="input1" type="number"/>
                    </div>
                    <div className="form-elements">
                        <label className="label1">Age: </label>
                        <input value={age} onChange={(e)=>setAge(e.target.value)} className="input1" type="number"/>
                    </div>
                    <div className="form-elements">
                        <label className="label1">Month: </label>
                        <label className="label1">{month}, {year} </label>
                    </div>
                    <div className="form-elements">
                        <label className="label1">Select Your Batch: </label>
                        <select  value={batch} onChange={(e)=>setBatch(e.target.value)}>
                            <option className="input1" value="select batch">Select Batch</option>
                            <option className="input1" value="6-7AM">6-7AM</option>
                            <option className="input1" value="7-8AM">7-8AM</option>
                            <option className="input1" value="8-9AM">8-9AM</option>
                            <option className="input1" value="5-6PM">5-6PM</option>
                        </select>
                    </div>
                    <div className="form-elements">
                        <button onClick={handleSubmit} className="btn">Make Payment and Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdmissionForm;
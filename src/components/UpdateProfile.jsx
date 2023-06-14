import { Formik } from "formik";
import React from "react";
import Link from "next/link";
import http from "@/helpers/http";
import * as Yup from "yup";
import PropTypes from "prop-types";
import {MdError} from "react-icons/md";
import { useDispatch } from "react-redux";
import { setProfile } from "@/redux/reducers/profile";

const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid"),
    firstname: Yup.string().min(3, "Must have 3 caracters"),
    lastname: Yup.string().min(3, "Must have 3 caracters")
});

function UpdateProfile(props) {
    const dispatch = useDispatch();
    const { token, onSave } = props;
    const [errorMessage, setErrorMessage]= React.useState("");
    const [successMessage, setSuccessMassage] = React.useState(true);
    
    const doUpdateData = async(values)=>{
        setErrorMessage("");

        let fullName;
        if(values.lastName === ""){
            fullName = values.firstname;
        }else if(values.firstname === ""){
            setErrorMessage("Input firstname first!");
        }else{
            fullName = values.firstname + " " + values.lastname;
        }

        console.log(fullName);
        console.log(values.email);
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", values.email);

        const {data} = await http(token).patch("/profile", formData);
        if(data.results){
            dispatch(setProfile(data.results));
            setSuccessMassage(false);
        }
        
    };

    React.useEffect(()=>{
        function doUpdateData(data){
            onSave(data);
        }
        doUpdateData(successMessage);
    },[successMessage, onSave]);
    
    return (
        <Formik
            initialValues={{ 
                firstname: "",
                lastname: "",
                email: "" }}
            validationSchema = {validationSchema}
            onSubmit={doUpdateData}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            })=>(
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <button type="submit" className="flex gap-2 px-6 font-[500] text-md text-warning hover:text-primary justify-end items-center">Save</button>
                    {errorMessage && (<div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg"><MdError size={30}/>{errorMessage}</div>)}
                    <div className="flex items-center shadow-lg p-4 rounded-xl">
                        <div className="flex flex-col gap-2">
                            <label className="text-md">Firstname</label>
                            <input 
                                type="text" 
                                name= "firstname"
                                placeholder="Enter your firstname" 
                                className={`border-b-2 outline-none h-12 ${errors.firstname && touched.firstname && "border-error"} w-full font-[500] text-secondary text-xl`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstname}
                            />
                            {errors.firstname && touched.firstname && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.firstname}</span>
                                </label>)
                            }
                            
                        </div>
                    </div>
                    <div className="flex items-center shadow-lg p-4 rounded-xl">
                        <div className="flex flex-col gap-2">
                            <label className="text-md">Lastname</label>
                            <input 
                                type="text" 
                                name= "lastname"
                                placeholder="Enter your lastname" 
                                className={`border-b-2 outline-none h-12 ${errors.lastname && touched.lastname && "border-error"} w-full font-[500] text-secondary text-xl`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastname}
                            />
                            {errors.lastname && touched.lastname && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.lastname}</span>
                                </label>)
                            }
                        </div>
                    </div>
                    <div className="flex items-center shadow-lg p-4 rounded-xl">
                        <div className="flex flex-col gap-2">
                            <label className="text-md">Verified E-mail</label>
                            <input 
                                type="email" 
                                name= "email"
                                placeholder="Enter your email" 
                                className={`border-b-2 outline-none h-12 ${errors.email && touched.email && "border-error"} w-full font-[500] text-secondary text-xl`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {errors.email && touched.email && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.email}</span>
                                </label>)
                            }
                        </div>
                    </div>
                    <div className="flex justify-between items-center shadow-lg p-4 rounded-xl">
                        <div className="flex flex-col gap-2">
                            <label className="text-md">Phone Number</label>
                            <label className="font-[500] text-xl text-secondary">+628123456789</label>
                        </div>
                        <Link href="/profile/personal-information/phoneNumber-manage" className="font-[500] text-warning hover:text-primary text-md px-6">Manage</Link>
                    </div>
                </form>
            )}
        </Formik>
    );
}
UpdateProfile.propTypes = {
    onSave: PropTypes.func,
};

export default UpdateProfile;
import React from "react";
import Head from "next/head";
import {MdOutlineLogout} from "react-icons/md";
import {LuLayoutDashboard} from "react-icons/lu";
import {AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser} from "react-icons/ai";
import {RiLockPasswordLine} from "react-icons/ri";
import Link from "next/link";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {MdError, MdCheckCircle} from "react-icons/md";
import { Formik } from "formik";
import * as Yup from "yup";

import { withIronSessionSsr } from "iron-session/next";
import coockieConfig from "@/helpers/cookieConfig";
import axios from "axios";
import Header from "@/components/Header";
import { useRouter } from "next/router";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token;
 
        if(!token) {
            res.setHeader("location", "/auth/login");
            res.statusCode = 302;
            res.end();
            return {
                prop: {}
            };
        }
        return {
            props: {
                token,
            },
        };
        
    },
    coockieConfig
);

const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Password is invalid"),
    newPassword: Yup.string().min(8, "must have input 8 characters").required("Password is invalid"),
    confirmPassword: Yup.string()
        .required("Confirm password is empty !")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

function ChangePassword({token}) {
    
    const [loading, setLoading] = React.useState(false);
    const [showEye, setShowEye] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [eye, setEye] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");

    const router = useRouter();
    const doLogout = async()=>{
        await axios.get("/api/logout");
        router.replace("/auth/login");
    };

    const doChangePassword = async (values)=>{
        setErrorMessage("");
        setSuccessMessage("");
        setLoading(true);
        const form = new URLSearchParams({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword
        }).toString();

        const {data} = await axios.patch("https://cute-lime-goldfish-toga.cyclic.app/profile/change-password", form, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${token}`
            }
        });
        console.log(data.success);
        if(data.success === false){
            setErrorMessage("Old password is wrong");
            setLoading(false);
        }
        if(data.success === true){
            setSuccessMessage("Change password success");
            setLoading(false);
        }
    };

    const doShowEye = ()=>{
        setShowEye(!showEye);
    };

    const openEye = ()=>{
        setOpen(!open);
    };

    const eyeOpen = ()=>{
        setEye(!eye);
    };
    return (
        <div>
            <Head>
                <title>ZIPay | Change Password</title>
            </Head>
            <Header token={token}/>
            <div className="flex gap-6 px-[6%] py-16">
                <aside className="hidden lg:flex flex-col bg-white pr-[2%] py-10 w-96 justify-between rounded-3xl shadow-lg">
                    <div className="flex flex-col gap-11">
                        <div className="flex items-center gap-10">
                            <div className="bg-white text-white w-1">.</div>
                            <div className="flex gap-6 text-accent hover:text-primary">
                                <LuLayoutDashboard size={30}/>
                                <Link href="/home" className="font-[500] text-xl">Dasboard</Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-10">
                            <div className="bg-white text-white w-1">.</div>
                            <div className="flex gap-6 text-accent hover:text-primary">
                                <AiOutlineArrowUp size={30}/>
                                <Link href="/transfer" className="font-[500] text-xl">Transfer</Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-10">
                            <div className="bg-white text-white w-1">.</div>
                            <div className="flex gap-6 text-accent hover:text-primary">
                                <AiOutlinePlus size={30}/>
                                <Link href="" className="font-[500] text-xl">Top Up</Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-10">
                            <div className="bg-primary w-1">.</div>
                            <div className="flex gap-6 text-primary">
                                <AiOutlineUser size={30}/>
                                <Link href="/profile" className="font-[500] text-xl">Profile</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-10">
                        <div className="bg-white text-white w-1">.</div>
                        <div className="flex gap-6 text-accent hover:text-primary">
                            <MdOutlineLogout size={30}/>
                            <button onClick={()=>window.my_modal_5.showModal()} className="font-[500] text-xl">Log Out</button>
                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                <form method="dialog" className="modal-box">
                                    <h3 className="font-bold text-lg">Log Out</h3>
                                    <p className="py-4">Are you sure you want to logout?</p>
                                    <div className="modal-action">
                                        <button type="button" onClick={doLogout} className="btn btn-error">Ok</button>
                                        <button className="btn">Close</button>
                                    </div>
                                </form>
                            </dialog>
                        </div>
                    </div>
                </aside>
                <div className="flex flex-col w-full h-[622px] rounded-3xl shadow-lg bg-white p-6 gap-10">
                    <div className="flex flex-col w-full gap-2 relative">
                        <label className="font-[500] text-primary text-xl">Change Password</label>
                    </div>
                    <div>
                        <p className="pr-[20%] md:pr-[50%]">You must enter your current password and then type your new password twice.</p>
                    </div>
                    <Formik
                        initialValues={{ 
                            oldPassword: "", 
                            newPassword: "",
                            confirmPassword: "" }}

                        validationSchema = {validationSchema}
                        onSubmit={doChangePassword}    
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        })=>(
                            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10 px-[10%] md:px-[30%] justify-center">
                                {errorMessage && (<div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg"><MdError size={30}/>{errorMessage}</div>)}
                                {successMessage && (<div className="flex flex-row justify-center alert alert-success shadow-lg text-white text-lg"><MdCheckCircle size={30}/>{successMessage}</div>)}
                                <div className='flex gap-3 justify-between items-center'>
                                    <div className="relative flex flex-col form-control w-full">
                                        <RiLockPasswordLine className={`absolute left-2 top-2 ${errors.oldPassword && touched.oldPassword && "text-error"}`} size={26}/>
                                        <input 
                                            type={eye ? "text" : "Password"} 
                                            name= "oldPassword"
                                            placeholder="Enter your old password" 
                                            className={`border-b-2 outline-none h-12 ${errors.oldPassword && touched.oldPassword && "border-error"} bg-white w-full px-12`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.oldPassword}
                                        />
                                        {errors.oldPassword && touched.oldPassword && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.oldPassword}</span>
                                            </label>)
                                        }
                                        <button type="button" onClick={eyeOpen}>
                                            {eye ? (<FiEyeOff size={23} className="absolute top-3 right-5" />) :
                                                (<FiEye size={23} className="absolute top-3 right-5" />)
                                            }
                                                    
                                        </button>
                                    </div>
                                </div>
                                <div className='flex gap-3 justify-between items-center'>
                                    <div className="relative flex flex-col form-control w-full">
                                        <RiLockPasswordLine className={`absolute left-2 top-2 ${errors.newPassword && touched.newPassword && "text-error"}`} size={26}/>
                                        <input 
                                            type={open ? "text" : "Password"} 
                                            name= "newPassword"
                                            placeholder="Enter your new password" 
                                            className={`border-b-2 outline-none h-12 ${errors.newPassword && touched.newPassword && "border-error"} bg-white w-full px-12`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.newPassword}
                                        />
                                        {errors.newPassword && touched.newPassword && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.newPassword}</span>
                                            </label>)
                                        }
                                        <button type="button" onClick={openEye}>
                                            {open ? (<FiEyeOff size={23} className="absolute top-3 right-5" />) :
                                                (<FiEye size={23} className="absolute top-3 right-5" />)
                                            }
                                                    
                                        </button>
                                    </div>
                                </div>
                                <div className='flex gap-3 justify-between items-center'>
                                    <div className="relative flex flex-col form-control w-full">
                                        <RiLockPasswordLine className={`absolute left-2 top-2 ${errors.confirmPassword && touched.confirmPassword && "text-error"}`} size={26}/>
                                        <input 
                                            type={showEye ? "text" : "Password"} 
                                            name= "confirmPassword"
                                            placeholder="Enter your confirm password" 
                                            className={`border-b-2 outline-none h-12 ${errors.confirmPassword && touched.confirmPassword && "border-error"} bg-white w-full px-12`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.confirmPassword}
                                        />
                                        {errors.confirmPassword && touched.confirmPassword && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                                            </label>)
                                        }
                                        <button type="button" onClick={doShowEye}>
                                            {showEye ? (<FiEyeOff size={23} className="absolute top-3 right-5" />) :
                                                (<FiEye size={23} className="absolute top-3 right-5" />)
                                            }
                                        </button>
                                    </div>
                                </div>
                                {loading ? (<button className="btn btn-primary normal-case text-white"><span className="loading loading-spinner loading-sm"></span></button>) :
                                    (<button className="btn btn-primary normal-case text-white">change Password</button>) }
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
            <footer className="flex flex-col md:flex-row gap-6 justify-between bg-secondary px-[8%] py-6">
                <label className="font-[500] text-white">2020 ZIPay. All right reserved.</label>
                <div className="flex flex-col md:flex-row justify-between md:items-center font-[500] text-white md:gap-6">
                    <label>+62 5637 8882 9901</label>
                    <label>contact@zipay.com</label>
                </div>
            </footer>
        </div>
    );
};

export default ChangePassword;
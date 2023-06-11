import React from "react";
import Image from "next/image";
import Zipay from "../../assets/ZiPay.png";
import Phone from "../../assets/phone.png";
import Link from "next/link";
import {AiOutlineUser} from "react-icons/ai";
import {HiOutlineMail} from "react-icons/hi";
import {RiLockPasswordLine} from "react-icons/ri";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {SiMoneygram} from "react-icons/si";
import {MdError} from "react-icons/md";
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";
import coockieConfig from "@/helpers/cookieConfig";
import axios from "axios";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token;

        if (token) {
            res.setHeader("location", "/auth/login");
            res.statusCode = 302;
            res.end();
            return { prop: {token} };
        }

        return {
            props: {
                token: null
            },
        };
    },
    coockieConfig
);

const validationSchema = Yup.object({
    username: Yup.string().required("Username is invalid").min(3, "Must have at least 3 characters"),
    firstName: Yup.string().required("Firstname is invalid").min(3, "First name must have at least 3 characters"),
    lastName: Yup.string().required("Lastname is invalid").min(3, "First name must have at least 3 characters"),
    email: Yup.string().email("Email is invalid").required("Email is invalid"),
    password: Yup.string().min(8, "must have input 8 characters").required("Password is invalid")
});

function Register() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [showEye, setShoweEye] = React.useState(false);

    const doRegister = async(values)=>{
        setLoading(true);
        const fullName = values.firstName + " " + values.lastName;
        
        const form = new URLSearchParams({
            username: values.username,
            email: values.email, 
            password: values.password
        }).toString();

        const formProfile = new FormData();
        formProfile.append("fullName", fullName);

        const {data} = await axios.post("http://localhost:3000/api/register", form);
        console.log(data);

        if(data.success === false){
            setErrorMessage("Registration Failed");
            setLoading(false);
        }

        if(data.success === true){
            const profileData = await axios.patch("https://cute-lime-goldfish-toga.cyclic.app/profile", formProfile, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${data.results.token}`
                }
            } );
            router.push("/auth/login");
            setLoading(false);
        }
    };

    const doShowEye = ()=>{
        setShoweEye(!showEye);
    };
    return (
        <>
            <Head>
                <title>ZIpay | SignUp</title>
            </Head>
            <div className='flex h-screen w-full'>
                <div className='flex h-screen w-full'>
                    <div className='hidden w-[750px] lg:flex relative overflow-hidden'>
                        <Image className='absolute w-full h-[1000px] object-fit shadow-lg' src={Zipay} alt='Zipay'/>
                        <div className='absolute flex flex-col px-36 py-24 gap-10'>
                            <Link href="/" className='flex font-bold text-2xl text-white'><SiMoneygram className='text-white' size={35}/><span className='text-3xl text-accent'>ZI</span>Pay</Link>
                            <div className='flex flex-col gap-2'>
                                <h1 className='font-[500] text-white text-xl'>App that Covering Banking Needs.</h1>
                                <Image className='w-[400px] h-full' src={Phone} alt='Phone'/>
                                <p className='text-white'>ZIPay is an application that focussing in banking needs for all users
                                    in the world. Always updated and always following world trends.
                                    5000+ users registered in ZIPay everyday with worldwide
                                    users coverage.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 px-[8%] py-24'>
                        <Formik 
                            initialValues={{ 
                                username: "",
                                email: "",
                                firstName: "",
                                lastName: "", 
                                password: "" }}
                            validationSchema = {validationSchema}
                            onSubmit={doRegister}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
 
                            }) => (
                                <form onSubmit={handleSubmit} className='flex flex-col gap-10 w-full'>
                                    <div className='lg:hidden flex font-bold text-2xl text-primary'><SiMoneygram size={35}/><span className='text-3xl text-accent'>ZI</span>Pay</div>
                                    <h1 className='font-[500] text-primary text-2xl'>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h1>
                                    <p className='text-secondary'>Transfering money is eassier than ever, you can access ZiPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
                                    {errorMessage && (<div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg"><MdError size={30}/>{errorMessage}</div>)}
                                    <div className='w-full flex flex-col gap-6'>
                                        <div className='flex gap-3 justify-between items-center'>
                                            <div className="relative flex flex-col form-control w-full">
                                                <AiOutlineUser className={`absolute left-2 top-2 ${errors.firstName && touched.firstName && "text-error"}`} size={26}/>
                                                <input 
                                                    type="text" 
                                                    name= "firstName"
                                                    placeholder="Enter your firstname" 
                                                    className={`border-b-2 outline-none h-12 ${errors.firstName && touched.firstName ? ("border-error") : ("border-primary")} bg-base-100 w-full px-12`}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.firstName}
                                                />
                                                {errors.firstName && touched.firstName && (
                                                    <label className="label">
                                                        <span className="label-text-alt text-error">{errors.firstName}</span>
                                                    </label>)
                                                }
                                            </div>
                                        </div>
                                        <div className='flex gap-3 justify-between items-center'>
                                            <div className="relative flex flex-col form-control w-full">
                                                <AiOutlineUser className={`absolute left-2 top-2 ${errors.lastName && touched.lastName && "text-error"}`} size={26}/>
                                                <input 
                                                    type="text" 
                                                    name= "lastName"
                                                    placeholder="Enter your lastname" 
                                                    className={`border-b-2 outline-none h-12 ${errors.lastName && touched.lastName ? ("border-error") : ("border-primary")} bg-base-100 w-full px-12`}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.lastName}
                                                />
                                                {errors.lastName && touched.lastName && (
                                                    <label className="label">
                                                        <span className="label-text-alt text-error">{errors.lastName}</span>
                                                    </label>)
                                                }
                                            </div>
                                        </div>
                                        <div className='flex gap-3 justify-between items-center'>
                                            <div className="relative flex flex-col form-control w-full">
                                                <AiOutlineUser className={`absolute left-2 top-2 ${errors.username && touched.username && "text-error"}`} size={26}/>
                                                <input 
                                                    type="text" 
                                                    name= "username"
                                                    placeholder="Enter your username" 
                                                    className={`border-b-2 outline-none h-12 ${errors.username && touched.username ? ("border-error") : ("border-primary")} bg-base-100 w-full px-12`}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.username}
                                                />
                                                {errors.username && touched.username && (
                                                    <label className="label">
                                                        <span className="label-text-alt text-error">{errors.username}</span>
                                                    </label>)
                                                }
                                            </div>
                                        </div>
                                        <div className='flex gap-3 justify-between items-center'>
                                            <div className="relative flex flex-col form-control w-full">
                                                <HiOutlineMail className={`absolute left-2 top-2 ${errors.email && touched.email && "text-error"}`} size={26}/>
                                                <input 
                                                    type="email" 
                                                    name= "email"
                                                    placeholder="Enter your email" 
                                                    className={`border-b-2 outline-none h-12 ${errors.email && touched.email ? ("border-error") : ("border-primary")} bg-base-100 w-full px-12`}
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
                                        <div className='flex gap-3 justify-between items-center'>
                                            <div className="relative flex flex-col form-control w-full">
                                                <RiLockPasswordLine className={`absolute left-2 top-2 ${errors.password && touched.password && "text-error"}`} size={26}/>
                                                <input 
                                                    type={showEye ? "text" : "password" } 
                                                    name= "password"
                                                    placeholder="Enter your password" 
                                                    className={`border-b-2 outline-none h-12 ${errors.password && touched.password ? ("border-error") : ("border-primary")} bg-base-100 w-full px-12`}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                />
                                                {errors.password && touched.password && (
                                                    <label className="label">
                                                        <span className="label-text-alt text-error">{errors.password}</span>
                                                    </label>)
                                                }
                                                <button type="button" onClick={doShowEye}>
                                                    {showEye ? (<FiEyeOff size={23} className="absolute top-3 right-5" />) :
                                                        (<FiEye size={23} className="absolute top-3 right-5" />)
                                                    }
                                                    
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {loading ? (<button className="btn btn-primary normal-case text-white"><span className="loading loading-spinner loading-sm"></span></button>) :
                                        (<button className="btn btn-primary normal-case text-white">Sign Up</button>) }
                                    <p className='text-primary flex gap-2 justify-center'>Already have an account? Let’s
                                        <Link href='/auth/login' className='text-accent hover:text-secondary'>Login</Link>
                                    </p>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
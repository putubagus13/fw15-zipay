import React from "react";
import Image from "next/image";
import Zipay from "@/assets/Zipay.png";
import Phone from "@/assets/phone.png";
import {HiOutlineMail} from "react-icons/hi";
import {SiMoneygram} from "react-icons/si";
import Head from "next/head";
import Link from "next/link";
import {MdError} from "react-icons/md";
import { Formik } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import coockieConfig from "@/helpers/cookieConfig";
import axios from "axios";
import { useRouter } from "next/router";
import * as Yup from "yup";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token;

        if (token) {
            res.setHeader("location", "/home");
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
    email: Yup.string().email("Email is invalid").required("Email is invalid"),
});

function ForgotPassword() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const doForgotPassword = async(values)=>{
        setErrorMessage("");
        setLoading(true);
        const form = new URLSearchParams({
            email: values.email, 
        }).toString();

        const {data} = await axios.post("/api/forgot-password", form);
        console.log(data);
        if(data.message === "auth_forgot_already_requested"){
            setErrorMessage("Forgot password already requested");
            setLoading(false);
        }
        if(data.message === "auth_wrong_user"){
            setErrorMessage("User email not found");
            setLoading(false);
        }
        if(data.message === "internal_server_error"){
            setErrorMessage("Backend not connected");
            setLoading(false);
        }
        if(data.success === true){
            router.push("/auth/reset-password");
            setLoading(false);
        }
    };
    return (
        <>
            <Head>
                <title>ZIPay | Forgot Password</title>
            </Head> 
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
                            email: "" }}
                        validationSchema = {validationSchema}
                        onSubmit={doForgotPassword}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
 
                        }) => (
                            <form onSubmit={handleSubmit} className='flex flex-col gap-16 w-full'>
                                <div className='flex flex-col gap-10 w-full'>
                                    <div className='lg:hidden flex font-bold text-2xl text-primary'><SiMoneygram size={35}/><span className='text-3xl text-accent'>ZI</span>Pay</div>
                                    <h1 className='font-[500] text-primary text-2xl'>Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.</h1>
                                    <p className='text-secondary'>To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</p>
                                </div>
                                {errorMessage && (<div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg"><MdError size={30}/>{errorMessage}</div>)}
                                <div className='w-full flex flex-col gap-6'>
                                    <div className="relative flex flex-col form-control w-full">
                                        <HiOutlineMail className={`absolute left-2 top-2 ${errors.email && touched.email && "text-error"}`} size={26}/>
                                        <input 
                                            type="email" 
                                            name= "email"
                                            placeholder="Enter your email" 
                                            className={`border-b-2 outline-none h-12 ${errors.email && touched.email && "border-error"} bg-base-100 w-full px-12`}
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
                                {loading ? (<button className="btn btn-primary normal-case text-white"><span className="loading loading-spinner loading-sm"></span></button>) :
                                    (<button className="btn btn-primary normal-case text-white">Confirm</button>) }
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
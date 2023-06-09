import React from "react";
import Image from "next/image";
import Zipay from "../../assets/ZiPay.png";
import Phone from "../../assets/phone.png";
import Link from "next/link";
import {HiOutlineMail} from "react-icons/hi";
import {RiLockPasswordLine} from "react-icons/ri";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {SiMoneygram} from "react-icons/si";
import Head from "next/head";
import { Formik } from "formik";
import * as Yup from "yup";

import { withIronSessionSsr } from "iron-session/next";
import coockieConfig from "@/helpers/cookieConfig";
import axios from "axios";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token;

        if (token) {
            res.setHeader("location", "/home");
            res.statusCode = 302;
            res.end();
            return { props: {token} };
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
    password: Yup.string().required("Password is invalid")
});

function Login() {
    const doLogin = async(values)=>{
        const form = new URLSearchParams({
            email: values.email, 
            password: values.password
        }).toString();

        const {data} = await axios.post("http://localhost:3000/api/login", form);
        console.log(data);
    };

    return (
        <>
            <Head>
                <title>ZIpay | Login</title>
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
                            email: "", 
                            password: "" }}
                        validationSchema = {validationSchema}
                        onSubmit={doLogin}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit} className='flex flex-col gap-10 w-full'>
                                <div className='lg:hidden flex font-bold text-2xl text-primary'><SiMoneygram size={35}/><span className='text-3xl text-accent'>ZI</span>Pay</div>
                                <h1 className='font-[500] text-primary text-2xl'>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h1>
                                <p className='text-secondary'>Transfering money is eassier than ever, you can access ZiPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
                                <div className='w-full flex flex-col gap-6'>
                                    <div className='flex gap-3 justify-between items-center'>
                                        <HiOutlineMail size={26}/>
                                        <div className="flex flex-col form-control w-full">
                                            <input 
                                                type="text" 
                                                name="email"
                                                placeholder="Enter your email" 
                                                className={`input input-bordered ${errors.email && touched.email && "input-error"} w-full`} 
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
                                        <RiLockPasswordLine size={26}/>
                                        <div className="flex flex-col form-control w-full relative">
                                            <input 
                                                type="password"
                                                name="password" 
                                                placeholder="Create your password" 
                                                className={`input input-bordered ${errors.password && touched.password && "input-error"} w-full`} 
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            {errors.password && touched.password && (
                                                <label className="label">
                                                    <span className="label-text-alt text-error">{errors.password}</span>
                                                </label>)
                                            }
                                            <button type="button">
                                                <FiEye size={23} className="absolute top-3 right-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <Link href='/auth/forgot-password' className='text-accent hover:text-primary text-right'>Forgot password?</Link>
                                </div>
                                <button className="btn btn-primary normal-case text-white">Log In</button>
                                <p className='text-primary flex gap-2 justify-center'>Dont have an account? Let’s
                                    <Link href='/auth/register' className='text-accent hover:text-secondary'>Sign Up</Link>
                                </p>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}

export default Login;
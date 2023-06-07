import React from "react";
import Image from "next/image";
import Zipay from "../../assets/ZiPay.png";
import Phone from "../../assets/phone.png";
import {HiOutlineMail} from "react-icons/hi";
import {SiMoneygram} from "react-icons/si";
import Head from "next/head";

function ForgotPassword() {
    return (
        <>
            <Head>
                <title>ZIPay | Forgot Password</title>
            </Head> 
            <div className='flex h-screen w-full'>
                <div className='hidden w-[750px] lg:flex relative overflow-hidden'>
                    <Image className='absolute w-full h-[1000px] object-fit shadow-lg' src={Zipay} alt='Zipay'/>
                    <div className='absolute flex flex-col px-36 py-24 gap-10'>
                        <div className='flex font-bold text-2xl text-white'><SiMoneygram className='text-white' size={35}/><span className='text-3xl text-accent'>ZI</span>Pay</div>
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
                    <form className='flex flex-col gap-16 w-full'>
                        <div className='flex flex-col gap-10 w-full'>
                            <div className='lg:hidden flex font-bold text-2xl text-primary'><SiMoneygram size={35}/><span className='text-3xl text-accent'>ZI</span>Pay</div>
                            <h1 className='font-[500] text-primary text-2xl'>Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.</h1>
                            <p className='text-secondary'>To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</p>
                        </div>
                        <div className='w-full flex flex-col gap-6'>
                            <div className='flex gap-3 justify-between items-center'>
                                <HiOutlineMail size={26}/>
                                <div className="flex flex-col form-control w-full">
                                    <input type="text" placeholder="Enter your email" className="input input-bordered w-full" />
                                    <label className="label hidden">
                                        <span className="label-text-alt"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary normal-case text-white">Confirm</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
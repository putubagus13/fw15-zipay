import React from "react";
import Image from "next/image";
import Zipay from "../../assets/ZiPay.png";
import Phone from "../../assets/phone.png";
import {SiMoneygram} from "react-icons/si";
import {BsCheckCircleFill} from "react-icons/bs";
import Head from "next/head";

function CreatePin() {
    return (
        <>
            <Head>
                <title>ZIPay | Create Pin</title>
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
                            <BsCheckCircleFill className='text-success hidden' size={60}/>
                            <h1 className='font-[500] text-primary text-2xl'>Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.</h1>
                            <h1 className='font-[500] text-primary text-2xl hidden'>Your PIN Was Successfully Created</h1>
                            <p className='text-secondary'>Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it secret and don’t tell anyone about your FazzPay account password and the PIN.</p>
                            <p className='text-secondary hidden'>Your PIN was successfully created and you can now access all the features in FazzPay.</p>
                        </div>
                        <div className='w-full flex flex-col gap-6'>
                            <div className='flex justify-between items-center'>
                                <div className="flex flex-col form-control w-full">
                                    <div className='flex gap-2 w-full justify-center'>
                                        <input type="text" className="input input-bordered w-12 text-2xl" />
                                        <input type="text" className="input input-bordered w-12 text-2xl" />
                                        <input type="text" className="input input-bordered w-12 text-2xl" />
                                        <input type="text" className="input input-bordered w-12 text-2xl" />
                                        <input type="text" className="input input-bordered w-12 text-2xl" />
                                        <input type="text" className="input input-bordered w-12 text-2xl" />
                                    </div>
                                    <label className="label hidden">
                                        <span className="label-text-alt"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary normal-case text-white">Confirm</button>
                        <button className="btn btn-primary normal-case text-white hidden">Go to Dasboard</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreatePin;
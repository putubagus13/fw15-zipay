import React from "react";
import Head from "next/head";
import {SiMoneygram} from "react-icons/si";
import Image from "next/image";
import Icon from "../../assets/pexels-pixabay-220453.jpg";
import {MdNotificationsNone, MdOutlineLogout, MdOutlineFileDownload} from "react-icons/md";
import {LuLayoutDashboard, LuPencil} from "react-icons/lu";
import {AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser} from "react-icons/ai";
import {FiMenu, FiArrowRight} from "react-icons/fi";
import Link from "next/link";

function Success() {

    return (
        <div>
            <Head>
                <title>ZIPay | Profile</title>
            </Head>
            <header className="flex justify-between items-center px-[8%] py-6 bg-white rounded-b-3xl shadow-lg">
                <Link href="/home" className='flex font-bold text-2xl text-primary'><SiMoneygram size={35}/><span className='text-3xl text-accent'>ZI</span>Pay</Link>
                <div className="hidden lg:flex justify-center items-center gap-3">
                    <Link href="/profile" className="w-16 h-16 overflow-hidden rounded-2xl">
                        <Image className="object-cover" src={Icon} alt=""/>
                    </Link>
                    <div className="flex flex-col items-center">
                        <p className="font-bold text-primary">Putu Bagus R</p>
                        <p>+62081234567</p>
                    </div>
                    <MdNotificationsNone className="text-accent hover:text-primary" size={30}/>
                </div>
                <div className="flex justify-end items-center lg:hidden">
                    <button type="button"><FiMenu className="flex items-center text-primary" size={35} /></button>
                </div>
            </header>
            <div className="flex gap-6 h-[750px] px-[6%] py-16">
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
                            <Link href="" className="font-[500] text-xl">Log Out</Link>
                        </div>
                    </div>
                </aside>
                <div className="flex flex-col w-full rounded-3xl shadow-lg bg-white py-16 px-[10%] gap-6">
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col justify-center items-center gap-3">
                            <div className="w-20 h-20 overflow-hidden rounded-2xl">
                                <Image className="object-cover" src={Icon} alt=""/>
                            </div>
                            <button type="button" className="flex gap-2 items-center justify-center font-[500] text-accent hover:text-primary"><LuPencil size={17}/>Edit</button>
                            <div className="flex flex-col items-center">
                                <p className="font-bold text-primary">Putu Bagus R</p>
                                <p>+62081234567</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full px-[10%]">
                        <Link href="/profile/personal-information" className="btn btn-neutral w-full flex justify-between items-center px-6 normal-case">Personal Information<FiArrowRight size={20}/></Link>
                        <Link href="/profile/change-password" className="btn btn-neutral w-full flex justify-between items-center px-6 normal-case">Change Password<FiArrowRight size={20}/></Link>
                        <Link href="/profile/change-pin" className="btn btn-neutral w-full flex justify-between items-center px-6 normal-case">Change PIN<FiArrowRight size={20}/></Link>
                        <Link href="/profile/logout" className="btn btn-neutral w-full flex justify-between items-center px-6 normal-case">Log Out<FiArrowRight size={20}/></Link>
                    </div>
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

export default Success;
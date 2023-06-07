import React from "react";
import Head from "next/head";
import {SiMoneygram} from "react-icons/si";
import Image from "next/image";
import Icon from "../../assets/pexels-pixabay-220453.jpg";
import {MdNotificationsNone, MdOutlineLogout} from "react-icons/md";
import {LuLayoutDashboard, LuSearch} from "react-icons/lu";
import {AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser} from "react-icons/ai";
import Link from "next/link";

function History() {
    return (
        <div>
            <Head>
                <title>ZIPay | Home</title>
            </Head>
            <header className="flex justify-between items-center px-[8%] py-6 bg-white rounded-b-3xl shadow-lg">
                <Link href="/home" className='flex font-bold text-2xl text-primary'><SiMoneygram size={35}/><span className='text-3xl text-accent'>ZI</span>Pay</Link>
                <div className="flex justify-center items-center gap-3">
                    <Link href="/profile" className="w-16 h-16 overflow-hidden rounded-2xl">
                        <Image className="object-cover" src={Icon} alt=""/>
                    </Link>
                    <div className="flex flex-col items-center">
                        <p className="font-bold text-primary">Putu Bagus R</p>
                        <p>+62081234567</p>
                    </div>
                    <MdNotificationsNone className="text-accent hover:text-primary" size={30}/>
                </div>
            </header>
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
                            <div className="bg-primary w-1">.</div>
                            <div className="flex gap-6 text-primary">
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
                            <div className="bg-white text-white w-1">.</div>
                            <div className="flex gap-6 text-accent hover:text-primary">
                                <AiOutlineUser size={30}/>
                                <Link href="" className="font-[500] text-xl">Profile</Link>
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
                <div className="flex flex-col w-full rounded-3xl shadow-lg bg-white p-6 gap-16">
                    <div className="flex flex-col w-full gap-2 relative">
                        <label className="font-[500] text-primary text-xl">Search Receiver</label>
                        <input type="text" placeholder="Search" className="input w-full pl-16" />
                        <LuSearch className="absolute top-11 left-5 text-primary" size={27}/>
                    </div>
                    <div className="flex flex-col gap-10">
                        <Link href="/transfer/:id" className="flex items-center shadow-lg p-2 rounded-xl">
                            <div className="flex gap-3">
                                <div className="w-16 h-16 overflow-hidden rounded-2xl">
                                    <Image className="object-cover" src={Icon} alt=""/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-bold text-xl">Cuakly</label>
                                    <label className="text-xl">+62083673786</label>
                                </div>
                            </div>
                        </Link>
                        <Link href="/transfer/:id" className="flex items-center shadow-lg p-2 rounded-xl">
                            <div className="flex gap-3">
                                <div className="w-16 h-16 overflow-hidden rounded-2xl">
                                    <Image className="object-cover" src={Icon} alt=""/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-bold text-xl">Cuakly</label>
                                    <label className="text-xl">+62083673786</label>
                                </div>
                            </div>
                        </Link>
                        <Link href="/transfer/:id" className="flex items-center shadow-lg p-2 rounded-xl">
                            <div className="flex gap-3">
                                <div className="w-16 h-16 overflow-hidden rounded-2xl">
                                    <Image className="object-cover" src={Icon} alt=""/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-bold text-xl">Cuakly</label>
                                    <label className="text-xl">+62083673786</label>
                                </div>
                            </div>
                        </Link>
                        <Link href="/transfer/:id" className="flex items-center shadow-lg p-2 rounded-xl">
                            <div className="flex gap-3">
                                <div className="w-16 h-16 overflow-hidden rounded-2xl">
                                    <Image className="object-cover" src={Icon} alt=""/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-bold text-xl">Cuakly</label>
                                    <label className="text-xl">+62083673786</label>
                                </div>
                            </div>
                        </Link>
                        <Link href="/transfer/:id" className="flex items-center shadow-lg p-2 rounded-xl">
                            <div className="flex gap-3">
                                <div className="w-16 h-16 overflow-hidden rounded-2xl">
                                    <Image className="object-cover" src={Icon} alt=""/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-bold text-xl">Cuakly</label>
                                    <label className="text-xl">+62083673786</label>
                                </div>
                            </div>
                        </Link>
                        <Link href="/transfer/:id" className="flex items-center shadow-lg p-2 rounded-xl">
                            <div className="flex gap-3">
                                <div className="w-16 h-16 overflow-hidden rounded-2xl">
                                    <Image className="object-cover" src={Icon} alt=""/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="font-bold text-xl">Cuakly</label>
                                    <label className="text-xl">+62083673786</label>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <footer className="flex justify-between bg-secondary px-[8%] py-6">
                <label className="font-[500] text-white">2020 ZIPay. All right reserved.</label>
                <div className="flex justify-between items-center font-[500] text-white gap-6">
                    <label>+62 5637 8882 9901</label>
                    <label>contact@zipay.com</label>
                </div>
            </footer>
        </div>
    );
}

export default History;
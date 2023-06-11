import React from "react";
import Head from "next/head";
import Image from "next/image";
import Icon from "../../../assets/pexels-pixabay-220453.jpg";
import {MdOutlineLogout, MdOutlineFileDownload} from "react-icons/md";
import {LuLayoutDashboard} from "react-icons/lu";
import {AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser} from "react-icons/ai";
import {BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import Link from "next/link";

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

function Success({token}) {
    const router = useRouter();
    const doLogout = async()=>{
        await axios.get("/api/logout");
        router.replace("/auth/login");
    };

    return (
        <div>
            <Head>
                <title>ZIPay | Status</title>
            </Head>
            <Header token={token} />
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
                <div className="flex flex-col w-full rounded-3xl shadow-lg bg-white p-6 gap-6">
                    <div className="flex flex-col gap-10">
                        {/* if success */}
                        <div className="hidden w-full flex flex-col gap-5 justify-center items-center py-10">
                            <BsCheckCircleFill size={80} className="text-success"/>
                            <label className="font-bold text-xl text-secondary">Transfer Success</label>
                        </div>

                        {/* if failed */}
                        <div className="w-full flex flex-col gap-5 justify-center items-center py-10">
                            <BsFillXCircleFill size={80} className="text-error"/>
                            <label className="font-bold text-xl text-secondary">Transfer Failed</label>
                            <label className="text-md text-accent px-[30%] text-center">We can’t transfer your money at the moment, we recommend you to check your internet connection and try again.</label>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center shadow-lg p-4 rounded-xl">
                                <div className="flex flex-col gap-2">
                                    <label className="text-md">Amount</label>
                                    <label className="font-[500] text-2xl">Rp<span> 100.000</span></label>
                                </div>
                            </div>
                            <div className="flex items-center shadow-lg p-4 rounded-xl">
                                <div className="flex flex-col gap-2">
                                    <label className="text-md">Balance Left</label>
                                    <label className="font-[500] text-2xl">Rp<span> 49.900.000</span></label>
                                </div>
                            </div>
                            <div className="flex items-center shadow-lg p-4 rounded-xl">
                                <div className="flex flex-col gap-2">
                                    <label className="text-md">Date & Time</label>
                                    <label className="font-[500] text-2xl">May 11, 2023 - 14:38</label>
                                </div>
                            </div>
                            <div className="flex items-center shadow-lg p-4 rounded-xl">
                                <div className="flex flex-col gap-2">
                                    <label className="text-md">Note</label>
                                    <label className="font-[500] text-xl">For buying some food, i know u dont have money</label>
                                </div>
                            </div>
                        </div>
                        <label className="font-[500] text-primary text-xl">Transfer To</label>
                        <div className="flex items-center shadow-lg p-2 rounded-xl">
                            <div className="flex gap-3">
                                <Link href="/profile/" className="w-16 h-16 overflow-hidden rounded-2xl">
                                    <Image className="object-cover" src={Icon} alt=""/>
                                </Link>
                                <div className="flex flex-col gap-1">
                                    <label className="font-bold text-xl">Cuakly</label>
                                    <label className="text-xl">+62083673786</label>
                                </div>
                            </div>
                        </div>
                        {/* if success */}
                        <div className="hidden flex gap-4 w-full h-12 justify-center lg:justify-end">
                            <Link href="/home" className="btn btn-primary w-full h-full lg:w-48 normal-case rounded-2xl text-xl">Back to Home</Link>
                            <button className="btn btn-accent hover:btn-primary w-full h-full lg:w-36 normal-case text-xl rounded-xl"><MdOutlineFileDownload size={25}/>Download PDF</button>
                        </div>

                        {/* if failed */}
                        <div className="flex gap-4 w-full h-16 justify-center lg:justify-end">
                            <button className="btn btn-primary h-full w-full lg:w-36 normal-case rounded-2xl text-xl flex gap-2">Try Again</button>
                        </div>
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
import React from "react";
import Head from "next/head";
import {SiMoneygram} from "react-icons/si";
import Image from "next/image";
import Icon from "../../assets/pexels-pixabay-220453.jpg";
import {MdNotificationsNone, MdOutlineLogout} from "react-icons/md";
import {LuLayoutDashboard} from "react-icons/lu";
import {AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser} from "react-icons/ai";
import {FiMenu} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";

import { withIronSessionSsr } from "iron-session/next";
import coockieConfig from "@/helpers/cookieConfig";
import axios from "axios";
import Header from "@/components/Header";

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

function Confirmation({token}) {
    const router = useRouter();
    const doLogout = async()=>{
        await axios.get("/api/logout");
        router.replace("/auth/login");
    };

    return (
        <div>
            <Head>
                <title>ZIPay | Confirmation</title>
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
                    <label className="font-[500] text-primary text-xl pb-6">Transfer To</label>
                    <div className="flex flex-col gap-10">
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
                        <label className="text-primary font-bold text-xl">Detail</label>
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
                        <div className="flex w-full h-16 justify-center lg:justify-end">
                            <button className="btn btn-primary w-full h-full lg:w-36 normal-case rounded-2xl text-xl" onClick={()=>window.my_modal_1.showModal()}>Continue</button>
                        </div>
                        <dialog id="my_modal_1" className="modal">
                            <form method="dialog" className="modal-box flex flex-col gap-6">
                                <h3 className="font-bold text-primary text-lg">Enter PIN to Transfer</h3>
                                <p className="py-4 pr-28 text-left">Enter your 6 digits PIN for confirmation to continue transferring money. </p>
                                <div className='flex gap-2 w-full justify-center'>
                                    <input type="text" className="input input-bordered w-12 text-2xl" />
                                    <input type="text" className="input input-bordered w-12 text-2xl" />
                                    <input type="text" className="input input-bordered w-12 text-2xl" />
                                    <input type="text" className="input input-bordered w-12 text-2xl" />
                                    <input type="text" className="input input-bordered w-12 text-2xl" />
                                    <input type="text" className="input input-bordered w-12 text-2xl" />
                                </div>
                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary w-full h-full lg:w-36 normal-case rounded-xl text-md">Continue</button>
                                </div>
                            </form>
                        </dialog>
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

export default Confirmation;
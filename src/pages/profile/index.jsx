import React from "react";
import Head from "next/head";
import Image from "next/image";
import {MdOutlineLogout} from "react-icons/md";
import {LuLayoutDashboard, LuPencil} from "react-icons/lu";
import {AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser} from "react-icons/ai";
import {FiArrowRight} from "react-icons/fi";
import User from "@/assets/user.png";
import Link from "next/link";

import { withIronSessionSsr } from "iron-session/next";
import coockieConfig from "@/helpers/cookieConfig";
import axios from "axios";
import { useRouter } from "next/router";
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
        const {data} = await axios.get("https://cute-lime-goldfish-toga.cyclic.app/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        return {
            props: {
                token,
                user: data.results
            },
        };
        
    },
    coockieConfig
);

function Profile({token, user}) {
    const router = useRouter();
    const doLogout = async()=>{
        await axios.get("/api/logout");
        router.replace("/auth/login");
    };

    return (
        <div>
            <Head>
                <title>ZIPay | Profile</title>
            </Head>
            <Header token={token} />
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
                    {/* <div className="flex items-center gap-10">
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
                    </div> */}
                </aside>
                <div className="flex flex-col w-full rounded-3xl shadow-lg bg-white py-16 px-[10%] gap-6">
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col justify-center items-center gap-3">
                            <div className="w-20 h-20 overflow-hidden rounded-2xl">
                                {user?.picture ? (<Image width={150} height={150} className="object-fit" src={user.picture} alt="userImage"/>) 
                                    : (<Image className="object-fit" src={User} alt="user"/>) }
                            </div>
                            <button type="button" className="flex gap-2 items-center justify-center font-[500] text-accent hover:text-primary"><LuPencil size={17}/>Edit</button>
                            <div className="flex flex-col items-center">
                                <p className="font-bold text-primary">{user.fullName}</p>
                                <p>+62081234567</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full px-[10%]">
                        <Link href="/profile/personal-information" className="btn btn-neutral w-full flex justify-between items-center px-6 normal-case">Personal Information<FiArrowRight size={20}/></Link>
                        <Link href="/profile/change-password" className="btn btn-neutral w-full flex justify-between items-center px-6 normal-case">Change Password<FiArrowRight size={20}/></Link>
                        <Link href="/profile/change-pin" className="btn btn-neutral w-full flex justify-between items-center px-6 normal-case">Change PIN<FiArrowRight size={20}/></Link>
                        <button onClick={()=>window.my_modal_5.showModal()} className="btn btn-neutral w-full flex justify-between items-center px-6 normal-case">Log Out<MdOutlineLogout className="text-error" size={20}/></button>
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

export default Profile;
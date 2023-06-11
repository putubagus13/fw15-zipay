import React from "react";
import Head from "next/head";
import Image from "next/image";
import Icon from "../../assets/pexels-pixabay-220453.jpg";
import {MdOutlineLogout} from "react-icons/md";
import {LuLayoutDashboard} from "react-icons/lu";
import {AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser} from "react-icons/ai";
import {LuPencil} from "react-icons/lu";
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

function TransferByUserId({token}) {
    const [nominal, setNominal] = React.useState(0);
    const router = useRouter();

    const doLogout = async()=>{
        await axios.get("/api/logout");
        router.replace("/auth/login");
    };

    return (
        <div>
            <Head>
                <title>ZIPay | Transfer</title>
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
                    <div className="flex flex-col w-full gap-2">
                        <label className="font-[500] text-primary text-xl">Transfer Money</label>
                    </div>
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
                        <p className="text-primary pr-[60%]">Type the amount you want to transfer and then press continue to the next steps.</p>
                        <div className="flex flex-col gap-10 justify-center items-center w-full px-[15%]">
                            <input 
                                className="text-center outline-none font-bold text-6xl text-accent" 
                                type="text" 
                                value={nominal} 
                            />
                            <label className="font-bold text-md text-primary">Rp120.000 Available</label>
                            <div className="relative">
                                <input className="border-b-2 w-full h-10 border-b-accent hover:border-b-primary outline-none px-10" placeholder="Add some note"></input>
                                <LuPencil className="absolute text-accent bottom-2 left-2" size={22}/>
                            </div>
                        </div>
                        <div className="flex w-full h-12 justify-center lg:justify-end">
                            <button className="btn btn-accent hover:btn-primary w-full h-full lg:w-36 normal-case text-xl rounded-xl">Continue</button>
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

export default TransferByUserId;
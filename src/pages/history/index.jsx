import React from "react";
import Head from "next/head";
import Image from "next/image";
import User from "@/assets/user.png";
import {MdOutlineLogout} from "react-icons/md";
import {LuLayoutDashboard} from "react-icons/lu";
import {AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser} from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";

import { withIronSessionSsr } from "iron-session/next";
import coockieConfig from "@/helpers/cookieConfig";
import axios from "axios";
import Header from "@/components/Header";
import http from "@/helpers/http";
import { useSelector } from "react-redux";

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

function History({token}) {
    const router = useRouter();
    const profile = useSelector(state =>state.profile.data);
    const [page, setPage] = React.useState({});
    const [sort, setSort] = React.useState("");

    const [transaction, setTransaction] = React.useState([]);
    const dataTrs = React.useCallback(async(page=1, sort="ASC")=>{
        const {data} = await http(token).get("/transactions", {params: {
            page,
            sort,
            limit: 6}});
        setTransaction(data.results);
        setPage(data.pageInfo);
    }, [token]);

    React.useEffect(()=>{
        dataTrs();
    }, [dataTrs]);

    React.useEffect(()=>{
        dataTrs(1, sort );

    }, [sort, dataTrs]);

    const doLogout = async()=>{
        await axios.get("/api/logout");
        router.replace("/auth/login");
    };
    return (
        <div>
            <Head>
                <title>ZIPay | Home</title>
            </Head>
            <Header token={token} />
            <div className="flex gap-6 px-[6%] py-16">
                <aside className="hidden lg:flex flex-col bg-white pr-[2%] py-10 w-96 justify-between rounded-3xl shadow-lg">
                    <div className="flex flex-col gap-11">
                        <div className="flex items-center gap-10">
                            <div className="bg-primary w-1">.</div>
                            <div className="flex gap-6 text-primary">
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
                <div className="flex flex-col w-full rounded-3xl shadow-lg bg-white p-10 gap-16">
                    <div className="flex w-full justify-between items-center">
                        <label className="font-bold text-primary text-2xl">Transaction History</label>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn m-1 normal-case rounded-2xl">-Select Filter-</label>
                            <ul tabIndex={0} className="dropdown-content menu flex flex-col items-center gap-2 p-2 shadow bg-base-100 rounded-box w-52">
                                <button>Name</button>
                                <button onClick={()=> setSort("ASC")} className="btn w-full font-bold">A-Z</button>
                                <button onClick={()=> setSort("DSC")}className="btn w-full font-bold">Z-A</button>
                                <button>Last Transaction</button>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10">
                        {transaction.map(items => {
                            return(
                                <div key={`transaction${items.id}`} className="flex justify-between items-center">
                                    {items.type === "TOP-UP" && 
                                            <>
                                                <div className="flex gap-3">
                                                    <div className="w-16 h-16 overflow-hidden rounded-2xl">
                                                        <Link href="" className="w-16 h-16 overflow-hidden rounded-2xl">
                                                            {items.recipient.picture ? (<Image width={150} height={150} className="object-fit" src={items.recipient.picture} alt="userImage"/>) 
                                                                : (<Image className="object-fit" src={User} alt="user"/>) }
                                                        </Link>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <label className="font-bold text-xl">{items.recipient.fullName || items.recipient.email}</label>
                                                        <label className="text-xl">Top-Up</label>
                                                    </div>
                                                </div>
                                            </>}
                                    {items.type === "TRANSFER" && 
                                            <>
                                                {items.recipient.id !== profile.id && 
                                                <>
                                                    <div className="flex gap-3">
                                                        <div className="w-16 h-16 overflow-hidden rounded-2xl">
                                                            <Link href="" className="w-16 h-16 overflow-hidden rounded-2xl">
                                                                {items.recipient.picture ? (<Image width={150} height={150} className="object-fit" src={items.recipient.picture} alt="userImage"/>) 
                                                                    : (<Image className="object-fit" src={User} alt="user"/>) }
                                                            </Link>
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <label className="font-bold text-xl">{items.recipient.fullName || items.recipient.email}</label>
                                                            <label className="text-xl">Outcome</label>
                                                        </div>
                                                    </div>
                                                </>}
                                                {items.recipient.id === profile.id && 
                                                <>
                                                    <div className="flex gap-3">
                                                        <div className="w-16 h-16 overflow-hidden rounded-2xl">
                                                            <Link href="" className="w-16 h-16 overflow-hidden rounded-2xl">
                                                                {items.sender.picture ? (<Image width={150} height={150} className="object-fit" src={items.sender.picture} alt="userImage"/>) 
                                                                    : (<Image className="object-fit" src={User} alt="user"/>) }
                                                            </Link>
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <label className="font-bold text-xl">{items.sender.fullName || items.sender.email}</label>
                                                            <label className="text-xl">Income</label>
                                                        </div>
                                                    </div>
                                                </>}
                                            </>}
                                    {items.type === "TOP-UP" && 
                                            <div>
                                                <label className="font-bold text-2xl text-success">+{items.amount && `Rp${Number(items.amount).toLocaleString("id")}`}</label>
                                            </div>}
                                    {items.type === "TRANSFER" && (items.recipient.id === profile.id ? 
                                        (<div>
                                            <label className="font-bold text-success text-2xl text-success">+{items.amount && `Rp${Number(items.amount).toLocaleString("id")}`}</label>
                                        </div>) : 
                                        (<div>
                                            <label className="font-bold text-error text-2xl">-{items.amount && `Rp${Number(items.amount).toLocaleString("id")}`}</label>
                                        </div>))
                                    }
                                </div>
                            );
                        })}
                        <div className="flex gap-6 justify-center w-full">
                            <button onClick={()=> dataTrs(page.page - 1, sort)} disabled={page.page <= 1} className="btn btn-secondary shadow-md normal-case">Prev</button>
                            <label className="flex justify-center items-center font-[500] text-md text-secondary">{page.page} of {page.totalPage}</label>
                            <button onClick={()=> dataTrs(page.page + 1, sort)} disabled={page.page === page.totalPage} className="btn btn-secondary shadow-md normal-case">Next</button>
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
}

export default History;
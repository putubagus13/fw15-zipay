import React from "react";
import Head from "next/head";
import Image from "next/image";
import User from "@/assets/user.png";
import {MdOutlineLogout} from "react-icons/md";
import {LuLayoutDashboard, LuSearch} from "react-icons/lu";
import {AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser} from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import {setRecipient as setRecipientAction } from "@/redux/reducers/transfer";

import { withIronSessionSsr } from "iron-session/next";
import coockieConfig from "@/helpers/cookieConfig";
import axios from "axios";
import Header from "@/components/Header";
import http from "@/helpers/http";
import { useDispatch, useSelector } from "react-redux";

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
    const dispatch = useDispatch();
    const [recipient, setRecipient] = React.useState({});
    const [search, setSearch] = React.useState("");
    const [page, setPage] = React.useState({});

    const getUsers = React.useCallback(async(page=1, search="", limit=4, )=>{
        const {data} = await http(token).get("/users", {params: {
            page,
            search,
            limit
        }});
        setRecipient(data);
        setPage(data.pageInfo);
    },[token]);

    React.useEffect(()=>{
        getUsers();
    }, [getUsers]);

    React.useEffect(()=>{
        getUsers(1, search);

    }, [search, getUsers]);

    const recipientRedux = useSelector(state => state.transfer.user);

    React.useEffect(()=>{
        if(recipientRedux){
            router.push("/transfer/amount");
        }
    },[recipientRedux]);

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
                <div className="flex flex-col w-full rounded-3xl shadow-lg bg-white p-6 gap-16">
                    <div className="flex flex-col w-full gap-2 relative">
                        <label className="font-[500] text-primary text-xl">Search Receiver</label>
                        <input onChange={(e)=> setSearch(e.target.value)} type="text" placeholder="Search" className="input w-full pl-16" />
                        <LuSearch className="absolute top-11 left-5 text-primary" size={27}/>
                    </div>
                    <div className="flex flex-col gap-10">
                        {recipient.results && 
                        <>
                            {recipient.results.map(items =>(
                                <div onClick={()=> dispatch(setRecipientAction(items))} key={`recipient-list${items.id}`} href="/transfer/1" className="cursor-pointer flex items-center shadow-md p-2 rounded-xl hover:bg-neutral">
                                    <div className="flex gap-3">
                                        <div className="w-16 h-16 overflow-hidden rounded-2xl">
                                            <div className="w-16 h-16 overflow-hidden rounded-2xl">
                                                {items.picture ? (<Image width={150} height={150} className="object-fit" src={items.picture} alt="userImage"/>) 
                                                    : (<Image className="object-fit" src={User} alt="user"/>) }
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="font-bold text-xl">{items.fullName}</label>
                                            <label className="text-xl">{items.email}</label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>}
                    </div>
                    <div className="flex gap-6 justify-center w-full">
                        <button onClick={()=> getUsers(page.page - 1)} disabled={page.page <= 1} className="btn btn-secondary shadow-md normal-case">Prev</button>
                        <label className="flex justify-center items-center font-[500] text-md text-secondary">{page.page} of {page.totalPage}</label>
                        <button onClick={()=> getUsers(page.page + 1)} disabled={page.page === page.totalPage} className="btn btn-secondary shadow-md normal-case">Next</button>
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
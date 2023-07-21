import React from "react";
import Head from "next/head";
import Image from "next/image";
import {MdOutlineLogout, MdError} from "react-icons/md";
import {BsCheckCircleFill} from "react-icons/bs";
import {LuLayoutDashboard} from "react-icons/lu";
import {AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser, AiOutlineArrowDown} from "react-icons/ai";
import Link from "next/link";
import User from "@/assets/user.png";
import { setTransactionHistory } from "@/redux/reducers/transaction";

import { withIronSessionSsr } from "iron-session/next";
import coockieConfig from "@/helpers/cookieConfig";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { useDispatch, useSelector } from "react-redux";
import http from "@/helpers/http";
import { setProfile } from "@/redux/reducers/profile";

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

function Homepage({token}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.data);
    const [amount, setAmount] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState(false);

    const [transaction, setTransaction] = React.useState([]);
    const dataTrs = React.useCallback(async()=>{
        const {data} = await http(token).get("/transactions", {params: {limit: 4}});
        setTransaction(data.results);
        dispatch(setTransactionHistory(data.results));
    }, [token]);

    React.useEffect(()=>{
        dataTrs();
    }, [dataTrs]);

    
    const doTopUp = async()=>{
        try {
            console.log(amount);
            const form = new URLSearchParams({
                amount
            });
            const {data} = await http(token).post("/transactions/topup", form);
            console.log(data.results);
            const history = await http(token).get("/transactions", {params: {limit: 4}});
            console.log(history);
            setTransaction(history.data.results);
            dispatch(setTransactionHistory(history.data.results));

            if(data.results){
                dispatch(setProfile(data.results));
                setSuccessMessage(true);
            }

            
        } catch (error) {
            return setErrorMessage("Top-UP failed, try again");
        }

    };

    const doLogout = async()=>{
        await axios.get("/api/logout");
        router.replace("/auth/login");
    };

    return (
        <div>
            <Head>
                <title>ZIPay | Home</title>
            </Head>
            <Header token={token}/>
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
                                <button onClick={()=>window.my_modal_1.showModal()} className="font-[500] text-xl">Top Up</button>
                                <dialog id="my_modal_1" className="modal">
                                    <form method="dialog" className="modal-box flex flex-col gap-6">
                                        <h3 className="font-bold text-primary text-lg">Enter Top-UP</h3>
                                        <p className="py-4 pr-28 text-left">Enter the amount of money, and click submit.</p>
                                        <div className="flex flex-col gap-2 justify-center items-center w-full">
                                            {successMessage && <BsCheckCircleFill className="text-success" size={60}/>}
                                            {errorMessage && (<div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg"><MdError size={30}/>{errorMessage}</div>)}
                                            <p className="py-4 text-left">Min top-up is Rp20.000</p>
                                            <input onChange={(e)=> setAmount(e.target.value)} type="text" placeholder="Enter nominal Top-UP" className="input input-bordered w-full" />
                                        </div>
                                        <div className="modal-action flex gap-2">
                                            <button onClick={doTopUp} disabled={amount < 20000} type="submit" className="btn btn-primary w-full h-full lg:w-36 normal-case rounded-xl text-md">Continue</button>
                                            <button type="submit" className="btn btn-accent w-full h-full lg:w-36 normal-case rounded-xl text-md">Cancel</button>
                                        </div>
                                    </form>
                                </dialog>
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
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex justify-between items-center bg-secondary w-full rounded-3xl px-[6%] py-10">
                        <div className="flex flex-col gap-5">
                            <label className="text-xl text-accent">Balance</label>
                            <label className="font-bold text-4xl text-white">{profile?.balance ? `Rp${Number(profile?.balance).toLocaleString("id")}` : "Rp0"}</label>
                            <label className="text-xl text-accent">+62081234567</label>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link href="/transfer" className="btn btn-accent flex gap-2 normal-case"><AiOutlineArrowUp size={25}/>Transfer</Link>
                            <Link href="/topup" className="btn btn-accent flex gap-2 normal-case"><AiOutlinePlus size={25}/>Top Up</Link>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="bg-white flex flex-col p-10 rounded-3xl shadow-lg gap-10 w-full">
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-2">
                                    <AiOutlineArrowDown className="text-success" size={35}/>
                                    <label className="text-xl text-secondary">Income</label>
                                    <label className="font-bold text-3xl text-primary">Rp <span>200.000</span></label>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <AiOutlineArrowUp className="text-error" size={35}/>
                                    <label className="text-xl text-secondary">Income</label>
                                    <label className="font-bold text-3xl text-primary">Rp <span>200.000</span></label>
                                </div>
                            </div>
                            <div className="flex items-end justify-center gap-10">
                                <div className="flex flex-col ga-3 items-center">
                                    <div className="w-3 h-60 bg-secondary rounded-2xl"></div>
                                    <p className="text-primary">Sat</p>
                                </div>
                                <div className="flex flex-col ga-3 items-center">
                                    <div className="w-3 h-56 bg-secondary rounded-2xl"></div>
                                    <p className="text-primary">Sun</p>
                                </div>
                                <div className="flex flex-col ga-3 items-center">
                                    <div className="w-3 h-36 bg-secondary rounded-2xl"></div>
                                    <p className="text-primary">Man</p>
                                </div>
                                <div className="flex flex-col ga-3 items-center">
                                    <div className="w-3 h-48 bg-secondary rounded-2xl"></div>
                                    <p className="text-primary">Tus</p>
                                </div>
                                <div className="flex flex-col ga-3 items-center">
                                    <div className="w-3 h-32 bg-secondary rounded-2xl"></div>
                                    <p className="text-primary">Wen</p>
                                </div>
                                <div className="flex flex-col ga-3 items-center">
                                    <div className="w-3 h-24 bg-secondary rounded-2xl"></div>
                                    <p className="text-primary">Thu</p>
                                </div>
                                <div className="flex flex-col ga-3 items-center">
                                    <div className="w-3 h-52 bg-secondary rounded-2xl"></div>
                                    <p className="text-primary">Fri</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full rounded-3xl shadow-lg bg-white p-10 gap-10">
                            <div className="flex w-full justify-between items-center">
                                <label className="font-bold text-primary text-2xl">Transaction History</label>
                                <Link href="/history" className="font-[500] text-secondary hover:text-warning text-xl">See All</Link>
                            </div>
                            <div className="flex flex-col gap-6">
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
                                
                            </div>
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

export default Homepage;
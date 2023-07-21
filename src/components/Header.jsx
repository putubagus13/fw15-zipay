import React from "react";
import {SiMoneygram} from "react-icons/si";
import Image from "next/image";
import User from "@/assets/user.png";
import {MdNotificationsNone} from "react-icons/md";
import {FiMenu} from "react-icons/fi";
import Link from "next/link";
import http from "@/helpers/http";
import { useDispatch, useSelector } from "react-redux";
import {setProfile} from "@/redux/reducers/profile";

function Header({token}) {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.data);
    const transaction = useSelector(state => state.transaction.history);
    console.log(transaction);

    const getData = React.useCallback(async()=>{
        const {data} = await http(token).get("/profile");
        dispatch(setProfile(data.results));

    }, [token, dispatch]);

    React.useEffect(()=>{
        getData();

    },[getData]);

    return (
        <header className="flex justify-between items-center px-[8%] py-6 bg-white rounded-b-3xl shadow-lg">
            <Link href="/home" className='flex font-bold text-2xl text-primary'><SiMoneygram size={35}/><span className='text-3xl text-accent'>ZI</span>Pay</Link>
            <div className="hidden lg:flex justify-center items-center gap-3">
                <Link href="/profile" className="w-16 h-16 overflow-hidden rounded-2xl">
                    {profile?.picture ? (<Image width={150} height={150} className="object-fit" src={profile.picture} alt="userImage"/>) 
                        : (<Image className="object-fit" src={User} alt="user"/>) }
                </Link>
                <div className="flex flex-col">
                    <p className="font-bold text-primary">{profile?.fullName}</p>
                    <p>{profile?.email}</p>
                </div>
                <div className="dropdown dropdown-bottom dropdown-end">
                    <button tabIndex={0} className="m-1"><MdNotificationsNone className="text-accent hover:text-primary" size={30}/></button>
                    <div tabIndex={0} className="dropdown-content menu p-6 shadow bg-white rounded-box w-[500px]">
                        <div className="flex flex-col gap-6">
                            {/* {transaction.map(items => {
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
                                                            <label className="text-xl">Transfer</label>
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
                                                            <label className="text-xl">Transfer</label>
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
                            })} */}
                            <div className="w-full flex flex-col gap-3 justify-center items-center">
                                <hr className="w-full"/>
                                <Link href="/history" className="font-[500] text-xl text-warning hover:text-secondary">See All</Link>
                            </div>
                                
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="flex justify-end items-center lg:hidden">
                <button type="button"><FiMenu className="flex items-center text-primary" size={35} /></button>
            </div>
        </header>
    );
}

export default Header;
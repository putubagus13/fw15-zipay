import React from "react";
import {SiMoneygram} from "react-icons/si";
import Image from "next/image";
import User from "@/assets/user.png";
import {MdNotificationsNone} from "react-icons/md";
import {FiMenu} from "react-icons/fi";
import Link from "next/link";
import http from "@/helpers/http";

function Header({token}) {
    const [profile, setProfile] = React.useState({});

    React.useEffect(()=>{
        async function getProfile(){
            const {data} = await http(token).get("/profile");
            setProfile(data.results);
        }
        getProfile();

    },[token]);
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
                    <p>{profile?.username}</p>
                </div>
                <MdNotificationsNone className="text-accent hover:text-primary" size={30}/>
            </div>
            <div className="flex justify-end items-center lg:hidden">
                <button type="button"><FiMenu className="flex items-center text-primary" size={35} /></button>
            </div>
        </header>
    );
}

export default Header;
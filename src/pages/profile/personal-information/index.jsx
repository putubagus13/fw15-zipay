import React from "react";
import Head from "next/head";
import {MdOutlineLogout} from "react-icons/md";
import {LuLayoutDashboard, LuPencil} from "react-icons/lu";
import {AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser} from "react-icons/ai";
import Link from "next/link";
import { withIronSessionSsr } from "iron-session/next";
import coockieConfig from "@/helpers/cookieConfig";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import UpdateProfile from "@/components/UpdateProfile";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token;
        console.log(token);

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

function PersonalInformation({token, user}) {
    const [edit, setEdit] = React.useState(false);
    const fullname = user?.fullName;
    let nameLength;
    let firstName;
    let lastName;
    if(fullname){
        nameLength = fullname.split(" ");
        firstName = nameLength[0];
        lastName = nameLength.slice(1).join(" ");
    }

    const router = useRouter();
    const doLogout = async()=>{
        await axios.get("/api/logout");
        router.replace("/auth/login");
    };

    const doEdit = ()=>{
        setEdit(!edit);
    };
    
    return (
        <div>
            <Head>
                <title>ZIPay | Profile Information</title>
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
                <div className="flex flex-col w-full rounded-3xl shadow-lg bg-white p-6 gap-10">
                    <div className="flex flex-col w-full gap-2 relative">
                        <label className="font-[500] text-primary text-xl">Personal Information</label>
                    </div>
                    <div>
                        <p className="pr-[50%]">We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</p>
                    </div>
                    { edit ? (<UpdateProfile token={token} onSave={setEdit} />) : (<div className="flex flex-col gap-3">
                        <button onClick={doEdit}  className="flex gap-2 px-6 font-[500] text-md text-warning hover:text-primary justify-end items-center"><LuPencil size={20}/>Edit</button>
                        <div className="flex items-center shadow-lg p-4 rounded-xl">
                            <div className="flex flex-col gap-2">
                                <label className="text-md">Firstname</label>
                                {typeof firstName === "string"  ? (<label className="font-[500] text-secondary text-xl">{firstName}</label>) 
                                    : (<label className="font-[500] text-secondary text-xl">-</label>)}
                            </div>
                        </div>
                        <div className="flex items-center shadow-lg p-4 rounded-xl">
                            <div className="flex flex-col gap-2">
                                <label className="text-md">Lastname</label>
                                {typeof firstName === "string"  ? (<label className="font-[500] text-secondary text-xl">{lastName}</label>) 
                                    : (<label className="font-[500] text-secondary text-xl">-</label>)}
                            </div>
                        </div>
                        <div className="flex items-center shadow-lg p-4 rounded-xl">
                            <div className="flex flex-col gap-2">
                                <label className="text-md">Verified E-mail</label>
                                <label className="font-[500] text-xl text-accent">{user.email}</label>
                            </div>
                        </div>
                        <div className="flex justify-between items-center shadow-lg p-4 rounded-xl">
                            <div className="flex flex-col gap-2">
                                <label className="text-md">Phone Number</label>
                                <label className="font-[500] text-xl text-secondary">+628123456789</label>
                            </div>
                            <Link href="/profile/personal-information/phoneNumber-manage" className="font-[500] text-warning hover:text-primary text-md px-6">Manage</Link>
                        </div>
                    </div>)}
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

export default PersonalInformation;
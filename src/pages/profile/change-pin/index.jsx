import React from "react";
import Head from "next/head";
import {MdOutlineLogout} from "react-icons/md";
import {LuLayoutDashboard} from "react-icons/lu";
import {AiOutlineArrowUp, AiOutlinePlus, AiOutlineUser} from "react-icons/ai";
import {BsCheckCircleFill} from "react-icons/bs";
import {MdError} from "react-icons/md";
import Link from "next/link";

import { withIronSessionSsr } from "iron-session/next";
import coockieConfig from "@/helpers/cookieConfig";
import axios from "axios";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import PinInput from "@/components/PinInput";
import http from "@/helpers/http";

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

function ChangePin({token}) {
    const [pin, setPin] = React.useState("");
    const [successMessage, setSuccessMassage] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    console.log(pin);

    const router = useRouter();
    const doLogout = async()=>{
        await axios.get("/api/logout");
        router.replace("/auth/login");
    };

    const doChangePin = async(e)=>{
        try {
            e.preventDefault();
            const form = new URLSearchParams({
                pin
            }).toString();

            if(pin.length === 6){
                console.log("test");
                const {data} = await http(token).patch("/profile/change-pin", form);
                console.log(data);
                if(data.success === true){
                    setSuccessMassage(true);
                    setPin("");
                }
            }else{
                console.log("testeror");
                setErrorMessage("Pin must be 6 digits");
            }
        } catch (error) {
            const message = error?.response?.data?.message;
            if(message?.includes("Internal")){
                setErrorMessage("Internal Server Error");
            }
        }
    };

    return (
        <div>
            <Head>
                <title>ZIPay | Change PIN</title>
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
                <div className="flex flex-col w-full h-[622px] rounded-3xl shadow-lg bg-white p-6 gap-10">
                    <div className="flex flex-col w-full gap-2 relative">
                        <label className="font-[500] text-primary text-xl">Change PIN</label>
                    </div>
                    <div>
                        <p className="pr-[20%] md:pr-[50%]">Enter your current 6 digits Fazzpay PIN below to continue to the next steps.</p>
                    </div>
                    <form onSubmit={doChangePin} className="w-full flex flex-col gap-12 px-[10%] md:px-[30%] py-10 justify-center">
                        {successMessage && <BsCheckCircleFill className='text-success' size={60}/>}
                        {errorMessage && (<div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg"><MdError size={30}/>{errorMessage}</div>)}
                        <PinInput onChangePin={setPin} />
                        <button type="submit" className="btn btn-accent hover:btn-primary w-full normal-case">Change PIN</button>
                    </form>
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

export default ChangePin;
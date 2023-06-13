import React from "react";
import Image from "next/image";
import Zipay from "../../assets/ZiPay.png";
import Phone from "../../assets/phone.png";
import {SiMoneygram} from "react-icons/si";
import {BsCheckCircleFill} from "react-icons/bs";
import {MdError} from "react-icons/md";
import Head from "next/head";
import Link from "next/link";
import PinInput from "@/components/PinInput";

import { useRouter } from "next/router";
import http from "@/helpers/http";

import { withIronSessionSsr } from "iron-session/next";
import coockieConfig from "@/helpers/cookieConfig";

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
        const {data} = await http(token).get("/profile");
        
        return {
            props: {
                token,
                user: data.results
            },
        };
        
    },
    coockieConfig
);

function CreatePin({user}) {
    const email = user.email;
    const router = useRouter();
    const [pin, setPin] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMassage] = React.useState(false);

    const doCreatePin = async(e)=>{
        try {
            e.preventDefault();

            setErrorMessage("");
            setSuccessMassage("");
            setLoading(true);

            const form = new URLSearchParams({
                email,
                pin
            }).toString();

            const {data} = await http().post("/auth/set-pin", form);
            console.log(data);
            if(data.success === false){
                setErrorMessage("Create pin failed, try again");
                setLoading(false);
            }
            if(data.success === true){
                setSuccessMassage(true);
                setLoading(false);
                setTimeout(() => {
                    router.push("/auth/login");
                }, 1000);
                
            }
        } catch (error) {
            const message = error?.response?.data.message;
            if(message?.includes("Internal")){
                setErrorMessage("Internal Server Error");
            }
        }
        finally{
            setLoading(false);
        }
    };
    return (
        <>
            <Head>
                <title>ZIPay | Create Pin</title>
            </Head> 
            <div className='flex h-screen w-full'>
                <div className='hidden w-[750px] lg:flex relative overflow-hidden'>
                    <Image className='absolute w-full h-[1000px] object-fit shadow-lg' src={Zipay} alt='Zipay'/>
                    <div className='absolute flex flex-col px-36 py-24 gap-10'>
                        <Link href="/" className='flex font-bold text-2xl text-white'><SiMoneygram className='text-white' size={35}/><span className='text-3xl text-accent'>ZI</span>Pay</Link>
                        <div className='flex flex-col gap-2'>
                            <h1 className='font-[500] text-white text-xl'>App that Covering Banking Needs.</h1>
                            <Image className='w-[400px] h-full' src={Phone} alt='Phone'/>
                            <p className='text-white'>ZIPay is an application that focussing in banking needs for all users
                                in the world. Always updated and always following world trends.
                                5000+ users registered in ZIPay everyday with worldwide
                                users coverage.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex-1 px-[8%] py-24'>
                    <form onSubmit={doCreatePin} className='flex flex-col gap-16 w-full'>
                        <div className='flex flex-col gap-10 w-full'>
                            <div className='lg:hidden flex font-bold text-2xl text-primary'><SiMoneygram size={35}/><span className='text-3xl text-accent'>ZI</span>Pay</div>
                            {successMessage && <BsCheckCircleFill className='text-success' size={60}/>}
                            {successMessage ?(<h1 className='font-[500] text-primary text-2xl'>Your PIN Was Successfully Created</h1>) : 
                                (<h1 className='font-[500] text-primary text-2xl'>Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.</h1>)}
                            {successMessage ?(<p className='text-secondary'>Your PIN was successfully created and you can now access all the features in FazzPay.</p>) :
                                (<p className='text-secondary'>Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it secret and don’t tell anyone about your FazzPay account password and the PIN.</p>) }
                        </div>
                        {successMessage === false ? (<div className='w-full flex flex-col gap-6'>
                            <div className='flex justify-between items-center'>
                                <div className="flex flex-col gap-10 form-control w-full">
                                    {errorMessage && (<div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg"><MdError size={30}/>{errorMessage}</div>)}
                                    <PinInput onChangePin={setPin}/> 
                                    <label className="label hidden">
                                        <span className="label-text-alt"></span>
                                    </label>
                                </div>
                            </div>
                        </div>) : (<div> </div>)}
                        {loading ? (<button className={`btn btn-primary normal-case text-white ${successMessage && "hidden"}`}><span className="loading loading-spinner loading-sm"></span></button>) :
                            (<button className={`btn btn-primary normal-case text-white ${successMessage && "hidden"}`}>Create</button>) }
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreatePin;
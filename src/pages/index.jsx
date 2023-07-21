import React from "react";
import Head from "next/head";
import Image from "next/image";
import Zipay from "@/assets/Zipay1.png";
import phone from "@/assets/png-phone.png";
import phone1 from "@/assets/png-phone2.png";
import {SiMoneygram} from "react-icons/si";
import {HiPhone} from "react-icons/hi";
import {RiLockPasswordLine} from "react-icons/ri";
import {FiDownload, FiMenu} from "react-icons/fi";
import Cannon from "@/assets/cannon.png";
import Dropbox from "@/assets/dropbox.png";
import Hnm from "@/assets/h&m.png";
import Microsoft from "@/assets/microsoft.png";
import Airbnb from "@/assets/airbnb.png";
import Dell from "@/assets/dell.png";
import Link from "next/link";
import Icon from "@/assets/pexels-apex-4041013.jpg";
import Icon1 from "@/assets/pexels-jack-winbow-1559486.jpg";
import Icon2 from "@/assets/pexels-pixabay-220453.jpg";

export default function Home() {
    return (
        <>
            <Head>
                <title>Welcome to ZIPay</title>
            </Head>
            <div className="w-full">
                <div className="flex overflow-hidden pb-96 w-full">
                    <div className="flex-1 px-[8%] py-16 flex flex-col gap-36">
                        <div className="flex justify-between">
                            <div className="flex font-bold text-4xl text-primary"><SiMoneygram size={45}/><span className="text-4xl text-accent">ZI</span>Pay</div>
                            <button className="md:hidden" type="button"><FiMenu className="flex items-center text-primary" size={35} /></button>
                        </div>
                        <div className="flex flex-col gap-10">
                            <h1 className="font-bold text-secondary text-6xl">Awesome App For Saving <span className="text-primary">Time.</span></h1>
                            <p className="text-secondary text-xl">We bring you a mobile app for banking problems that oftenly wasting much of your times.</p>
                        </div>
                    </div>
                    <div className="hidden md:block flex-[1.5] relative h-[600px] overflow-hidden rounded-bl-[150px]">
                        <Image className='absolute top-0 right-0 w-full h-full object-fit shadow-lg' src={Zipay} alt='Zipay'/>
                        <div className="absolute flex gap-3 py-16 w-full justify-end px-[12%]">
                            <Link href="/auth/register" className="btn btn-primary border-white font-bold text-xl rounded-xl w-36 normal-case">Sign Up</Link>
                            <Link href="/auth/login" className="btn btn-white border-primary font-bold text-xl rounded-xl w-36 normal-case">Log In</Link>
                        </div>
                    </div>
                    <Image className='hidden lg:block absolute top-28 right-48 w-[460px] h-full' src={phone} alt='Zipay'/>
                </div>
                <div className="flex flex-col justify-center items-center bg-accent py-20 gap-16">
                    <h1 className="font-bold text-white text-6xl text-center" ><span className="text-primary">About</span> the Application.</h1>
                    <p className="text-white text-center text-xl">We have some great features from the application and it’s totally free <br/> to use by all users around the world.</p>
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1 bg-white p-10 w-80 h-80 rounded-2xl flex flex-col justify-center items-center gap-6">
                            <div className="h-16 w-16 rounded-full bg-accent flex justify-center items-center"><HiPhone className="text-primary"size={30}/></div>
                            <p className="font-bold text-2xl text-primary">24/7 Support</p>
                            <p className="text-md text-secondary text-center">We have 24/7 contact support so you can contact us whenever you want and we will respond it.</p>
                        </div>
                        <div className="flex-1 bg-white p-10 w-80 h-80 rounded-2xl flex flex-col justify-center items-center gap-6">
                            <div className="h-16 w-16 rounded-full bg-accent flex justify-center items-center"><RiLockPasswordLine className="text-primary"size={30}/></div>
                            <p className="font-bold text-2xl text-primary">Data Privacy</p>
                            <p className="text-md text-secondary text-center">We make sure your data is safe in our database and we will encrypt any data you submitted to us.</p>
                        </div>
                        <div className="flex-1 bg-white p-10 w-80 h-80 rounded-2xl flex flex-col justify-center items-center gap-6">
                            <div className="h-16 w-16 rounded-full bg-accent flex justify-center items-center"><FiDownload className="text-primary"size={30}/></div>
                            <p className="font-bold text-2xl text-primary">Easy Download</p>
                            <p className="text-md text-secondary text-center">Zwallet is 100% totally free to use it’s now available on Google Play Store and App Store.</p>
                        </div>

                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center p-[8%] gap-16">
                    <div className="flex-1 flex flex-col gap-16">
                        <p className="font-bold text-6xl text-secondary leading-relaxed">100+ <span className="text-primary">Trusted</span> <br/> Partners.</p>
                        <p className="text-secondary text-xl">We have reached global level and have 100+ brand partners around the globe.</p>
                    </div>
                    <div className="flex-1 grid grid-cols-2 lg:grid-cols-3">
                        <Image src={Airbnb} alt=""/>
                        <Image src={Cannon} alt=""/>
                        <Image src={Dell} alt=""/>
                        <Image src={Microsoft} alt=""/>
                        <Image src={Hnm} alt=""/>
                        <Image src={Dropbox} alt=""/>
                        
                    </div>
                </div>
                <div className="flex gap-20 bg-accent p-[8%] justify-center">
                    <Image className="hidden lg:block" src={phone1} alt=""/>
                    <div className="flex flex-col gap-20 py-16">
                        <h1 className="font-bold text-white text-6xl">All The <span className="text-primary">Great</span><br/> ZIpay Futures.</h1>
                        <div className="flex flex-col gap-6">
                            <div className="bg-white flex flex-col px-10 py-6 rounded-2xl gap-2">
                                <p className="font-bold text-xl"><span className="text-secondary text-2xl">1. </span><span className="text-primary">Small Fee</span></p>
                                <p>We only charge 5% of every success transaction done in FazzPay app.</p>
                            </div>
                            <div className="bg-white flex flex-col px-10 py-6 rounded-2xl gap-2">
                                <p className="font-bold text-xl"><span className="text-secondary text-2xl">2. </span><span className="text-primary">Data Secured</span></p>
                                <p>All your data is secured properly in our system and it’s encrypted.</p>
                            </div>
                            <div className="bg-white flex flex-col px-10 py-6 rounded-2xl gap-2">
                                <p className="font-bold text-xl"><span className="text-secondary text-2xl">3. </span><span className="text-primary">User Friendly</span></p>
                                <p>FazzPay come up with modern and sleek design and not complicated.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center bg-white py-20 gap-16">
                    <h1 className="font-bold text-primary text-6xl text-center" ><span className="text-secondary">What Users are</span> Saying.</h1>
                    <p className="text-primary text-center text-xl">We have some great features from the application and it’s totally free <br/> to use by all users around the world.</p>
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1 bg-white shadow-lg p-10 w-80 h-80 rounded-2xl flex flex-col justify-center items-center gap-6">
                            <div className="h-16 w-16 rounded-xl bg-accent flex justify-center items-center overflow-hidden"><Image src={Icon} className="w-full h-full object-fit" alt=""/></div>
                            <p className="font-bold text-xl text-primary">Sherina Chaw</p>
                            <p className="text-md text-secondary text-center">“I use this app since 2 years ago and this is the best app that I’ve ever use in my entire life”</p>
                        </div>
                        <div className="flex-1 bg-white shadow-lg p-10 w-80 h-80 rounded-2xl flex flex-col justify-center items-center gap-6">
                            <div className="h-16 w-16 rounded-xl bg-accent flex justify-center items-center overflow-hidden"><Image src={Icon1} className="w-full h-full object-cover" alt=""/></div>
                            <p className="font-bold text-xl text-primary">Jessica Mera</p>
                            <p className="text-md text-secondary text-center">“I use Zwallet to manage all financial needs. It’s super easy to use and it’s 100% free app”</p>
                        </div>
                        <div className="flex-1 bg-white shadow-lg p-10 w-80 h-80 rounded-2xl flex flex-col justify-center items-center gap-6">
                            <div className="h-16 w-16 rounded-xl bg-accent flex justify-center items-center overflow-hidden"><Image src={Icon2} className="w-full h-full object-cover" alt=""/></div>
                            <p className="font-bold text-xl text-primary">Robert Chandler</p>
                            <p className="text-md text-secondary text-center">“Since I’m using this app, I’m not going to move to another similar app. Thank you Zwallet!”</p>
                        </div>
                    </div>
                </div>
                <footer className="flex flex-col gap-6 bg-accent w-full px-[8%] py-16">
                    <div className="w-full">
                        <div className="flex font-bold text-4xl text-primary"><SiMoneygram size={45}/><span className="text-4xl text-white">ZI</span>Pay</div>
                    </div>
                    <p className="w-64">Simplify financial needs and saving much time in banking needs with one single app.</p>
                    <hr className="h-3"/>
                    <div className="flex justify-between">
                        <p className="font-bold">2020 ZIPay. All right reserved.</p>
                        <div className="flex gap-6">
                            <p className="font-bold">+62 5637 8882 9901</p>
                            <p className="font-bold">contact@zipay.com</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

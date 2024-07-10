import React, { useRef, useState } from 'react';
import nexaRobo from '../assets/images/nexa_robo.png'
import { MdOutlineClose, MdSend } from "react-icons/md";
import axios from 'axios';


const baseUrl = 'https://api.documentia.ai/'
const NexaBot = () => {
    const [openRobo, setOpenRobo] = useState(false);
    const [switchToggle, setSwitchToggle] = useState(false);
    const [WebAnswer, setWebAnswer] = useState([]);
    const [webQuestion, setWebQuestion] = useState([]);
    const [nexaAnswer, setNexaAnswer] = useState([]);
    const [nexaQuestion, setNexaQuestion] = useState([]);

    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);


    const handleOpenRobo = () => {
        setOpenRobo(!openRobo)
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    const handleChange = (e) => {
        console.log("e.target.checked", e.target.checked);
        setSwitchToggle(e.target.checked)
    }

    const handleEnterPress = () => {
        handleSend()
    }

    const handleSend = () => {
        if (switchToggle) {
            webGetData();
        }else{
            nexaGetData();
        }
    }

    const nexaGetData = async () => {
        if (input) {
            setNexaQuestion((prev) => [...prev, input])
            setTimeout(() => { scrollToBottom() }, "50");
            const response = await axios(`${baseUrl}rerasearch?question=${input}&language=english`);
            setNexaAnswer((prev) => [...prev, response.data])
            setTimeout(() => { scrollToBottom() }, "50");
            setInput('')
        }
    }
    const webGetData = async () => {
        if (input) {
            setWebQuestion((prev) => [...prev, input])
            setTimeout(() => { scrollToBottom() }, "50");
            const response = await axios(`${baseUrl}websearch?question=${input}`);
            setWebAnswer((prev) => [...prev, response.data])
            setTimeout(() => { scrollToBottom() }, "50");
            setInput('')
        }
    }
  return (
    <div className={`flex justify-end items-end fixed z-50 ${openRobo ? "bottom-2" : "bottom-10"} left-10 top-0 max-md:left-5 max-md:right-5 right-10 `}>
            {openRobo ?
                <div className='  w-full rounded-t-lg  bg-white'>
                    <div className='flex justify-between p-3 rounded-t-lg items-center bg-[#1B55F5]'>
                        <div className='flex items-center gap-2 font-semibold text-white'>
                            <img src={nexaRobo} alt='nexaRobo' className='h-5 w-5' />
                            Ask Nexa
                        </div>

                        <div className='flex gap-3'>
                            <label className="inline-flex items-center cursor-pointer my-anchor-element">
                                <input type="checkbox" value="" className="sr-only peer " onChange={(e) => handleChange(e)}
                                    checked={switchToggle} />
                                <div className={`relative w-10 h-5 ${switchToggle ? "bg-[#328bff]" : "bg-[#e7e7e7]"}
                                    rounded-full peer peer-checked:after:translate-x-full 
                                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                                    after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border 
                                    after:rounded-full after:h-4 after:w-4 after:transition-all
                                    peer-checked:bg-[#328bff]`} />
                                <span className={`mx-2 text-sm  font-semibold ${switchToggle ? "text-[#fff]" : "text-[#6387eb]"} `}>Web</span>
                            </label>
                            <MdOutlineClose size={25} className='cursor-pointer text-white' onClick={() => handleOpenRobo()} />
                        </div>
                    </div>
                    {switchToggle ?
                        <div className='p-2 pb-20 border h-[400px] overflow-y-scroll'>
                            {webQuestion?.map((que, idx) => (
                                <div className='mt-2'>
                                    <div className='rounded-md px-2 py-1 bg-[#b2cafd] font-semibold'>
                                        {idx + 1}{". "}{que}
                                    </div>
                                    <div className='rounded-md px-2 py-1 mt-2 bg-[#f3ffd3]'>
                                        {WebAnswer?.[idx]?.answer ? <div dangerouslySetInnerHTML={{ __html: WebAnswer?.[idx]?.answer }} />
                                            :
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                        }
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        :
                        <div className='p-2 pb-20 border h-[400px] overflow-y-scroll'>
                            {nexaQuestion?.map((que, idx) => (
                                <div className='mt-2' key={idx}>
                                    <div className='rounded-md px-2 py-1 bg-[#b2cafd] font-semibold'>
                                        {idx + 1}{". "}{que}
                                    </div>
                                    <div className='rounded-md px-2 py-1 mt-2 bg-[#f3ffd3]'>
                                        {nexaAnswer?.[idx]?.answer ? <div dangerouslySetInnerHTML={{ __html: nexaAnswer?.[idx]?.answer }} />
                                            :
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                        }
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    }
                    <div className='border absolute w-full bottom-0 flex items-center bg-white'>
                        <input type='text' className='outline-none w-full px-2 h-10 text-[#141414]'  
                        value={input} placeholder='Ask anything...' onChange={(e) => setInput(e.target.value)} />
                        <div className='p-2 border-l'>
                            <MdSend className='text-[#1B55F5] transition duration-100 hover:scale-95 cursor-pointer' size={30} onClick={() => handleSend()} />
                        </div>
                    </div>
                </div>
                :
                <div className=' relative border-2 bg-[#d4d4d4] border-[#4e6099] h-14 w-14 rounded-full flex justify-center items-center cursor-pointer transition duration-100 hover:scale-95' onClick={() => handleOpenRobo()}>
                    <img src={nexaRobo} alt='nexaRobo' className='h-8 w-8' />
                    <div className='absolute -bottom-7 text-sm px-2 rounded-md text-nowrap font-semibold bg-[#4e6099] text-white'>
                        Ask Nexa
                    </div>
                </div>
            }
        </div>
  )
}

export default NexaBot
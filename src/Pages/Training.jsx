import React from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { RiGasStationLine } from "react-icons/ri";
import { PiGreaterThan } from "react-icons/pi";
import { BsTools } from "react-icons/bs";
import { LuBadgeCheck } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";




const Courses = [
    {
        icon: RiGasStationLine,
        heading: "Basic CNG Conversion & Safety 4 weeks",
        description: "Learn fundamentals of CNG systems, safety protocols, and basic installation techniques.",
        button: "Learn more"
    },
    {
        icon: BsTools,
        heading: "Advanced Conversion & Tuning 4 weeks",
        description: "Master troubleshooting and advanced diagnostic techniques for CNG conversion systems.",
        button: "Learn more"
    },
    {
        icon: RiGasStationLine,
        heading: "Station Operation and Management 4 weeks",
        description: "Comprehensive training on CNG station operations, safety, and management.",
        button: "Learn more"
    },
    {
        icon: LuBadgeCheck,
        heading: "Full Technician Bundle All 3 [12 weeks]",
        description: "Complete package including basic, advanced, and station management training for a comprehensive skill set.",
        button: "Learn more"
    }, 
]

const Testimonials = [
    {
        image: "/assets/testimonial1.svg",
        feedback: "I got my first job just 2 weeks after getting certified. Electra's training gave me real skills",
        customer: "Emeka",
        state: "Asaba"
    },
    {
        image: "/assets/testimonial2.svg",
        feedback: "We now offer CNG services at my family’s mechanic shop. Thanks to Electra Motors",
        customer: "Amina",
        state: "Delta North"
    },
    {
        image: "/assets/testimonial3.svg",
        feedback: " The hands-on experience was the best part. I feel confident working on real vehicles     ",
        customer: "Tolu",
        state: "Asaba"
    },
]


const Training = () => {
  return (
    <>
        <div className="bg-[url(/assets/training-bg.png)] w-full h-[355px] bg-cover bg-center flex justify-center items-center">
            <div className="text-center">
                <h2 className="text-white text-[60px] font-bold">Training</h2>
                <p className="text-white text-[20px] md:text-[24px] md:px-5">
                    Enroll in Technician Certification
                </p>
            </div>
        </div>

        {/* Enroll in Technician Certification */}
        <div className="px-[20px] py-[20px] md:px-[30px] md:py-[50px] xl:px-[100px] xl:py-[100px]">
            <h2 className="text-[30px] text-center font-semibold md:text-[48px] leading-7 md:leading-12 xl:leading-14">
                Enroll in Technician Certification
            </h2>
            <p className="text-[20px] md:text-[24px] md:px-5 text-center leading-6 pt-2 md:leading-8 xl:leading-9">
                Want to join the clean energy revolution? Become a Certified CNG conversion Technician with Electra Motors
            </p>
            <div className='pt-[20px] md:pt-[25px] space-y-[10px] md:space-y-[30px]'>
                <div className='flex gap-[20px] items-center'>
                    <IoMdCheckmark className='text-[22px]'/>  
                    <p className='text-[24px]'>4-12 weeks program</p>
                </div>
                <div className='flex gap-[20px] items-center'>
                    <IoMdCheckmark className='text-[22px]'/>  
                    <p className='text-[24px]'>Hands-on training</p>
                </div>
                <div className='flex gap-[20px] items-center'>
                    <IoMdCheckmark className='text-[22px]'/>  
                    <p className='text-[24px]'>Certification by NADDC & Pi-CNG</p>
                </div>
                <div className='flex gap-[20px] items-center'>
                    <IoMdCheckmark className='text-[22px]'/>  
                    <p className='text-[24px]'>Employment opportunities after graduation</p>
                </div>
            </div>
        </div>

        {/* Browse Upcoming Courses */}
        <div className='bg-[#002748] py-[20px] md:py-[50px] xl:py-[100px] px-[20px] md:px-[30px] xl:px-[150px]'>
            <h2 className="text-[30px] text-center font-semibold md:text-[48px] leading-7 md:leading-12 xl:leading-14 text-white">
                Browse Upcoming Courses
            </h2>
            <p className="text-[20px] md:text-[24px] md:px-5 text-center leading-6 pt-2 md:leading-8 xl:leading-9 text-white">
                Discover the Perfect Course for Your Goals
            </p>
            <div className='pt-[30px] md:pt-[50px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[30px]'>          
                {Courses.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <div key={index} className='bg-white w-full h-[200px] md:h-[266px] rounded-2xl p-[15px] flex flex-col justify-between'>
                            <div className='flex justify-center items-center bg-[#002748] w-[50px] h-[50px] rounded-full'>
                                <Icon className='text-[24px] text-white'/>
                            </div>
                            <h5 className='text-[17px] font-semibold'>{item.heading}</h5>
                            <p className='text-[15px] font-semibold'>
                                {item.description}
                            </p>
                            <button className='text-[#002748] flex items-center gap-2 text-[15px] font-semibold cursor-pointer'>
                                <p>{item.button}</p>
                                <PiGreaterThan className='text-[13px]'/>
                            </button>
                        </div>
                    )         
                })}
            </div>
        </div>

        {/* Course Details & Pricing  */}
        <div className='pt-[20px] xl:pt-[100px]'>
            {/*  leading-7 md:leading-12 xl:leading-14 */}
            <h2 className="text-[30px] text-center font-semibold md:text-[48px] pb-[20px] md:pb-[30px] xl:pb-[50px]">
                Course Details & Pricing 
            </h2>
            <div className='bg-[#2FEAE4] py-[20px] md:py-[50px] px-[20px] md:px-[30px] xl:px-[150px] overflow-x-scroll md:overflow-x-hidden'>
                <table className="w-[500px] md:w-full">
                    <tr>
                        <th className="">
                            <p className="text-left text-[16px] md:text-[24px]">
                                Courses
                            </p>
                        </th>
                        <th className="px-3">
                            <p className="text-left text-[16px] md:text-[24px]">
                                Duration
                            </p>
                        </th>
                        <th className="px-3">
                            <p className="text-left text-[16px] md:text-[24px]">
                                Fee (&#8358;)
                            </p>
                        </th>
                    </tr>
                    <tbody className=" [&>tr>td]:pt-[10px]">
                        <tr className='font-semibold'>
                            <td>
                                <p className="text-start text-[16px] md:text-[24px]">Basic CNG Installation</p>
                            </td>
                            <td className='px-3'>
                                <p className="text-start text-[16px] md:text-[24px]">4 weeks</p>
                            </td>
                            <td className='px-3'>
                                <p className="text-start text-[16px] md:text-[24px]">₦150,000</p>
                            </td>
                            <td className='px-3'>
                                <a href="https://schoolville.com/courses/basic-cng-installation" 
                                target="_blank" rel="noopener noreferrer">
                                    <button className="font-primary text-[12px] md:text-[18px] text-white font-semibold bg-[#002748] rounded-lg 
                                    cursor-pointer w-[80px] h-[30px] md:w-[89px] md:h-[40px] hover:bg-[#2FEAE4]
                                    hover:border-[3px] hover:border-[#002748] hover:text-[#002748] hover:shadow-lg
                                    transition-transform-y duration-500 hover:scale-105">
                                        Enroll
                                    </button>
                                </a>
                            </td>
                        </tr>
                        <tr className='font-semibold'>
                            <td>
                                <p className="text-start text-[16px] md:text-[24px]">Advanced Conversion & Tuning</p>
                            </td>
                            <td className='px-3'>
                                <p className="text-start text-[16px] md:text-[24px]">4 weeks</p>
                            </td>
                            <td className='px-3'>
                                <p className="text-start text-[16px] md:text-[24px]">₦200,000</p>
                            </td>
                            <td className='px-3'>
                                <a href="https://schoolville.com/courses/cng-advanced-conversion-tuning" 
                                target="_blank" rel="noopener noreferrer">
                                    <button className="font-primary text-[12px] md:text-[18px] text-white font-semibold bg-[#002748] 
                                    rounded-lg cursor-pointer w-[80px] h-[30px] md:w-[89px] md:h-[40px] hover:bg-[#2FEAE4]
                                    hover:border-[3px] hover:border-[#002748] hover:text-[#002748] hover:shadow-lg
                                    transition-transform-y duration-500 hover:scale-105">
                                        Enroll
                                    </button>
                                </a>
                            </td>
                        </tr>
                        <tr className='font-semibold'>
                            <td>
                                <p className="text-start text-[16px] md:text-[24px]">Station Operation & Management</p>
                            </td>
                            <td className='px-3'>
                                <p className="text-start text-[16px] md:text-[24px]">4 weeks</p>
                            </td>
                            <td className='px-3'>
                                <p className="text-start text-[16px] md:text-[24px]">₦300,000</p>
                            </td>
                            <td className='px-3'>
                                <a href="https://schoolville.com/courses/cng-station-operation-management" 
                                target="_blank" rel="noopener noreferrer">
                                    <button className="font-primary text-[12px] md:text-[18px] text-white font-semibold bg-[#002748] rounded-lg 
                                    cursor-pointer w-[80px] h-[30px] md:w-[89px] md:h-[40px] hover:bg-[#2FEAE4]
                                    hover:border-[3px] hover:border-[#002748] hover:text-[#002748] hover:shadow-lg
                                    transition-transform-y duration-500 hover:scale-105">
                                        Enroll
                                    </button>
                                </a>
                            </td>
                        </tr>
                        {/* <tr className='font-semibold'>
                            <td>
                                <p className="text-start text-[16px] md:text-[24px]">Full Technician Bundle (All 3)</p>
                            </td>
                            <td className='px-3'>
                                <p className="text-start text-[16px] md:text-[24px]">12 weeks</p>
                            </td>
                            <td className='px-3'>
                                <p className="text-start text-[16px] md:text-[24px]">₦500,000</p>
                            </td>
                            <td className='px-3'>
                                <button className="font-primary text-[12px] md:text-[18px] text-white font-semibold bg-[#002748] rounded-lg 
                                cursor-pointer w-[80px] h-[30px] md:w-[89px] md:h-[40px] hover:bg-[#2FEAE4]
                                hover:border-[3px] hover:border-[#002748] hover:text-[#002748] hover:shadow-lg
                                transition-transform-y duration-500 hover:scale-105">
                                    Enroll
                                </button>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Course duration */}
        <div className='py-[20px] md:py-[50px] px-[20px] md:px-[30px] xl:px-[150px]'>
            <div className='shadow-lg px-[20px] py-[40px] md:p-[30px] xl:px-[50px] xl:pl-[50px] xl:pb-[50px] rounded-2xl'>
                <div className='flex flex-col gap-6 md:gap-7 md:flex-row lg:justify-between'>
                    <div>
                        <div className='flex items-center gap-5'>
                            <div className='bg-[#D9D9D9] w-[50px] h-[50px] rounded-full flex justify-center items-center'>
                                <FaRegCalendarCheck className='text-[24px]' />
                            </div>
                            <p className='text-[24px] font-semibold'>Days</p>
                        </div>
                        <p className='pt-[15px] text-[18px] font-semibold'>Tuesday, Thursday and Saturdays </p>
                    </div>
                    <div>
                        <div className='flex items-center gap-5'>
                            <div className='bg-[#D9D9D9] w-[50px] h-[50px] rounded-full flex justify-center items-center'>
                                <IoTimeOutline className='text-[24px]' />
                            </div>
                            <p className='text-[24px] font-semibold'>Duration</p>
                        </div>
                        <p className='pt-[15px] text-[18px] font-semibold'>4-12 Weeks</p>
                    </div>
                    <div>
                        <div className='flex items-center gap-5'>
                            <div className='bg-[#D9D9D9] w-[50px] h-[50px] rounded-full flex justify-center items-center'>
                                <IoTimeOutline className='text-[24px]' />
                            </div>
                            <p className='text-[24px] font-semibold'>Time</p>
                        </div>
                        <p className='pt-[15px] text-[18px] font-semibold'>Morning Session - (9am-12noon)</p>
                        <p className='pt-[15px] text-[18px] font-semibold'>Afternoon Session - (1pm-3pm)</p>
                        <p className='pt-[15px] text-[18px] font-semibold'>Evening Session - (4pm-7pm)</p>
                    </div>
                </div>
                <div className='bg-[#002748] text-white flex items-center gap-3 px-4 py-2 rounded-2xl mt-20 xl:w-[755px]'>
                    <MdInfoOutline className='text-[24px]'/>
                    <p className='text-[12px] md:text-[20px]'>Discount Available for Early-birds and group registration (5%)</p>
                </div>
            </div>
        </div>

        {/* Graduate testimonials */}
        <div className='py-[20px] md:py-[50px] xl:pt-[100px] px-[20px] md:px-[30px] xl:px-[150px]'>
            <h2 className="text-[30px] text-center font-semibold md:text-[48px]">
                Testimonials from Graduates
            </h2>
            <div className=''>
            <h4 className='text-[30px] text-center font-semibold md:text-[48px] text-white'>Customer Feedback</h4>
            <div className='flex flex-col md:flex-row xl:justify-center gap-[20px]'>
                {Testimonials.map((item, index) => (
                <div
                    key={index}
                    className='bg-white flex flex-col items-center justify-center px-[31px] py-[24px] rounded-2xl gap-[15px] 
                    w-full md:w-[384px] shadow-lg'>
                    <img src={item.image} alt={`${item.feedback}'s feedback`} />
                    <p className='text-[16px] text-center'>{item.feedback}</p>
                    <div className='text-center'>
                        <p className='text-[18px] font-semibold'>{item.customer}</p>
                        <p className='text-[18px] font-semibold text-[#a09e9e]'>{item.state}</p>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>

        {/* Start CNG journey */}
        <div className='bg-[#2FEAE4] my-[20px] md:my-[50px] xl:my-[100px] mx-[20px] md:mx-[30px] xl:mx-[150px] 
        px-[10px] py-[30px] rounded-2xl'>
            <h2 className="text-[30px] text-center font-semibold md:text-[48px] leading-9 md:leading-12 xl:leading-14 text-black">
                Ready  To Start Your CNG Technician Journey
            </h2>
            <p className="text-[20px] md:text-[24px] md:px-5 text-center leading-6 pt-[25px] md:leading-8 xl:leading-9 text-black">
                Join our next cohort and help shape Nigeria's clean energy future
            </p>
            <div className='flex items-center justify-center'>
                <button className='font-primary text-[18px] md:text-[22px] text-white font-semibold bg-[#002748] rounded-lg 
                cursor-pointer w-[203px] h-[52px] mt-[25px] hover:bg-[#2FEAE4]
                hover:border-[3px] hover:border-[#002748] hover:text-[#002748] hover:shadow-lg
                transition-transform-y duration-500 hover:scale-105'>
                    Register Now
                </button>
            </div>
        </div>
    </>
  )
}

export default Training
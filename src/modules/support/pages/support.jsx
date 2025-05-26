import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { BsArrowRight, BsCheckAll } from 'react-icons/bs';
import { ReactComponent as File } from '@/assets/icons/file.svg';
import { ReactComponent as Attachment } from '@/assets/icons/attachment.svg';
import { ReactComponent as Send } from '@/assets/icons/sent.svg';
import { ReactComponent as Upload } from '@/assets/icons/upload.svg';

import SupportModal from '@/modules/support/components/supportModal';
import { Check } from 'lucide-react';

const data = [
    { id: 1, type: "Enquiry" },
    { id: 2, type: "Feedback" },
    { id: 3, type: "Custom Investment" },
    { id: 4, type: "Custom Investment" },
    { id: 5, type: "Others" },
    // { id: 6, type: "Enquiry" },
    // { id: 7, type: "Feedback" },
    // { id: 8, type: "Custom Investment" },
    // { id: 9, type: "Others" },
]

const Support = () => {
    const [selected, setSelected] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative space-y-3">
            <SupportModal
                isOpen={isOpen}
                onClose={setIsOpen}
                options={['Enquiry', 'Feedback', 'Custom Investment', 'Others']}
            />
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className="text-2xl font-semibold">Support</h2>
                    <p className="text-sm text-gray-500 my-1">Get quick and effective customer support</p>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className='h-9 px-4 bg-primary text-sm rounded-md cursor-pointer'
                >
                    Start a new chat
                </button>
            </div>

            <div className='h-[80vh] flex flex-col md:flex-row border border-[#E4E7EC] rounded-xl'>
                <div className='md:w-6/12 h-full overflow-y-auto space-y-2 p-3 border-r border-[#E4E7EC]'>
                    {data.map((item, index) => (
                        <div
                            key={item + index}
                            onClick={() => setSelected(item)}
                            className={`flex items-center justify-between p-3 ${item.id === selected.id && 'bg-[#F0F2F5]'} hover:bg-gray-100 rounded-md cursor-pointer`}
                        >
                            <div className='flex items-center gap-3'>
                                <div className='w-[40px] h-[40px] flex items-center justify-center bg-[#D6D7E5] border border-[#F9FAFB] rounded-full'>
                                    <p className='capitalize'>A</p>
                                </div>
                                <div className='text-sm'>
                                    <p className='font-medium space-x-3'>
                                        <span>Admin</span>
                                        <span className='text-secondary'>|</span>
                                        <span className='text-xs text-secondary font-normal'>19804672</span>
                                    </p>
                                    <p className='text-secondary font-light'>{item.type}</p>
                                </div>
                            </div>
                            <div className='text-xs'>
                                <p>12:30</p>
                                <p className='w-[29px] h-[17px] flex items-center justify-center bg-primary rounded-full'>10</p>
                            </div>
                        </div>
                    ))}
                </div>


                <div className='w-full p-5'>
                    {/* Chat Header */}
                    <div className='flex items-center gap-3'>
                        <div className='w-[40px] h-[40px] flex items-center justify-center bg-[#D6D7E5] border border-[#F9FAFB] rounded-full'>
                            <p className='capitalize'>A</p>
                        </div>
                        <div className='text-sm'>
                            <p className='font-medium'>Admin</p>
                            <p className='text-xs text-secondary font-light'>{selected.type}</p>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className={`mt-5 w-full space-y-5 p-4 h-[60vh] overflow-y-auto cursor-pointer`}>
                        {/* Center */}
                        <div className='flex items-center justify-center'>
                            <p className="inline-block px-3 py-1 text-xs text-center rounded-full bg-[#F0F2F5] text-secondary">
                                Today
                            </p>
                        </div>

                        {/* Left */}
                        <div className='w-full flex justify-start'>
                            <div className='w-full lg:w-8/12 flex items-start gap-2'>
                                <div className='w-1/12'>
                                    <div className='w-[40px] h-[40px] flex items-center justify-center bg-[#D6D7E5] border border-[#F9FAFB] rounded-full'>
                                        <p className='capitalize'>A</p>
                                    </div>
                                </div>
                                <div className='w-full space-y-1'>
                                    <div className={`w-full flex items-center justify-between p-3 bg-[#F1F1F2] rounded-2xl`} style={{ borderTopLeftRadius: 0 }}>
                                        <div className='flex items-center gap-3 text-sm'>
                                            <File />
                                            <div className='space-y-1 text-sm'>
                                                <p>Filename.pdf</p>
                                                <p className='text-xs text-secondary'>1 page • PDF • 4mb</p>
                                            </div>
                                        </div>
                                        <Upload className="w-1/12" />
                                    </div>
                                    <div className='flex items-center justify-start text-xs text-[#344054]'>
                                        <p>Admin • 4:59PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex justify-start'>
                            <div className='w-full lg:w-8/12 flex items-start gap-2'>
                                <div className='w-1/12'>
                                    <div className='w-[40px] h-[40px] flex items-center justify-center bg-[#D6D7E5] border border-[#F9FAFB] rounded-full'>
                                        <p className='capitalize'>A</p>
                                    </div>
                                </div>
                                <div className='w-full space-y-1'>
                                    <div className={`w-full p-3 bg-[#F1F1F2] rounded-2xl`} style={{ borderTopLeftRadius: 0 }}>
                                        <div className='text-sm leading-relaxed'>
                                            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-start text-xs text-[#344054]'>
                                        <p>Admin • 4:59PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right */}
                        <div className='w-full flex justify-end'>
                            <div className='w-full lg:w-8/12 flex items-end gap-2'>
                                <div className='w-full space-y-1'>
                                    <div className={`w-full p-3 bg-[#A9E7FF] rounded-2xl`} style={{ borderBottomRightRadius: 0 }}>
                                        <div className='text-sm leading-relaxed'>
                                            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-start text-xs text-[#344054]'>
                                        <p>You • 4:59PM</p>
                                    </div>
                                </div>
                                <div className='w-[40px] h-[40px]'>
                                    <Check className='w-5 h-5' />
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-end'>
                            <div className='w-full lg:w-8/12 flex items-end gap-2'>
                                <div className='w-full space-y-1'>
                                    <div className={`w-full p-3 bg-[#A9E7FF] rounded-2xl`} style={{ borderBottomRightRadius: 0 }}>
                                        <div className='text-sm leading-relaxed'>
                                            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-start text-xs text-[#344054]'>
                                        <p>You • 4:59PM</p>
                                    </div>
                                </div>
                                <div className='w-[40px] h-[40px]'>
                                    <Check className='w-5 h-5' />
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-end'>
                            <div className='w-full lg:w-8/12 flex items-end gap-2'>
                                <div className='w-full space-y-1'>
                                    <div className={`w-full flex items-center justify-between p-3 bg-[#A9E7FF] rounded-2xl`} style={{ borderTopLeftRadius: 0 }}>
                                        <div className='flex items-center gap-3 text-sm'>
                                            <File />
                                            <div className='space-y-1 text-sm'>
                                                <p>Filename.pdf</p>
                                                <p className='text-xs text-secondary'>1 page • PDF • 4mb</p>
                                            </div>
                                        </div>
                                        <Upload className="w-1/12" />
                                    </div>
                                    <div className='flex items-center justify-start text-xs text-[#344054]'>
                                        <p>You • 4:59PM</p>
                                    </div>
                                </div>
                                <div className='w-[40px] h-[40px]'>
                                    <Check className='w-5 h-5' />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Form  */}
                    <form className='flex items-center gap-5'>
                        <div className='w-full relative mt-1'>
                            <textarea
                                name="message"
                                className={`w-full text-sm font-light h-12 px-4 pt-4 py-2 border border-[#D0D5DD] rounded-lg focus:outline-none resize-none`}
                                placeholder='Write your message'
                            />
                            <input
                                type="file"
                                id="attachment"
                                name='attachment'
                                hidden
                            // onChange={handleImageUpload}
                            />
                            <label
                                htmlFor="attachment"
                            >
                                <Attachment className="absolute top-4 right-4 cursor-pointer" />
                            </label>
                        </div>
                        <div className='w-[49px] h-[49px] flex items-center justify-center bg-primary rounded-lg cursor-pointer'>
                            <Send />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Support;

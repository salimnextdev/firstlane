import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addSupport, fetchSupportConversations, fetchSupports } from '@/modules/support/states/supportSlice';
import { uploadFile } from '@/modules/kyc/state/kycSlice';
import { getCookie } from '@/utils/cookieUtils';

import { Check } from 'lucide-react';
import { ReactComponent as File } from '@/assets/icons/file.svg';
import { ReactComponent as Attachment } from '@/assets/icons/attachment.svg';
import { ReactComponent as Send } from '@/assets/icons/sent.svg';
import { ReactComponent as Upload } from '@/assets/icons/upload.svg';
import { ReactComponent as ChatPlus } from '@/assets/icons/chat-plus.svg';
import { ReactComponent as ArrowLeft } from '@/assets/icons/arrow-left.svg';

import SupportModal from '@/modules/support/components/supportModal';
import BackButton from '@/components/BackButton';
import SupportListSkeleton from '../components/supportListSkeleton';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import SupportChatSkeleton from '../components/supportChatSkeleton';
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2';
import { formatDateToday } from '@/utils/datetimeFormats';
import { IoIosClose } from 'react-icons/io';
import NoContent from '@/components/NoContent';

const LIMIT = 10;

const Support = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(getCookie('user') || null);
    const { searchTerm } = useSelector((state) => state.search);
    const {
        supports: allSupports,
        metaData: metaData,
        supportConversations,
        loading,
        error,
        support_loading,
        support_error,
    } = useSelector((state) => state.support);

    useEffect(() => {
        if (!loading) {
            dispatch(fetchSupports({ key: 'userID', value: user?._id, page: 1, limit: LIMIT }));
        }
    }, [dispatch]);

    const [selected, setSelected] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Apply the filter logic directly to allSupports
    const supports = allSupports.filter(support =>
        support.subject?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        support.message?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        support.status?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    // Support modal state
    const [isOpen, setIsOpen] = useState(false);
    const [selectedModalOption, setSelectedModalOption] = useState(null);
    const handleModalChange = (value) => {
        setSelectedModalOption(value);
    };
    const handleModalClose = () => {
        setIsOpen(false);
        setSelected({ new: selectedModalOption });
    };

    const INITIAL_DATA = {
        attachment: "",
        message: ""
    };
    const [submitted, setSubmitted] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [formData, setFormData] = useState(INITIAL_DATA);
    const handleChange = (e) => {
        const { name, type, files, value } = e.target;

        if (type === 'file') {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                [name]: { file },
            }));

            // Preview if it's an image
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result); // Set preview image
                };
                reader.readAsDataURL(file);
            } else {
                setPreviewImage(null); // Not an image
            }

        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const removePreviewImage = () => {
        setFormData((prev) => ({
            ...prev,
            attachment: "",
        }));
        setPreviewImage(null);
    };

    const validateForm = () => {
        const errors = {};
        if (!selected && !selectedModalOption) errors.selectedModalOption = "Please select a support type!";
        return errors;
    };

    const loadMore = () => {
        if (parseInt(metaData?.currentPage) < parseInt(metaData?.totalPage)) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            dispatch(fetchSupports({ key: 'userID', value: user?._id, page: nextPage, limit: LIMIT }));
        }
    };

    const getConversations = async (supportChat) => {
        setSelected(supportChat);
        await dispatch(fetchSupportConversations(supportChat?._id));
    }

    const submitSupport = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).map(error => {
                toast.error(error);
            });
            setSubmitted(false);
            return;
        };
        setSubmitted(true);

        try {
            let attachment;
            if (formData.attachment && formData.attachment.file instanceof File) {
                attachment = await dispatch(uploadFile({ files: formData.attachment.file }));
                if (!uploadFile.fulfilled.match(attachment)) {
                    toast('File Upload Failed',
                        { description: attachment.payload.message }
                    );
                    return;
                }
            } else { attachment = formData.attachment };

            const data = {
                "userID": user?._id,
                "subject": selectedModalOption,
                "description": formData.message,
                "status": "open",
                "priority": "low",
                "message": formData.message,
                "url": attachment.payload?.data[0]?.url || attachment
            };

            // Only add supportID for existing support, passing it as an empty string will cause errors
            if (selected?.message) {
                data.supportID = selected?._id;
            }

            const msg = selected?.message ? "Reply sent successfully!" : "Support ticket created successfully!"
            await dispatch(addSupport(data)).unwrap();
            selected?.new && setSelected(null); // Display the support list after creating a new support ticket.

            await dispatch(fetchSupports({ key: 'userID', value: user?._id, page: 1, limit: LIMIT }));
            selected?.message && await getConversations(selected); // Fetch conversations for already existing support ticket.
            setFormData(INITIAL_DATA);
            toast.success(msg);
        } catch (error) {
            toast.error("An error occured", {
                description: error.message,
            });
        } finally {
            setSubmitted(false);
        }
    };

    // Sort conversations by creation date
    const sortedConversations = [...supportConversations].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return (
        <div className="relative space-y-3">
            <SupportModal
                isOpen={isOpen}
                onClose={setIsOpen}
                selectedOption={selectedModalOption}
                handleChange={handleModalChange}
                options={['Enquiry', 'Feedback', 'Custom Investment', 'Others']}
                buttonSuccessAction={handleModalClose}
            />

            {selected?.new ?
                <BackButton onClick={() => setSelected(null)} className='md:hidden' /> :
                <BackButton className='md:hidden' />
            }

            <div className='flex items-center justify-between'>
                <div className="hidden md:block">
                    <h2 className="text-2xl font-semibold">Support</h2>
                    <p className="text-sm text-gray-500 my-1 font-light">Get quick and effective customer support</p>
                </div>
                {!selected && <p className='md:hidden text-base font-medium'>Chat with Support</p>}

                <button
                    onClick={() => setIsOpen(true)}
                    className={`fixed md:static bottom-8 md:bottom-auto right-6 z-10 h-12 ${selected && 'hidden md:block'} md:h-9 px-3 bg-primary text-sm rounded-lg cursor-pointer`}
                >
                    <span className='hidden md:inline-block'>Start a new chat</span>
                    <ChatPlus className="md:hidden" />
                </button>
            </div>

            <div className='h-[80vh] flex flex-col md:flex-row md:border border-gray rounded-xl'>

                <div className={`w-full md:w-6/12 h-full ${selected && 'hidden md:block'} overflow-y-auto space-y-2 md:p-3 md:border-r border-gray`}>
                    {loading ? <SupportListSkeleton /> :
                        supports.length > 0 ?
                            supports.map((item, index) => (
                                <div
                                    key={item?._id}
                                    onClick={() => getConversations(item)}
                                    className={`flex items-center justify-between py-2 md:p-3 ${item?._id === selected?._id && 'bg-currency'} md:hover:bg-gray-100 rounded-md cursor-pointer`}
                                >
                                    <div className='flex items-center gap-3'>
                                        <div className='w-[40px] h-[40px] flex items-center justify-center text-black bg-[var(--firstlane-primary-light)] border border-[var(--firstlane-bg-light)] rounded-full'>
                                            <p className='capitalize'>A</p>
                                        </div>
                                        <div className='text-sm font-light'>
                                            <p className='font-medium space-x-3'>
                                                <span>Admin</span>
                                                <span className='text-secondary'>|</span>
                                                <span
                                                    className={`inline-flex items-center justify-center px-3 py-0.5 text-xs font-normal capitalize rounded-full
                                                ${item?.status === 'closed' ? 'bg-success' :
                                                            item?.status === 'open' ? 'bg-warning' :
                                                                'bg-danger'}`
                                                    }
                                                >
                                                    {item?.status}
                                                </span>
                                            </p>
                                            <p className='text-secondary capitalize'>{item?.subject}</p>
                                        </div>
                                    </div>
                                    <div className='text-xs font-light'>
                                        <p>{formatDateToday(item?.createdAt)?.split(',')[1]}</p>
                                        <p className='float-right text-secondary'>{formatDateToday(item?.createdAt)?.split(',')[0]}</p>
                                        {/* <p className='w-[29px] h-[17px] float-right flex items-center justify-center bg-primary rounded-full'>10</p> */}
                                    </div>
                                </div>
                            )) :
                            <NoContent
                                icon="support"
                                title="No support ticket found"
                                description="You currently have no support tickets. Once you create a ticket, it will appear here."
                                className="h-full"
                            />
                    }

                    {/* Load More Button */}
                    {(metaData?.totalPage > currentPage) &&
                        <div className='flex items-center justify-center font-light'>
                            <button
                                onClick={loadMore}
                                className="inline-block w-20 py-2 text-xs text-center rounded-full bg-currency text-secondary cursor-pointer"
                                disabled={loading}
                            >
                                {loading ?
                                    <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                                    'Load More'
                                }
                            </button>
                        </div>
                    }
                </div>

                <div className={`w-full md:p-3 ${!selected && 'hidden md:block'}`}>
                    {(loading || support_loading) ? <SupportChatSkeleton /> :
                        <>
                            {/* Chat Header */}
                            {selected?.subject &&
                                <div className='flex items-center gap-3 pb-3 md:p-0 border-b border-gray md:border-0'>
                                    <ArrowLeft onClick={() => setSelected(null)} className='md:hidden cursor-pointer' />
                                    <div className='w-[40px] h-[40px] flex items-center justify-center text-black bg-[var(--firstlane-primary-light)] border border-[var(--firstlane-bg-light)] rounded-full'>
                                        <p className='capitalize'>A</p>
                                    </div>
                                    <div className='flex flex-col items-start text-sm'>
                                        <p className='font-medium'>Admin</p>
                                        <p className='flex items-center gap-3 text-xs text-secondary font-light'>
                                            <span className='capitalize'>{selected?.subject}</span>
                                            <span className='md:hidden'>|</span>
                                            <span
                                                className={`inline-flex items-center justify-center px-3 py-0.5 text-xs font-normal capitalize rounded-full
                                                ${selected?.status === 'closed' ? 'bg-success' :
                                                        selected?.status === 'open' ? 'bg-warning' :
                                                            'bg-danger'}`
                                                }
                                            >
                                                {selected?.status}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            }

                            {/* Chat Area */}
                            <div className={`mt-5 mb-24 md:mb-0 w-full space-y-3 ${selected ? 'md:h-[60vh]' : 'md:h-[65vh]'} overflow-y-auto cursor-pointer`}>
                                {(selected?.new ?
                                    (<div className='w-full h-[60vh] md:h-[40vh] flex flex-col items-center justify-center gap-5 text-center font-light'>
                                        <div className="w-15 h-15 bg-[#D8D9EA] rounded-full flex items-center justify-center">
                                            <HiOutlineChatBubbleBottomCenterText className="w-8 h-8" />
                                        </div>
                                        <p className='mx-8 md:mx-0 text-sm md:text-base text-secondary'>
                                            Start typing to open or reply a support conversation.
                                        </p>
                                    </div>) :
                                    sortedConversations.length === 0 && !selected?.message ?
                                        (
                                            <div className='w-full h-[40vh] flex flex-col items-center justify-center gap-5 text-center font-light'>
                                                <div className="w-15 h-15 bg-[#D8D9EA] rounded-full flex items-center justify-center">
                                                    <HiOutlineChatBubbleBottomCenterText className="w-8 h-8" />
                                                </div>
                                                <p className='mx-8 md:mx-0 text-sm md:text-base text-secondary'>
                                                    Select a support ticket to view conversations!
                                                </p>
                                            </div>
                                        ) :
                                        <>
                                            {/* Single Date Tag at the top */}
                                            <div className='mb-2 flex items-center justify-center font-light'>
                                                <p className="inline-block px-2 py-1 text-xs text-center rounded-full bg-currency text-secondary">
                                                    {formatDateToday(selected?.createdAt)?.split(',')[0]}
                                                </p>
                                            </div>

                                            {/* Manually added initial message since it is not coming from the backend */}
                                            <div className='w-full flex justify-end'>
                                                <div className='w-11/12 lg:w-8/12 flex items-end gap-2'>
                                                    <div className='w-full space-y-1 font-light'>
                                                        <div
                                                            className={`w-full p-3 bg-[#A9E7FF] text-black rounded-xl md:rounded-2xl`}
                                                        >
                                                            <div className='text-sm leading-relaxed'>
                                                                {selected?.message}
                                                            </div>
                                                        </div>
                                                        {selected?.url &&
                                                            <div className={`w-full flex items-center justify-between p-3 bg-[#A9E7FF] text-black rounded-2xl`} style={{ borderTopLeftRadius: 0 }}>
                                                                <div className='flex items-center gap-3 text-sm'>
                                                                    <File />
                                                                    <div className='space-y-1 text-sm'>
                                                                        <p className='truncate'>{selected?.url?.split('/')?.pop()}</p>
                                                                        <p className='text-xs text-gray-700'>1 page • PDF • 4mb</p>
                                                                    </div>
                                                                </div>
                                                                <a href={selected?.url} download>
                                                                    <Upload className="w-full" />
                                                                </a>
                                                            </div>
                                                        }
                                                        <div className='flex items-center justify-end text-xs text-gray-500'>
                                                            <p>You • {formatDateToday(selected?.createdAt)}</p>
                                                        </div>
                                                    </div>
                                                    <div className='hidden md:block w-[40px] h-[40px]'>
                                                        <Check className='w-5 h-5' />
                                                    </div>
                                                </div>
                                            </div>

                                            {sortedConversations.map((message) => {
                                                const isUser = user?._id === message.userID?._id;
                                                return (
                                                    <div key={message._id}>
                                                        {isUser ? (
                                                            <div className='w-full flex justify-end'>
                                                                <div className='w-11/12 lg:w-8/12 flex items-end gap-2'>
                                                                    <div className='w-full space-y-1 font-light'>
                                                                        <div
                                                                            className={`w-full p-3 bg-[#A9E7FF] text-black rounded-xl md:rounded-2xl`}
                                                                        >
                                                                            <div className='text-sm leading-relaxed'>
                                                                                {message?.message}
                                                                            </div>
                                                                        </div>
                                                                        {message?.url &&
                                                                            <div className={`w-full flex items-center justify-between p-3 bg-[#A9E7FF] text-black rounded-2xl`} style={{ borderTopLeftRadius: 0 }}>
                                                                                <div className='flex items-center gap-3 text-sm'>
                                                                                    <File />
                                                                                    <div className='space-y-1 text-sm'>
                                                                                        <p className='truncate'>{message?.url?.split('/')?.pop()}</p>
                                                                                        <p className='text-xs text-gray-700'>1 page • PDF • 4mb</p>
                                                                                    </div>
                                                                                </div>
                                                                                <a href={message?.url} download>
                                                                                    <Upload className="w-full" />
                                                                                </a>
                                                                            </div>
                                                                        }
                                                                        <div className='flex items-center justify-end text-xs text-gray-500'>
                                                                            <p>You • {formatDateToday(message?.createdAt)}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className='hidden md:block w-[40px] h-[40px]'>
                                                                        <Check className='w-5 h-5' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className='w-full flex justify-start'>
                                                                <div className='w-11/12 lg:w-8/12 flex items-start gap-2'>
                                                                    <div className='w-1/12 hidden md:block'>
                                                                        <div className='w-[40px] h-[40px] flex items-center justify-center text-black bg-[var(--firstlane-primary-light)] border border-[var(--firstlane-bg-light)] rounded-full'>
                                                                            <p className='capitalize'>A</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className='w-full space-y-1 font-light'>
                                                                        <div
                                                                            className={`w-full p-3 bg-currency rounded-xl md:rounded-2xl`}
                                                                        >
                                                                            <div className='text-sm leading-relaxed'>
                                                                                {message?.message}
                                                                            </div>
                                                                        </div>
                                                                        {message?.url &&
                                                                            <div className={`w-full flex items-center justify-between p-3 bg-currency rounded-2xl`} style={{ borderTopLeftRadius: 0 }}>
                                                                                <div className='flex items-center gap-3 text-sm'>
                                                                                    <File />
                                                                                    <div className='space-y-1 text-sm'>
                                                                                        <p className='truncate'>{message?.url?.split('/')?.pop()}</p>
                                                                                        <p className='text-xs text-secondary'>1 page • PDF • 4mb</p>
                                                                                    </div>
                                                                                </div>
                                                                                <a href={message?.url} download>
                                                                                    <Upload className="w-full" />
                                                                                </a>
                                                                            </div>
                                                                        }
                                                                        <div className='flex items-center justify-start text-xs text-gray-500'>
                                                                            <p>Admin • {formatDateToday(message?.createdAt)}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </>
                                )
                                }
                            </div>
                        </>
                    }

                    {/* Chat Form  */}
                    <div className='relative'>
                        <div className="fixed md:static left-0 bottom-0 z-10 w-full md:w-auto md:px-0 bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                            <form onSubmit={submitSupport} method='post' className='flex items-center gap-2 md:gap-3 md:mr-0 mt-1 px-2'>
                                <div className='w-[90%] relative mt-1'>
                                    <textarea
                                        name="message"
                                        className={`w-full text-sm font-light h-12 px-4 pt-4 py-2 pr-10 border border-gray rounded-xl focus:outline-none resize-none`}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder='Write your message'
                                    />
                                    {/* Upload Input */}
                                    <input
                                        type="file"
                                        id="attachment"
                                        name="attachment"
                                        className="hidden"
                                        onChange={handleChange}
                                        accept="image/*"
                                    />

                                    {/* Attachment Icon */}
                                    <label htmlFor="attachment">
                                        <Attachment className="absolute top-4 right-4 cursor-pointer" />
                                    </label>

                                    {/* Image Preview */}
                                    {previewImage && (
                                        <div className="absolute bottom-full right-0 mb-2 w-[50px] h-[50px] rounded-md overflow-hidden border border-gray-300 shadow-md">
                                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={removePreviewImage}
                                                className="absolute top-0 right-0 w-4 h-4 bg-gray-50 text-black rounded-full flex items-center justify-center shadow hover:bg-gray-100"
                                            >
                                                <IoIosClose className='w-4 h-4' />
                                            </button>
                                        </div>
                                    )}

                                </div>

                                <button
                                    className='!w-[49px] h-[49px] flex items-center justify-center bg-primary rounded-xl cursor-pointer'
                                    disabled={submitted}
                                >
                                    {submitted ? (
                                        <Loader rotate={360} className='text-xl animate-spin mx-auto' />
                                    ) : (
                                        <Send />
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
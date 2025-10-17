import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, deleteAccount } from '@/modules/auth/state/authSlice';
import { removeCookie } from '@/utils/cookieUtils';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ReactComponent as User } from '@/assets/icons/user.svg';
import { ReactComponent as ShieldX } from '@/assets/icons/shieldx.svg';
import { ReactComponent as Bell } from '@/assets/icons/bell-sm.svg';
import { ReactComponent as Bank } from '@/assets/icons/bank-sm.svg';
import { ReactComponent as License } from '@/assets/icons/license.svg';
import { ReactComponent as Trash } from '@/assets/icons/trash.svg';

import Profile from '../tabs/profile';
import ChangePassword from '../tabs/change_password';
import Notifications from '../tabs/notifications';
import BankDetails from '../tabs/bank_details';
import Terms from '../tabs/terms';

import TextInput from '@/components/FormInputs/TextInput';
import DeleteAccountModal from '@/components/DeleteAccountModal';
import BackButton from '@/components/BackButton';
import FullscreenLoader from '@/components/FullscreenLoader';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const Settings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userProfile: userProfile, loading: loading, error: error } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!loading) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch]);

    const [searchParams, setSearchParams] = useSearchParams();
    const param = searchParams.get('tab');
    useEffect(() => {
        if (param) {
            setCurrentTab(param);
            setSelected(true);
        }
    }, [param]);

    // Mangage Fullscreen Loader State
    const [isLoaderOpen, setIsLoaderOpen] = useState(true);
    useEffect(() => {
        if (userProfile) {
            setIsLoaderOpen(false);
        }
    }, [userProfile]);

    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [selected, setSelected] = useState(false);
    const [currentTab, setCurrentTab] = useState("profile");
    const tabs = ["profile", "password", "notifications", "bank_details", "terms", "actions"];
    const mapper = {
        "profile": "Profile",
        "password": "Change password",
        "notifications": "Notifications",
        "bank_details": "Bank details",
        "terms": "Terms and privacy policy",
        "actions": "Delete account",
    };

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        reason: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.email) errors.email = "Email is required";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).map(error => {
                toast.warning(error);
            });
            return;
        };

        setSubmitted(true);
        try {
            const resultAction = await dispatch(deleteAccount(formData));
            if (deleteAccount.fulfilled.match(resultAction)) {
                removeCookie("token");
                removeCookie("user");
                setShowModal(true);
            } else {
                toast.error(resultAction.payload.message);
                return;
            };
        } catch (error) {
            toast.error("An error occured", {
                description: error.message,
            });
        } finally {
            setSubmitted(false);
        }
    };

    return (
        <div className="space-y-3">
            <FullscreenLoader
                isOpen={isLoaderOpen}
                onClose={setIsLoaderOpen}
            />

            <DeleteAccountModal
                isOpen={showModal}
                onClose={setShowModal}
            />

            {/* Controls the back button routing */}
            {!selected ?
                <BackButton className="md:hidden" /> :
                <BackButton onClick={() => setSelected(false)} className="md:hidden" />
            }

            <div>
                {!selected ?
                    <h2 className="text-base md:text-2xl font-bold">Settings</h2> :
                    <h2 className="text-base md:text-2xl font-medium">{mapper[currentTab]}</h2>
                }
                <p className="hidden md:block text-sm text-gray-500 font-light my-1">Make changes to your Firstlane experience</p>
            </div>

            <div className='md:h-screen md:border border-gray rounded-xl'>
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full h-full flex flex-col md:flex-row">
                    <div className={`${selected && 'hidden md:block'} md:border-r border-gray`}>
                        <TabsList className="w-full md:w-[384px] h-full md:h-auto md:mt-4 flex flex-col gap-2 md:px-5">
                            {/* Profile Tab */}
                            <div
                                onClick={() => setSelected(true)}
                                className={`w-full flex items-center ${currentTab === 'profile' && 'md:bg-currency'} md:px-2 rounded-md`}
                            >
                                <User />
                                <TabsTrigger
                                    value="profile"
                                    className="flex-grow flex items-center justify-start p-3 text-sm !font-normal cursor-pointer !shadow-none text-left"
                                >
                                    <p>Profile</p>
                                    <span className={`md:hidden px-3 py-1 text-xs ${userProfile?.verifications?.status === 'verified' ? 'bg-success' : 'bg-warning'} rounded-full`}>
                                        {userProfile?.verifications?.status === 'verified' ? 'KYC verified' : 'KYC pending'}
                                    </span>
                                </TabsTrigger>
                            </div>

                            {/* Change Password Tab */}
                            <div
                                onClick={() => setSelected(true)}
                                className={`w-full flex items-center ${currentTab === 'password' && 'md:bg-currency'} md:px-2 rounded-md`}
                            >
                                <ShieldX />
                                <TabsTrigger
                                    value="password"
                                    className="flex-grow flex items-center justify-start p-3 text-sm !font-normal cursor-pointer !shadow-none text-left"
                                >
                                    <p>Change password</p>
                                </TabsTrigger>
                            </div>

                            {/* Notifications Tab */}
                            <div
                                onClick={() => setSelected(true)}
                                className={`w-full flex items-center ${currentTab === 'notifications' && 'md:bg-currency'} md:px-2 rounded-md`}
                            >
                                <Bell />
                                <TabsTrigger
                                    value="notifications"
                                    className="flex-grow flex items-center justify-start p-3 text-sm !font-normal cursor-pointer !shadow-none text-left"
                                >
                                    <p>Notifications</p>
                                </TabsTrigger>
                            </div>

                            {/* Bank Details Tab */}
                            <div
                                onClick={() => setSelected(true)}
                                className={`w-full flex items-center ${currentTab === 'bank_details' && 'md:bg-currency'} md:px-2 rounded-md`}
                            >
                                <Bank />
                                <TabsTrigger
                                    value="bank_details"
                                    className="flex-grow flex items-center justify-start p-3 text-sm !font-normal cursor-pointer !shadow-none text-left"
                                >
                                    <p>Bank details</p>
                                </TabsTrigger>
                            </div>

                            {/* Terms & Privacy Policy Tab */}
                            <div
                                onClick={() => setSelected(true)}
                                className={`hidden w-full md:flex items-center ${currentTab === 'terms' && 'md:bg-currency'} md:px-2 rounded-md`}
                            >
                                <License />
                                <TabsTrigger
                                    value="terms"
                                    // Corrected class for terms - pyxt-sm looks like a typo, assuming p-3 is intended
                                    className="flex-grow flex items-center justify-start p-3 text-sm !font-normal cursor-pointer !shadow-none text-left"
                                >
                                    <p>Terms & privacy policy</p>
                                </TabsTrigger>
                            </div>

                            {/* Delete Account Tab */}
                            <div
                                onClick={() => setSelected(true)}
                                className={`hidden w-full md:flex items-center ${currentTab === 'actions' && 'md:bg-currency'} md:px-2 rounded-md`}
                            >
                                <Trash />
                                <TabsTrigger
                                    value="actions"
                                    className="flex-grow flex items-center justify-start p-3 text-sm !font-normal cursor-pointer !shadow-none text-left"
                                >
                                    <p className='text-[#D42620]'>Delete account</p>
                                </TabsTrigger>
                            </div>

                        </TabsList>
                    </div>

                    <div className={`${!selected && 'hidden md:block'} w-full md:p-5`}>
                        <TabsContent value="profile">
                            <Profile />
                        </TabsContent>
                        <TabsContent value="password">
                            <ChangePassword />
                        </TabsContent>
                        <TabsContent value="notifications">
                            <Notifications />
                        </TabsContent>
                        <TabsContent value="bank_details">
                            <BankDetails />
                        </TabsContent>
                        <TabsContent value="terms">
                            <Terms />
                        </TabsContent>
                        <TabsContent value="actions">
                            <form onSubmit={handleSubmit} className={`${isOpen ? 'block space-y-4' : 'hidden'}`}>
                                <p className='text-base font-light text-justify'>
                                    To delete, enter your email and reason accurately to complete process
                                </p>

                                <div className='flex flex-col md:flex-row items-center gap-5'>
                                    <TextInput
                                        label="Email"
                                        name="email"
                                        type='email'
                                        className='w-full text-sm'
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Adam@gmail.com"
                                    />

                                    <TextInput
                                        label="Reason (optional)"
                                        name="reason"
                                        className='w-full text-sm'
                                        value={formData.reason}
                                        onChange={handleChange}
                                        placeholder="Reason for deleting account"
                                    />
                                </div>

                                <div className="fixed md:static left-0 bottom-0 z-10 w-full h-[122px] px-5 md:px-0 bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                                    <div className='flex flex-col md:flex-row items-center gap-1 md:gap-5 mt-3 md:mt-5'>
                                        <button
                                            type='button'
                                            onClick={() => setIsOpen(false)}
                                            className='w-full md:w-36 h-11 md:h-9 rounded-md bg-[#CB1A14] text-sm text-white cursor-pointer'
                                        >
                                            Go back
                                        </button>
                                        <button
                                            className='w-full md:w-36 h-11 md:h-9 rounded-md border border-[#D0D5DD] text-sm cursor-pointer'
                                        >
                                            {submitted ?
                                                <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                                                'Delete'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <div className={`${isOpen ? 'hidden' : 'block space-y-4'}`}>
                                <p className='md:w-11/12 text-base font-light text-justify'>
                                    Deleting your Firstlane account means you would not be able to access your financial information,
                                    investments, loans, wallet balances, transaction histories and more.
                                    This is an irreversible action. Are you sure you want to proceed with this action?
                                </p>

                                <div className="fixed md:static left-0 bottom-0 z-10 w-full h-[122px] px-5 md:px-0 bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                                    <div className='flex flex-col md:flex-row items-center gap-1 md:gap-5 mt-3 md:mt-5'>
                                        <button
                                            onClick={() => navigate('/dashboard')}
                                            className='w-full md:w-36 h-11 md:h-9 rounded-md bg-[#CB1A14] text-sm text-white cursor-pointer'
                                        >
                                            No, return home
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => setIsOpen(true)}
                                            className='w-full md:w-36 h-11 md:h-9 rounded-md border border-[#D0D5DD] text-sm cursor-pointer'
                                        >
                                            Yes, delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </div>

                </Tabs>
            </div>
        </div>
    );
};

export default Settings;

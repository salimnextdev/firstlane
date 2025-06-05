import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ReactComponent as User } from '@/assets/icons/user.svg';
import { ReactComponent as ShieldX } from '@/assets/icons/shieldx.svg';
import { ReactComponent as Bell } from '@/assets/icons/bell.svg';
import { ReactComponent as Bank } from '@/assets/icons/bank.svg';
import { ReactComponent as License } from '@/assets/icons/license.svg';
import { ReactComponent as Trash } from '@/assets/icons/trash.svg';
import Profile from '../tabs/profile';
import ChangePassword from '../tabs/change_password';
import Notifications from '../tabs/notifications';
import BankDetails from '../tabs/bank_details';
import TextInput from '@/components/FormInputs/TextInput';
import MobileSuccessPage from '@/components/MobileSuccessPage';

const Settings = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(true);

    const [currentTab, setCurrentTab] = useState("profile");
    const tabs = ["profile", "password", "notifications", "bank_details", "terms", "actions"];

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="relative space-y-3">
            <MobileSuccessPage
                isOpen={showModal}
                onClose={setShowModal}
                title="It hurts to see you leave. You can always change your mind and return. Firstlane misses you. "
                buttonSuccessText="Create account"
                buttonSuccessLink="/signup"
            />
            <div>
                <h2 className="text-2xl font-bold">Settings</h2>
                <p className="text-sm text-gray-500 font-light my-1">Make changes to your Firstlane experience</p>
            </div>

            <div className='h-screen border border-[#E4E7EC] rounded-xl'>
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full h-screen flex flex-col md:flex-row">
                    <div className='border-r border-[#E4E7EC]'>
                        <TabsList className="relative md:w-[384px] h-2/4 flex flex-col gap-2 p-5">
                            <TabsTrigger
                                value="profile"
                                className="w-full flex items-center justify-start gap-3 p-3 text-sm !font-normal cursor-pointer data-[state=active]:bg-[#F0F2F5] !shadow-none"
                            >
                                <User className="w-5 h-5 shrink-0" />
                                <p>Profile</p>
                            </TabsTrigger>

                            <TabsTrigger
                                value="password"
                                className="w-full flex items-center justify-start gap-3 p-3 text-sm !font-normal cursor-pointer data-[state=active]:bg-[#F0F2F5] !shadow-none"
                            >
                                <ShieldX className="w-5 h-5 shrink-0" />
                                <p>Change password</p>
                            </TabsTrigger>

                            <TabsTrigger
                                value="notifications"
                                className="w-full flex items-center justify-start gap-3 p-3 text-sm !font-normal cursor-pointer data-[state=active]:bg-[#F0F2F5] !shadow-none"
                            >
                                <Bell className="w-5 h-5 shrink-0" />
                                <p>Notifications</p>
                            </TabsTrigger>

                            <TabsTrigger
                                value="bank_details"
                                className="w-full flex items-center justify-start gap-3 p-3 text-sm !font-normal cursor-pointer data-[state=active]:bg-[#F0F2F5] !shadow-none"
                            >
                                <Bank className="w-5 h-5 shrink-0" />
                                <p>Bank details</p>
                            </TabsTrigger>

                            <TabsTrigger
                                value="terms"
                                className="w-full flex items-center justify-start gap-3 p-3 pyxt-sm !font-normal cursor-pointer data-[state=active]:bg-[#F0F2F5] !shadow-none"
                            >
                                <License className="w-5 h-5 shrink-0" />
                                <p>Terms & privacy policy</p>
                            </TabsTrigger>

                            <TabsTrigger
                                value="actions"
                                className="w-full flex items-center justify-start gap-3 p-3 text-sm !font-normal cursor-pointer data-[state=active]:bg-[#F0F2F5] !shadow-none"
                            >
                                <Trash className="w-5 h-5 shrink-0" />
                                <p className='text-[#D42620]'>Delete account</p>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className='w-full p-5'>
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
                        <TabsContent value="actions">
                            <div className={`${isOpen ? 'block space-y-4' : 'hidden'}`}>
                                <p className='text-base font-light text-justify'>
                                    To delete, enter your first name and last name accurately to complete process
                                </p>

                                <div className='flex flex-col md:flex-row items-center gap-5'>
                                    <TextInput
                                        label="First name"
                                        name="first_name"
                                        className='w-full text-sm'
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        placeholder="Adam"
                                    />

                                    <TextInput
                                        label="Last name"
                                        name="last_name"
                                        className='w-full text-sm'
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        placeholder="Jude"
                                    />
                                </div>

                                <div className='flex items-center gap-5 mt-5'>
                                    <button
                                        onClick={()=> setIsOpen(false)}
                                        className='w-full md:w-36 h-9 rounded-md bg-[#CB1A14] text-sm text-white cursor-pointer'
                                    >
                                        Go back
                                    </button>
                                    <button
                                        onClick={()=> setShowModal(true)}
                                        className='w-full md:w-36 h-9 rounded-md border border-[#D0D5DD] text-sm cursor-pointer'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className={`${isOpen ? 'hidden' : 'block space-y-4'}`}>
                                <p className='md:w-11/12 text-base font-light text-justify'>
                                    Deleting your Firstlane account means you would not be able to access your financial information,
                                    investments, loans, wallet balances, transaction histories and more.
                                    This is an irreversible action. Are you sure you want to proceed with this action?
                                </p>
                                <div className='flex items-center gap-5 mt-5'>
                                    <button
                                        onClick={()=> navigate('/dashboard')}
                                        className='w-full md:w-36 h-9 rounded-md bg-[#CB1A14] text-sm text-white cursor-pointer'
                                    >
                                        No, return home
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => setIsOpen(true)}
                                        className='w-full md:w-36 h-9 rounded-md border border-[#D0D5DD] text-sm cursor-pointer'
                                    >
                                        Yes, delete
                                    </button>
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

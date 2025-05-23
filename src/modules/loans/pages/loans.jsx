import React, { useState } from 'react';
import SelectInput from '@/components/FormInputs/SelectInput';
import { RiEyeCloseLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';

const data = [
    {
        title: "Personal Loans",
        description: "This is a perfect loan for individuals who have a need or two to meet and would want to take a loan to meet those needs.",
        link: "/loans/personal-loans"
    },
    {
        title: "Business Loans",
        description: "This is a perfect loan for businesses, SMEs who need loans to boost capital and strengthen productivity.",
        link: "/loans/business-loans"
    },
    {
        title: "Employee Loans",
        description: "This is a perfect loan for employees of organization who would need loans to take care of needs around them.",
        link: "/loans/employee-loans"
    },
    {
        title: "Asset Finance Loans",
        description: "This is a perfect loan for individuals or business looking to get a loan for a particular asset that would be profit-generating.",
        link: "/loans/finance-loans"
    },
]

const Loans = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('');

    return (
        <div className="relative space-y-8">
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className="text-2xl font-semibold">Loans</h2>
                    <p className="text-xs text-gray-500 my-1">Track and manage your loans safely 💰</p>
                </div>
                <div className='w-1/4 flex items-center gap-3'>
                    <button
                        onClick={() => navigate('/loans/applications')}
                        className='w-full h-9 bg-[#D8D9EA] text-primary text-xs rounded-md cursor-pointer'
                    >
                        Loan applications
                    </button>

                    <SelectInput
                        label=""
                        name="filter"
                        className='w-full !h-9 text-xs m-0 px-2 cursor-pointer'
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        options={[
                            { label: "Mr", value: "Mr" },
                            { label: "Mrs", value: "Mrs" },
                            { label: "Sir", value: "Sir" },
                            { label: "Miss", value: "Miss" },
                        ]}
                        placeholder="This month"
                    />
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className='bg-[#F9FAFB] p-5 space-y-3 border border-[#E4E7EC] rounded-xl'>
                    <p className="text-sm text-secondary">Total loan collected</p>
                    <div className='flex items-center gap-5'>
                        <p className="text-2xl font-semibold">₦{1210000.00.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</p>
                        <RiEyeCloseLine className="w-6 h-6 text-[#98A2B3] cursor-pointer" />
                    </div>
                </div>
                <div className='bg-[#F9FAFB] p-5 space-y-3 border border-[#E4E7EC] rounded-xl'>
                    <p className="text-sm text-secondary">Total loan repaid</p>
                    <div className='flex items-center gap-5'>
                        <p className="text-2xl font-semibold">₦{1000000.00.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</p>
                        <RiEyeCloseLine className="w-6 h-6 text-[#98A2B3] cursor-pointer" />
                    </div>
                </div>
                <div className='bg-[#F9FAFB] p-5 space-y-3 border border-[#E4E7EC] rounded-xl'>
                    <p className="text-sm text-secondary">Total loan due</p>
                    <div className='flex items-center gap-5'>
                        <p className="text-2xl font-semibold">₦{210000.00.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</p>
                        <RiEyeCloseLine className="w-6 h-6 text-[#98A2B3] cursor-pointer" />
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-lg text-[#475367] font-medium">Loan Types</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-2'>
                    {data.map((item, index) => (
                        <div key={index} className='p-5 space-y-3 bg-[#F9FAFB] text-xs border border-[#E4E7EC] rounded-xl'>
                            <p className='text-xl font-medium'>{item.title}</p>
                            <p className='text-secondary'>
                                {item.description}
                            </p>

                            <Link
                                to={item.link}
                                className="inline-flex items-center justify-center gap-3 px-4 h-10 bg-secondary text-xs rounded-md cursor-pointer hover:bg-primary/90 transition">
                                Apply for loan
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Loans;

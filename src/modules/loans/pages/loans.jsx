import React, { useState, useEffect, useRef } from 'react';
import SelectInput from '@/components/FormInputs/SelectInput';
import { RiEyeCloseLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const loanData = [
    {
        key: 'collected',
        label: 'Total loan collected',
        amount: 1210000,
    },
    {
        key: 'repaid',
        label: 'Total loan repaid',
        amount: 1000000,
    },
    {
        key: 'due',
        label: 'Total loan due',
        amount: 210000,
    },
];

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

    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        const container = scrollRef.current;
        if (!container) return;
        const cardWidth = container.firstChild?.clientWidth || 1;
        const index = Math.round(container.scrollLeft / cardWidth);
        setActiveIndex(index);
    };

    useEffect(() => {
        handleScroll();
    }, []);

    return (
        <div className="relative space-y-3 md:space-y-6">
            <div className='hidden md:flex items-center justify-between'>
                <div>
                    <h2 className="text-2xl font-semibold">Loans</h2>
                    <p className="text-sm text-gray-500 my-1">Track and manage your loans safely 💰</p>
                </div>
                <div className='w-1/4 flex items-center gap-3'>
                    <button
                        onClick={() => navigate('/loans/applications')}
                        className='w-full h-9 bg-[#D8D9EA] text-primary text-sm rounded-md cursor-pointer'
                    >
                        Loan applications
                    </button>

                    <SelectInput
                        label=""
                        name="filter"
                        className='w-full !h-9 text-sm m-0 px-2 cursor-pointer'
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

            <div className='md:hidden flex items-center justify-between'>
                <SelectInput
                    label=""
                    name="filter"
                    className='w-[127px] !h-9 text-sm m-0 px-2 cursor-pointer'
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    options={[
                        { label: "Today", value: "today" },
                        { label: "This Week", value: "week" },
                        { label: "This Month", value: "month" },
                        { label: "This Year", value: "year" },
                    ]}
                    placeholder="This month"
                />

                <button
                    onClick={() => navigate('/loans/applications')}
                    className='w-full flex items-center justify-end gap-1 text-sm'
                >
                    <span className='font-semibold'>Loan applications</span>
                    <BsArrowRight className='w-4 h-4 text-secondary' />
                </button>
            </div>

            {/* Stat Cards */}
            <div className="relative">
                {/* Scrollable container */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth hide-scrollbar px-2 md:px-0"
                >
                    {loanData.map((item, index) => (
                        <div
                            key={item.key}
                            className="min-w-[85%] md:min-w-0 snap-start bg-[#F9FAFB] p-5 space-y-3 border border-[#E4E7EC] rounded-xl"
                        >
                            <p className="text-sm text-secondary">{item.label}</p>
                            <div className="flex items-center gap-5">
                                <p className="text-2xl font-semibold">
                                    ₦{item.amount.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </p>
                                <RiEyeCloseLine className="w-6 h-6 text-[#98A2B3] cursor-pointer" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile indicator */}
                <div className="flex justify-center mt-3 md:hidden">
                    {loanData.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full mx-1 transition-all duration-300 ${index === activeIndex ? 'w-4 bg-[#98A2B3]' : 'w-2 bg-[#E4E7EC]'
                                }`}
                        ></div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-base md:text-lg md:text-[#475367] font-medium">Loan Types</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 mt-2'>
                    {data.map((item, index) => (
                        <div key={index} className='p-5 space-y-3 bg-[#F9FAFB] text-sm border border-[#E4E7EC] rounded-xl'>
                            <p className='text-base md:text-xl font-medium'>{item.title}</p>
                            <p className='text-sm md:text-base text-secondary'>
                                {item.description}
                            </p>

                            <Link
                                to={item.link}
                                className="inline-flex items-center justify-center gap-3 px-4 h-9 bg-secondary text-sm rounded-md cursor-pointer hover:bg-primary/90 transition">
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

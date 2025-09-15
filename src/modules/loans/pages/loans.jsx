import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchLoanStats } from '@/modules/loans/state/loanStatsSlice';
import { getCookie } from '@/utils/cookieUtils';

import SelectInput from '@/components/FormInputs/SelectInput';
import { BsArrowRight } from 'react-icons/bs';

import { ReactComponent as EyeOpen } from '@/assets/icons/eye-open.svg';
import { ReactComponent as EyeClose } from '@/assets/icons/eye-close.svg';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(getCookie('user') || null);
    const { stats: stats, loading: loading, error: error } = useSelector((state) => state.loan_stats);
    useEffect(() => {
        if (!loading) {
            dispatch(fetchLoanStats(user?._id));
        }
    }, [dispatch]);

    const loanData = [
        {
            key: 'collected',
            label: 'Total loan collected',
            amount: stats?.totalLoanCollected || 0.0,
        },
        {
            key: 'repaid',
            label: 'Total loan repaid',
            amount: stats?.totalLoanRepaid || 0.00,
        },
        {
            key: 'due',
            label: 'Total loan due',
            amount: stats?.totalLoanDue || 0.00,
        },
    ];

    const [filter, setFilter] = useState('');

    const [statsView, setStatsView] = useState({
        collected: true,
        repaid: true,
        due: true
    });
    const toggleStatsView = (stat) => {
        setStatsView(prev => ({
            ...prev,
            [stat]: !prev[stat]
        }));
    };

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
                    <p className="text-sm text-gray-500 my-1 font-light">Track and manage your loans safely 💰</p>
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
                            { label: "Today", value: "today" },
                            { label: "This Week", value: "week" },
                            { label: "This Month", value: "month" },
                            { label: "This Year", value: "year" },
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
                    <span className=''>Loan applications</span>
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
                            className="min-w-[85%] md:min-w-0 snap-start bg-light p-5 space-y-3 border border-gray rounded-xl"
                        >
                            <p className="text-sm md:text-base text-secondary font-light">{item.label}</p>
                            <div className="flex items-center gap-5">
                                <p className="text-[20px] md:text-[28px] font-bold">
                                    {statsView[item.key]
                                        ? '₦' +
                                        item.amount.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })
                                        : '*************'}
                                </p>
                                {statsView[item.key] ?
                                    <EyeClose
                                        onClick={() => toggleStatsView(item.key)}
                                        className="text-secondary cursor-pointer"
                                    /> :
                                    <EyeOpen
                                        onClick={() => toggleStatsView(item.key)}
                                        className="text-secondary cursor-pointer"
                                    />
                                }
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile indicator */}
                <div className="flex justify-center mt-3 md:hidden">
                    {loanData.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full mx-1 transition-all duration-300 ${index === activeIndex ? 'w-5 bg-[#98A2B3]' : 'w-2 bg-[#E4E7EC]'
                                }`}
                        ></div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-base md:text-lg md:text-tertiary">Loan Types</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mt-2'>
                    {data.map((item, index) => (
                        <div key={index} className='px-3 md:px-5 py-3 space-y-3 bg-light text-sm border border-gray rounded-xl'>
                            <p className='text-base md:text-2xl font-medium'>{item.title}</p>
                            <p className='text-sm md:text-base text-secondary font-light'>
                                {item.description}
                            </p>

                            <Link
                                to={item.link}
                                className="inline-flex items-center justify-center gap-3 px-4 h-9 md:h-10 bg-secondary text-sm rounded-md cursor-pointer hover:bg-primary/90 transition">
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

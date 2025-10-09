import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchInvestments } from '@/modules/investments/state/investmentSlice';
import { getCookie } from '@/utils/cookieUtils';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveInvestmentTab from '@/modules/investments/components/tabs/active_inv_tab';
import PastInvestmentTab from '@/modules/investments/components/tabs/past_inv_tab';
import BackButton from '@/components/BackButton';

const data = [
    {
        days: 90,
        months: 3,
        investment: 10000.00,
        balance: 30000.00,
        earned: 30000.00,
        interest: 3,
        type: "active_investment",
        withdrawn: true
    },
    {
        days: 180,
        months: 6,
        investment: 10000.00,
        balance: 1020000.00,
        earned: 30000.00,
        interest: 3,
        type: "past_investment",
        withdrawn: true
    },
    {
        days: 180,
        months: 6,
        investment: 10000.00,
        balance: 1020000.00,
        earned: 30000.00,
        interest: 3,
        type: "active_investment",
        withdrawn: true
    },
    {
        days: 360,
        months: 12,
        investment: 10000.00,
        balance: 205000.00,
        earned: 15000.00,
        interest: 3,
        type: "active_investment",
        withdrawn: true
    },
    {
        days: 360,
        months: 12,
        investment: 10000.00,
        balance: 205000.00,
        earned: 15000.00,
        interest: 3,
        type: "past_investment",
        withdrawn: false
    },
    {
        days: 540,
        months: 18,
        investment: 10000.00,
        balance: 60000.00,
        earned: 30000.00,
        interest: 3,
        type: "past_investment",
        withdrawn: true
    },
    {
        days: 720,
        months: 24,
        investment: 10000.00,
        balance: 30000.00,
        earned: 30000.00,
        interest: 3,
        type: "active_investment",
        withdrawn: true
    },
]

const ViewInvestment = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(getCookie('user') || null);
    const { investments: investments, loading: loading, error: error } = useSelector((state) => state.investment);
    useEffect(() => {
        if (!loading && investments.length === 0) {
            dispatch(fetchInvestments(user?._id));
        }
    }, [dispatch]);

    const [activeInvestments, setActiveInvestments] = useState([]);
    const [pastInvestments, setPastInvestments] = useState([]);

    // Sort Investment from frontend : Newest first
    useEffect(() => {
        const active = investments
            .filter(investment => investment.status === "active")
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
        const past = investments
            .filter(investment => investment.status === "completed")
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
        setActiveInvestments(active);
        setPastInvestments(past);
    }, [investments]);
    

    const [currentTab, setCurrentTab] = useState("active_investment");

    // const DATA = data.filter(item => item.type === currentTab);
    const DATA = currentTab === "active_investment" ? activeInvestments : pastInvestments;

    return (
        <div className="relative space-y-4">
            <BackButton />

            <div>
                <h2 className="text-base md:text-2xl font-semibold">Investments</h2>
                <p className="hidden md:block text-sm text-gray-500 my-1 font-light">Track and manage your investments safely 💰</p>
            </div>

            {/* Tab View */}
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                <TabsList className='w-full md:w-4/12 lg:!grid grid-cols-2 gap-3 md:gap-5 md:mb-4'>
                    <TabsTrigger
                        value="active_investment"
                        className={`h-10 text-sm font-light ${currentTab === 'active_investment' && 'bg-[#D8D9EA] text-primary border-0'} border border-gray !shadow-none cursor-pointer`}
                    >
                        Active investment
                    </TabsTrigger>
                    <TabsTrigger
                        value="past_investment"
                        className={`h-10 text-sm font-light ${currentTab === 'past_investment' && 'bg-[#D8D9EA] text-primary border-0'} border border-gray !shadow-none cursor-pointer`}
                    >
                        Past investment
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="active_investment">
                    <ActiveInvestmentTab data={DATA} />
                </TabsContent>
                <TabsContent value="past_investment">
                    <PastInvestmentTab data={DATA} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ViewInvestment;

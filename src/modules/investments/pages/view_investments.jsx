import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    const [currentTab, setCurrentTab] = useState("active_investment");

    const DATA = data.filter(item => item.type === currentTab);

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
                        className={`h-10 text-sm font-light ${currentTab === 'active_investment' && 'bg-[#D8D9EA] text-primary border-0'} border border-[#E4E7EC] !shadow-none cursor-pointer`}
                    >
                        Active investment
                    </TabsTrigger>
                    <TabsTrigger
                        value="past_investment"
                        className={`h-10 text-sm font-light ${currentTab === 'past_investment' && 'bg-[#D8D9EA] text-primary border-0'} border border-[#E4E7EC] !shadow-none cursor-pointer`}
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

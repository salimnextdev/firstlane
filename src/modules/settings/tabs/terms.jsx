import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminSettings } from '@/modules/settings/state/adminSettingsSlice';
import { Skeleton } from '@/components/ui/skeleton';

const Terms = () => {
    const dispatch = useDispatch();
    const { settings, loading, error } = useSelector((state) => state.admin_settings);

    useEffect(() => {
        if (!loading) {
            dispatch(fetchAdminSettings());
        }
    }, [dispatch]);

    const formattedPrivacyPolicy = settings?.privacyPolicy?.replace(/\n/g, '<br>');

    return (
        <div className="space-y-4 h-screen md:h-[95vh] overflow-y-auto hide-scrollbar">
            {loading ? (
                <div className="space-y-3">
                    {Array.from({ length: 30 }).map((_, idx) => (
                        <Skeleton
                            key={idx}
                            className={`h-4 ${idx % 4 === 0 ? 'w-3/4' : 'w-full'} bg-gray-200 rounded`}
                        />
                    ))}
                </div>
            ) : (
                <p
                    className="text-base font-light whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: formattedPrivacyPolicy }}
                />
            )}
        </div>
    );
};

export default Terms;
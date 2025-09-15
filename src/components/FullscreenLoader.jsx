import React from 'react';
import { Loader } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogContent,
} from "@/components/ui/alert-dialog";

const FullscreenLoader = ({
    isOpen,
    onClose
}) => {
    return (
        <div className="fixed inset-0 z-[9999] !mb-0 flex items-center justify-center bg-white/5 backdrop-blur">
            <div className='space-y-3'>
                <div class="flex-col gap-4 w-full flex items-center justify-center">
                    <div
                        class="w-20 h-20 border-4 border-transparent text-4xl animate-spin flex items-center justify-center border-t-[var(--firstlane-primary)] rounded-full"
                    >
                        <div
                            class="w-16 h-16 border-4 border-transparent text-2xl animate-spin flex items-center justify-center border-t-[var(--firstlane-secondary)] rounded-full"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullscreenLoader;
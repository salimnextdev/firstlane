import React from 'react';
import { Loader } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";

const FullscreenLoader = ({
    isOpen,
    onClose
}) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="p-10 w-[200px] bg-white border border-[#E4E7EC] rounded-xl">
                <div className="flex items-center justify-center">
                    <div
                        className='w-[70px] h-[70px] bg-[#D8D9EA] rounded-full flex items-center justify-center'
                    >
                        <Loader rotate={360} className='w-8 h-8 text-primary animate-spin mx-auto' />
                    </div>
                </div>
                <p className='text-center text-secondary font-light'>Loading...</p>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default FullscreenLoader;
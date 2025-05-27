import React from 'react';

import plant from '@/assets/images/plant.jpg';
import bgOverlay from '@/assets/images/bg-overlay.jpg';

const AuthImageContainer = () => {
    return (
        <div className="hidden md:block w-full h-full md:w-[640px] relative rounded-xl overflow-hidden">
            {/* Dark Overlay */}
            <div className="absolute inset-0 top-20 z-10 text-2xl text-center text-gray-300 font-medium">
                Buid brighter futures, one <br /> decision at a time.
            </div>

            {/* Overlay (beneath) */}
            <img
                src={bgOverlay}
                alt="background overlay"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/90 z-5"></div>

            {/* Plant image (on top of overlay but bottom aligned) */}
            <img
                src={plant}
                alt="plant"
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8/12 object-contain z-10"
            />
        </div>
    );
};

export default AuthImageContainer;
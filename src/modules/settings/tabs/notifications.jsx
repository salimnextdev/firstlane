import React, { useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });

  const handleToggle = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const settings = [
    { label: 'Email Notifications', key: 'email' },
    { label: 'Push Notifications', key: 'push' },
    { label: 'SMS Notifications', key: 'sms' },
  ];

  return (
    <div className="space-y-6">
      {settings.map(({ label, key }) => (
        <div key={key} className="flex items-center justify-between">
          <p className="text-base font-normal">{label}</p>
          <button
            onClick={() => handleToggle(key)}
            className={`relative inline-flex h-[16px] w-7 items-center rounded-full cursor-pointer transition-colors ${notifications[key] ? 'bg-primary' : 'bg-[#D9D9D9]'
              }`}>
            <span
              className={`inline-block h-2 w-2 transform rounded-full bg-white cursor-pointer transition-transform ${notifications[key] ? 'translate-x-4' : 'translate-x-1'
                }`}
            />
          </button>
        </div>
      ))}

      <div className="fixed md:static bottom-0 z-10 w-full h-[71px] pr-10 bg-white md:bg-transparent border-t md:border-0 border-[#E4E7EC]">
        <button
          className='w-full md:w-32 h-11 md:h-9 my-3 px-3 rounded-md bg-primary text-sm cursor-pointer'
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default Notifications;
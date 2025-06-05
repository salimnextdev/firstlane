import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch'; // Adjust based on your project structure

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

      <button
        className='w-full md:w-32 h-9 px-3 rounded-md bg-primary text-sm cursor-pointer'
      >
        Save changes
      </button>
    </div>
  );
};

export default Notifications;
export const formatDateTime = (isoString) => {
    if (!isoString) {
        return '';
    }

    const date = new Date(isoString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    // Day with suffix (e.g., 1st, 2nd, 3rd, 4th)
    const getDayWithSuffix = (day) => {
        if (day > 3 && day < 21) return `${day}th`; // Handles 11th, 12th, 13th
        switch (day % 10) {
            case 1: return `${day}st`;
            case 2: return `${day}nd`;
            case 3: return `${day}rd`;
            default: return `${day}th`;
        }
    };

    const day = date.getDate();
    const formattedDay = getDayWithSuffix(day);

    // Month (e.g., Jan, Feb, Aug)
    const month = date.toLocaleString('en-US', { month: 'short' });

    // Year (e.g., 2026)
    const year = date.getFullYear();

    // Time (e.g., 8:23AM)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedDay} ${month}, ${year} | ${formattedHours}:${formattedMinutes}${ampm}`;
};

export const formatDateShort = (isoString) => {
    if (!isoString) {
        return '';
    }

    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() is 0-indexed
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedDay}/${formattedMonth} at ${formattedHours}:${formattedMinutes}${ampm}`;
};


export const formatDateToday = (isoString) => {
    if (!isoString) {
        return '';
    }

    const date = new Date(isoString);
    const today = new Date();

    if (isNaN(date.getTime())) {
        console.error("Invalid date string provided:", isoString);
        return 'Invalid Date';
    }

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timeString = `${formattedHours}:${formattedMinutes}${ampm}`;

    // Check if the date is today
    const isToday = date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    if (isToday) {
        return `Today, ${timeString}`;
    } else {
        // If not today, format as DD/MM/YYYY, HH:MMam/pm
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}, ${timeString}`;
    }
};

export const calculateDurationDetails = (createdDateString, durationLimitInDays) => {
    if (!createdDateString) {
        return '';
    }

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const millisecondsPerHour = 1000 * 60 * 60;

    const createdDate = new Date(createdDateString);
    const now = new Date();

    // Calculate the fixed end date
    const endDate = new Date(createdDate.getTime() + durationLimitInDays * millisecondsPerDay);

    // Clamp "now" to not go beyond the end date
    const effectiveNow = now > endDate ? endDate : now;

    // Calculate time difference based on the clamped current time
    const differenceInMilliseconds = effectiveNow.getTime() - createdDate.getTime();

    const durationSoFarInDays = differenceInMilliseconds / millisecondsPerDay;
    const totalHoursSoFar = differenceInMilliseconds / millisecondsPerHour;

    const daysSoFar = Math.floor(totalHoursSoFar / 24);
    const hoursSoFar = Math.floor(totalHoursSoFar % 24);

    // Determine if we're still within the investment period
    const isWithinDurationLimit = now <= endDate;

    // Calculate days remaining or overdue (based on actual now, not clamped time)
    let daysRemaining = 0;
    let daysOverdue = 0;

    if (isWithinDurationLimit) {
        daysRemaining = (endDate.getTime() - now.getTime()) / millisecondsPerDay;
    } else {
        daysOverdue = (now.getTime() - endDate.getTime()) / millisecondsPerDay;
    }

    return {
        durationSoFarInDays: parseFloat(durationSoFarInDays.toFixed(2)),
        daysSoFar,
        hoursSoFar,
        isWithinDurationLimit,
        daysRemaining: parseFloat(daysRemaining.toFixed(2)),
        daysOverdue: parseFloat(daysOverdue.toFixed(2)),
        // endDate: endDate.toISOString(),
    };
};
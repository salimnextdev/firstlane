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
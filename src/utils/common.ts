export const formatISODate = (isoDate: string): string => {
  const date = new Date(isoDate);

  // Extract the date components
  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()]; // Get month abbreviation
  const year = date.getFullYear();

  // Format the time
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Final formatted string
  return `${day}, ${month}, ${year}, ${hours}:${minutes}`;
};

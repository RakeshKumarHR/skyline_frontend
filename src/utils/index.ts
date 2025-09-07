const handleAxiosError = <T = null>(error: any): T => {
  console.error("API Error:", error);
  return null as T;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedDate;
};
export { formatDate, handleAxiosError };

export function formatFileSize(size) {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const sizes = ["B", "KB", "MB", "GB"];
  return `${(size / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

export const getFormattedDate = (givenDate) => {
  const date = new Date(givenDate);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  return formattedDate;
};

export const getTimeInDays = (seconds) => {
  const days = Math.floor(seconds / (3600 * 24));
  return days;
};

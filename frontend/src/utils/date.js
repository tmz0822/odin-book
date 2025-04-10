import {
  formatDistanceToNow,
  format,
  isToday,
  isYesterday,
  parseISO,
} from 'date-fns';

export function formatPostDate(date) {
  const parsed = new Date(date);

  if (isToday(parsed)) {
    return formatDistanceToNow(parsed, { addSuffix: true });
  }

  if (isYesterday(parsed)) {
    return `Yesterday at ${format(parsed, 'h:mm a')}`;
  }

  return format(parsed, "MMM d 'at' h:mm a");
}

export const formatCommentDate = (dateString) => {
  const commentDate = parseISO(dateString); // Convert the ISO string to a Date object
  const formattedDate = formatDistanceToNow(commentDate, { addSuffix: true }); // Get relative time with suffix (e.g., 'ago')

  return formattedDate;
};


import { formatDistanceToNow, format, isToday, isYesterday } from "date-fns";

export function formatPostDate(date) {
  const parsed = new Date(date);

  if (isToday(parsed)) {
    return formatDistanceToNow(parsed, { addSuffix: true });
  }

  if (isYesterday(parsed)) {
    return `Yesterday at ${format(parsed, "h:mm a")}`;
  }

  return format(parsed, "MMM d [at] h:mm a");
}

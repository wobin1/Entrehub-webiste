export function generateCalendarLinks({
  title,
  description,
  location,
  startTime,
  endTime,
}: {
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
}) {
  const formatTime = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  };

  const start = formatTime(startTime);
  const end = formatTime(endTime);

  const google = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(
    location
  )}&dates=${start}/${end}`;

  const outlook = `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
    title
  )}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(
    location
  )}&startdt=${startTime.toISOString()}&enddt=${endTime.toISOString()}`;

  return { google, outlook };
}

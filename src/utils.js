export default function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);

  let displayHours = Math.floor(totalMinutes / 60);
  displayHours = displayHours ? `${displayHours}:` : '';
  let displayMinutes = Math.floor(totalMinutes % 60);
  displayMinutes = displayMinutes < 10 ? `0${displayMinutes}` : displayMinutes;
  let displaySeconds = Math.floor(totalSeconds % 60);
  displaySeconds = displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds;

  return `${displayHours}${displayMinutes}:${displaySeconds}`;
}

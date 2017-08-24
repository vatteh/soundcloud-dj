import moment from 'moment';

export function formatTime(milliseconds) {
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

export function formatDate(dateString) {
  return moment(dateString.split(' ')[0]).format('LL');
}

export function sortColumnBy(column, direction) {
  return (a, b) => {
    if (a[column] < b[column]) {
      return direction === 'asc' ? -1 : 1;
    } else if (a[column] > b[column]) {
      return direction === 'asc' ? 1 : -1;
    }

    return 0;
  };
}

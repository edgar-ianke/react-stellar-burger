export default function formatDate(inputDate) {
  const currentDate = new Date();
  const inputDateTime = new Date(inputDate);

  const diffDays = currentDate.getDate() - inputDateTime.getDate();

  const dayNames = ["Вчера", "Сегодня", ""];
  const dayAgo = ["день назад", "дня назад", "дней назад"];

  let result = "";
  if (diffDays === 0) {
    result = "Сегодня";
  } else if (diffDays === 1) {
    result = "Вчера";
  } else {
    result = `${diffDays} ${dayAgo[getCorrectPluralForm(diffDays)]}`;
  }

  const hours = inputDateTime.getHours().toString().padStart(2, "0");
  const minutes = inputDateTime.getMinutes().toString().padStart(2, "0");

  const timezoneOffset = currentDate.getTimezoneOffset() / 60;
  const timezoneLabel = timezoneOffset > 0 ? `i-GMT+${Math.abs(timezoneOffset)}` : `i-GMT-${Math.abs(timezoneOffset)}`;

  return `${result}, ${hours}:${minutes} ${timezoneLabel}`;
}

function getCorrectPluralForm(number) {
  if (number % 10 === 1 && number % 100 !== 11) {
    return 0;
  }
  if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
    return 1;
  }
  return 2;
}

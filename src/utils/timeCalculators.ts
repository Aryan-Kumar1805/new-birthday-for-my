export interface TimeDifference {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

export interface BirthdayCountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  turningAge: number;
}

/**
 * Calculates time passed between a starting date and now.
 */
export function calculateTimeTogether(startDateStr: string, currentDate = new Date()): TimeDifference {
  const start = new Date(startDateStr);
  const now = currentDate;

  if (isNaN(start.getTime())) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0 };
  }

  const diffMs = Math.max(0, now.getTime() - start.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours,
    minutes,
    seconds,
    totalDays,
  };
}

/**
 * Calculates countdown to the upcoming birthday (this year or next year).
 */
export function calculateBirthdayCountdown(
  birthdayDateStr: string,
  ageMilestone: number,
  currentDate = new Date()
): BirthdayCountdown {
  const birth = new Date(birthdayDateStr);
  if (isNaN(birth.getTime())) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false, turningAge: ageMilestone };
  }

  const currentYear = currentDate.getFullYear();
  let nextBday = new Date(currentYear, birth.getMonth(), birth.getDate(), 0, 0, 0);

  // Check if today is the birthday
  const isToday =
    currentDate.getMonth() === birth.getMonth() && currentDate.getDate() === birth.getDate();

  // If birthday has already passed this year (and not today), countdown to next year
  if (!isToday && currentDate.getTime() > nextBday.getTime()) {
    nextBday = new Date(currentYear + 1, birth.getMonth(), birth.getDate(), 0, 0, 0);
  }

  const diffMs = isToday ? 0 : Math.max(0, nextBday.getTime() - currentDate.getTime());

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  // Calculate age they are turning
  const birthYear = birth.getFullYear();
  const turningAge = isToday ? currentYear - birthYear : nextBday.getFullYear() - birthYear;

  return {
    days,
    hours,
    minutes,
    seconds,
    isToday,
    turningAge: turningAge > 0 ? turningAge : ageMilestone,
  };
}

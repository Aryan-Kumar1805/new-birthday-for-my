export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  title: string;
  badge: string;
  message: string;
}

export function scoreLoveQuiz(userAnswers: Record<string, number>, correctAnswers: Record<string, number>): QuizResult {
  const questionIds = Object.keys(correctAnswers);
  const total = questionIds.length;
  if (total === 0) {
    return {
      score: 0,
      total: 0,
      percentage: 0,
      title: 'Our Journey',
      badge: 'Lovebird',
      message: 'Every moment with you is a treasure.',
    };
  }

  let score = 0;
  for (const qId of questionIds) {
    if (userAnswers[qId] === correctAnswers[qId]) {
      score += 1;
    }
  }

  const percentage = Math.round((score / total) * 100);

  let title = 'Infinite Soulmates';
  let badge = 'Destined Together';
  let message = 'You know my heart better than anyone in this entire universe! Happy Birthday my love!';

  if (percentage === 100) {
    title = '100% Certified Soulmate';
    badge = 'Twin Flames';
    message = 'Flawless score! There is no doubt in the stars—you and I are made for each other forever.';
  } else if (percentage >= 80) {
    title = 'Deeply Connected Hearts';
    badge = 'My Favorite Human';
    message = 'Incredible! You remember all the little details that mean the world to us.';
  } else if (percentage >= 60) {
    title = 'Sweet Heartbeat';
    badge = 'Partners in Crime';
    message = 'Such a sweet score! Every day together is our favorite new chapter to write.';
  } else {
    title = 'Endless Adventures Ahead';
    badge = 'Forever My Love';
    message = 'The best part about us is all the new memories we have yet to make. I love you!';
  }

  return {
    score,
    total,
    percentage,
    title,
    badge,
    message,
  };
}

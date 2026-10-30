import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTimeTogether, calculateBirthdayCountdown } from './timeCalculators';
import { scoreLoveQuiz } from './quizScoring';

test('calculateTimeTogether calculates years, months, and days accurately', () => {
  // Start: 2024-01-01, Current: 2026-10-30
  const start = '2024-01-01';
  const simulatedNow = new Date('2026-10-30T10:00:00');
  const res = calculateTimeTogether(start, simulatedNow);

  assert.equal(res.years, 2);
  assert.equal(res.months, 9);
  assert.equal(res.days, 29);
  assert.ok(res.totalDays > 1000);
});

test('calculateTimeTogether handles invalid date safely', () => {
  const res = calculateTimeTogether('invalid-date');
  assert.equal(res.years, 0);
  assert.equal(res.totalDays, 0);
});

test('calculateBirthdayCountdown detects today when date matches', () => {
  const bday = '2000-10-30';
  const simulatedToday = new Date('2026-10-30T12:00:00');
  const res = calculateBirthdayCountdown(bday, 26, simulatedToday);

  assert.equal(res.isToday, true);
  assert.equal(res.days, 0);
  assert.equal(res.turningAge, 26);
});

test('calculateBirthdayCountdown calculates days until upcoming birthday', () => {
  const bday = '2000-11-05';
  const simulatedToday = new Date('2026-10-30T00:00:00');
  const res = calculateBirthdayCountdown(bday, 26, simulatedToday);

  assert.equal(res.isToday, false);
  assert.equal(res.days, 6);
});

test('scoreLoveQuiz scores 100% when all answers match', () => {
  const userAnswers = { q1: 1, q2: 2, q3: 0 };
  const correct = { q1: 1, q2: 2, q3: 0 };
  const result = scoreLoveQuiz(userAnswers, correct);

  assert.equal(result.score, 3);
  assert.equal(result.total, 3);
  assert.equal(result.percentage, 100);
  assert.equal(result.title, '100% Certified Soulmate');
});

test('scoreLoveQuiz handles partial matches correctly', () => {
  const userAnswers = { q1: 1, q2: 0, q3: 0 };
  const correct = { q1: 1, q2: 2, q3: 0 };
  const result = scoreLoveQuiz(userAnswers, correct);

  assert.equal(result.score, 2);
  assert.equal(result.total, 3);
  assert.equal(result.percentage, 67);
  assert.equal(result.badge, 'Partners in Crime');
});

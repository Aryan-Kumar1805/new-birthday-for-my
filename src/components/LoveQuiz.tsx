import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, Award, RotateCcw, Heart, Sparkles } from 'lucide-react';
import { QuizQuestion } from '../types';
import { scoreLoveQuiz, QuizResult } from '../utils/quizScoring';
import { fireCelebrationConfetti } from '../utils/confetti';

interface LoveQuizProps {
  questions: QuizQuestion[];
  girlfriendName: string;
  boyfriendName: string;
}

export const LoveQuiz: React.FC<LoveQuizProps> = ({ questions, girlfriendName, boyfriendName }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = questions[currentStep];

  const handleSelectOption = (index: number) => {
    if (hasSubmittedAnswer) return;
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;
    const qId = currentQ.id;
    const nextAnswers = { ...userAnswers, [qId]: selectedOption };
    setUserAnswers(nextAnswers);
    setHasSubmittedAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentStep + 1 < questions.length) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
      setHasSubmittedAnswer(false);
    } else {
      setQuizFinished(true);
      fireCelebrationConfetti(3500);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentStep(0);
    setUserAnswers({});
    setSelectedOption(null);
    setHasSubmittedAnswer(false);
    setQuizFinished(false);
  };

  // Build correct answers lookup
  const correctLookup = questions.reduce<Record<string, number>>((acc, q) => {
    acc[q.id] = q.correctIndex;
    return acc;
  }, {});

  const result: QuizResult = scoreLoveQuiz(userAnswers, correctLookup);

  return (
    <section id="quiz" className="py-20 bg-stone-100/60 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-rose-500 text-xs font-semibold tracking-wider uppercase mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Playful Couple Trivia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-2">
            Our Love Story Quiz
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            How well do you remember our little moments and secret inside jokes?
          </p>
        </div>

        {!quizFinished ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-stone-200/70 relative">
            {/* Step progress */}
            <div className="flex items-center justify-between text-xs text-stone-400 mb-6 font-sans">
              <span>
                Question {currentStep + 1} of {questions.length}
              </span>
              <div className="flex gap-1.5">
                {questions.map((_, i) => (
                  <span
                    key={i}
                    className={`w-6 h-1.5 rounded-full transition-colors ${
                      i === currentStep
                        ? 'bg-rose-600'
                        : i < currentStep
                        ? 'bg-emerald-500'
                        : 'bg-stone-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-6">
              {currentQ.question}
            </h3>

            {/* Options list */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = currentQ.correctIndex === idx;

                let buttonStyle = 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100';
                if (hasSubmittedAnswer) {
                  if (isCorrect) {
                    buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium';
                  } else if (isSelected && !isCorrect) {
                    buttonStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                  }
                } else if (isSelected) {
                  buttonStyle = 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-200';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={hasSubmittedAnswer}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between text-sm sm:text-base ${buttonStyle}`}
                  >
                    <span>{opt}</span>
                    {hasSubmittedAnswer && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {hasSubmittedAnswer && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback message when submitted */}
            {hasSubmittedAnswer && (
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl mb-6 text-xs sm:text-sm text-stone-700">
                <span className="font-semibold text-amber-900 block mb-1">Behind this memory:</span>
                <p>{currentQ.explanation}</p>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex justify-end pt-2">
              {!hasSubmittedAnswer ? (
                <button
                  type="button"
                  disabled={selectedOption === null}
                  onClick={handleConfirmAnswer}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-full text-sm font-semibold shadow-xs transition-colors"
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-sm font-semibold shadow-xs transition-colors"
                >
                  {currentStep + 1 < questions.length ? 'Next Question →' : 'See Our Soulmate Result! ✨'}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Results Certificate */
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-double border-rose-200 relative text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-600 shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest text-rose-600 font-mono font-bold block mb-1">
              Official Soulmate Certificate
            </span>

            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-2">
              {result.title}
            </h3>

            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-50 rounded-full text-rose-700 text-xs font-semibold mb-6">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>Score: {result.score} of {result.total} ({result.percentage}%)</span>
            </div>

            <p className="text-stone-700 text-base sm:text-lg font-serif italic max-w-lg mx-auto mb-8 leading-relaxed">
              "{result.message}"
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Trivia Again</span>
              </button>
              <a
                href="#cake"
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-semibold shadow-xs transition-colors"
              >
                Back to Cake & Celebration 🎉
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

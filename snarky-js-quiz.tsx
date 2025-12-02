import { useState } from 'react';

const quizData = [
  {
    question: "What does 'const' actually mean in JavaScript?",
    options: [
      "The variable is completely immutable forever",
      "The binding can't be reassigned, but objects/arrays can still be mutated",
      "It's just 'var' but fancier",
      "Nobody really knows, we just use it to look professional"
    ],
    answer: 1,
    correctSnark: "Look at you, understanding the nuance! const isn't about immutability, it's about reassignment. Gold star.",
    wrongSnark: "Ah, the classic const confusion. It prevents reassignment, not mutation. Your object's properties are still fair game for chaos."
  },
  {
    question: "What will console.log(typeof null) output?",
    options: [
      "'null'",
      "'undefined'",
      "'object'",
      "'nothing'"
    ],
    answer: 2,
    correctSnark: "You know about JavaScript's most famous bug! typeof null returning 'object' has been wrong since 1995 and we're stuck with it forever.",
    wrongSnark: "It's 'object'. Yes, really. This is a bug from 1995 that can never be fixed because it would break the internet. Welcome to JavaScript."
  },
  {
    question: "What's the difference between '==' and '==='?",
    options: [
      "Nothing, one just has more characters",
      "'==' compares values, '===' compares values AND types",
      "'===' is deprecated",
      "'==' is faster because it's shorter"
    ],
    answer: 1,
    correctSnark: "Correct! Always use === unless you have a very specific reason to let JavaScript's type coercion make decisions for you. (Spoiler: you don't.)",
    wrongSnark: "=== checks both value AND type. == will tell you that '5' == 5 is true, which is the kind of chaos we don't need in our lives."
  },
  {
    question: "What does Array.prototype.map() return?",
    options: [
      "undefined, it modifies the original array",
      "A new array with transformed elements",
      "A boolean indicating success",
      "The original array, but angrier"
    ],
    answer: 1,
    correctSnark: "Nailed it. map() returns a NEW array and leaves the original untouched. Immutability enthusiasts everywhere rejoice.",
    wrongSnark: "map() returns a brand new array with your transformations. It doesn't mutate the original. This is why functional programmers won't stop talking about it."
  },
  {
    question: "What is a closure?",
    options: [
      "When you close your laptop in frustration",
      "A function that remembers variables from its outer scope",
      "A way to end a JavaScript file",
      "A deprecated feature from ES5"
    ],
    answer: 1,
    correctSnark: "You actually understand closures! This puts you ahead of like 60% of interview candidates. Seriously.",
    wrongSnark: "A closure is a function that 'closes over' variables from its outer scope. It remembers them even after that outer function has finished. It's weird and powerful."
  },
  {
    question: "What will [1, 2, 3].push(4) return?",
    options: [
      "[1, 2, 3, 4]",
      "4",
      "undefined",
      "true"
    ],
    answer: 1,
    correctSnark: "Correct! push() returns the NEW LENGTH of the array, not the array itself. This trips up everyone at least once.",
    wrongSnark: "Trick question energy: push() returns the new LENGTH of the array (4), not the array itself. The array IS modified, but the return value is just a number."
  },
  {
    question: "What's the event loop?",
    options: [
      "A for loop that handles events",
      "The mechanism that handles async operations and callbacks",
      "A React hook",
      "The thing that makes your code slow"
    ],
    answer: 1,
    correctSnark: "You know about the event loop! This is legitimately useful knowledge for understanding why your async code does weird things.",
    wrongSnark: "The event loop is how JavaScript handles async operations - it processes the call stack, then checks the callback queue. It's why setTimeout(fn, 0) doesn't run immediately."
  }
];

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [started, setStarted] = useState(false);

  const currentQuestion = quizData[currentIndex];

  const handleAnswer = (index) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (index === currentQuestion.answer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuizComplete(false);
  };

  const getScoreData = () => {
    const pct = Math.round((score / quizData.length) * 100);
    if (pct >= 90) return { 
      grade: "MINIMAL ACCEPTABLE RESULT", 
      pass: true, 
      color: "text-emerald-400",
      message: "Score engravers will be dispatched. Please shower before arrival." 
    };
    if (pct >= 80) return { 
      grade: "MINIMAL TOLERABLE FAILURE", 
      pass: false, 
      color: "text-yellow-400",
      message: "Additional study sessions will be enforced by armed tutors." 
    };
    if (pct >= 70) return { 
      grade: "INSUFFICIENT SUCCESS", 
      pass: false, 
      color: "text-orange-400",
      message: "Please report for surgical exclusion." 
    };
    if (pct >= 60) return { 
      grade: "DISMAL RESULT", 
      pass: false, 
      color: "text-orange-500",
      message: "We are both angry and disappointed. Please mark voluntary toes with the appropriate marker." 
    };
    return { 
      grade: "EXCEPTIONAL FAILURE", 
      pass: false, 
      color: "text-red-400",
      message: "Tutors will be dispatched. Please shave the areas listed in the student manual on page 145 to make electrode placement easier." 
    };
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
        <div className="bg-zinc-800 rounded-lg p-8 max-w-xl w-full text-center border border-zinc-700">
          <h1 className="text-3xl font-bold text-white mb-2">JavaScript Fundamentals</h1>
          <p className="text-zinc-400 text-lg mb-6">A Quiz for People Who've Suffered Enough</p>
          <p className="text-zinc-500 mb-8 text-sm">
            {quizData.length} questions about the language that runs the internet despite everyone's best efforts.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Let's Get This Over With
          </button>
          <p className="text-zinc-600 text-xs mt-8 italic px-4">
            Failure to pass this quiz with an approved score will result in severe re-education and applicable physical treatment as determined by a spin of the "Wheel of Deserved Retribution." All hail the Omnissiah.
          </p>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const scoreData = getScoreData();
    const pct = Math.round((score / quizData.length) * 100);
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
        <div className="bg-zinc-800 rounded-lg p-8 max-w-xl w-full text-center border border-zinc-700">
          <h2 className="text-2xl font-bold text-white mb-2">Assessment Complete</h2>
          <p className={`text-sm font-bold mb-4 ${scoreData.pass ? 'text-emerald-500' : 'text-red-500'}`}>
            [ {scoreData.pass ? 'PASSED' : 'FAILED'} ]
          </p>
          <p className="text-5xl font-bold text-white mb-1">{score} / {quizData.length}</p>
          <p className="text-zinc-500 text-sm mb-4">{pct}%</p>
          <p className={`text-lg font-semibold mb-2 ${scoreData.color}`}>{scoreData.grade}</p>
          <p className="text-zinc-400 mb-6 text-sm">{scoreData.message}</p>
          
          <div className="bg-zinc-900 rounded-lg p-4 mb-6 text-left text-xs text-zinc-500">
            <p className="font-semibold text-zinc-400 mb-2">Classification Matrix:</p>
            <p><span className="text-emerald-400">90-100%</span> — Minimal Acceptable Result</p>
            <p><span className="text-yellow-400">80-89%</span> — Minimal Tolerable Failure</p>
            <p><span className="text-orange-400">70-79%</span> — Insufficient Success</p>
            <p><span className="text-orange-500">60-69%</span> — Dismal Result</p>
            <p><span className="text-red-400">0-59%</span> — Exceptional Failure</p>
          </div>
          
          <button
            onClick={restart}
            className="bg-zinc-600 hover:bg-zinc-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            {scoreData.pass ? 'Attempt Further Glory' : 'Petition for Reassessment'}
          </button>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion.answer;

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="bg-zinc-800 rounded-lg p-6 max-w-xl w-full border border-zinc-700">
        <div className="flex justify-between items-center mb-6">
          <span className="text-zinc-500 text-sm">Question {currentIndex + 1} of {quizData.length}</span>
          <span className="text-emerald-400 text-sm font-medium">Score: {score}</span>
        </div>
        
        <h2 className="text-xl text-white font-medium mb-6">{currentQuestion.question}</h2>
        
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, idx) => {
            let btnClass = "w-full text-left p-4 rounded-lg border transition-all ";
            
            if (!showFeedback) {
              btnClass += "bg-zinc-700 border-zinc-600 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-650 cursor-pointer";
            } else if (idx === currentQuestion.answer) {
              btnClass += "bg-emerald-900/50 border-emerald-500 text-emerald-200";
            } else if (idx === selectedAnswer) {
              btnClass += "bg-red-900/50 border-red-500 text-red-200";
            } else {
              btnClass += "bg-zinc-700/50 border-zinc-600 text-zinc-500";
            }
            
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showFeedback}
                className={btnClass}
              >
                {option}
              </button>
            );
          })}
        </div>
        
        {showFeedback && (
          <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-emerald-900/30 border border-emerald-700' : 'bg-red-900/30 border border-red-700'}`}>
            <p className={`text-sm ${isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
              {isCorrect ? currentQuestion.correctSnark : currentQuestion.wrongSnark}
            </p>
          </div>
        )}
        
        {showFeedback && (
          <button
            onClick={nextQuestion}
            className="w-full bg-zinc-600 hover:bg-zinc-500 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {currentIndex < quizData.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}

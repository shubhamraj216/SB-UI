"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Play, Send, Clock, CheckCircle, XCircle, 
  RotateCcw, Code2, BookOpen, Lightbulb, Trophy
} from 'lucide-react';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import CodeEditor from '@/components/CodeEditor';
import { getProblemById, Problem } from '@/lib/codingProblems';
import { addSubmission, getSubmissionsByProblem, CodingSubmission } from '@/lib/storage';
import { background, text, brand, border, accent } from '@/lib/colors';

type Language = 'javascript' | 'python' | 'java' | 'cpp' | 'typescript';

interface TestResult {
  testCase: number;
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  error?: string;
}

export default function ProblemWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const problemId = params.problemId as string;
  
  const [problem, setProblem] = useState<Problem | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState<'description' | 'submissions'>('description');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [submissions, setSubmissions] = useState<CodingSubmission[]>([]);
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    const foundProblem = getProblemById(problemId);
    if (foundProblem) {
      setProblem(foundProblem);
      setCode(foundProblem.starterCode[selectedLanguage]);
    }
    
    // Load submissions
    loadSubmissions();
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[selectedLanguage]);
    }
  }, [selectedLanguage, problem]);

  const loadSubmissions = () => {
    const subs = getSubmissionsByProblem(problemId);
    setSubmissions(subs);
  };

  const runCode = async (submitMode: boolean = false) => {
    if (!problem) return;
    
    if (submitMode) {
      setIsSubmitting(true);
    } else {
      setIsRunning(true);
    }
    
    setShowResults(true);

    // Simulate code execution delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock test execution - in a real app, this would call a backend API
    const results: TestResult[] = [];
    const testCasesToRun = submitMode ? problem.testCases : problem.testCases.filter(tc => !tc.hidden);
    
    // Simple mock: randomly pass/fail tests for demonstration
    // In reality, you'd execute the code against actual test cases
    const passRate = code.length > 50 ? 0.8 : 0.5; // Basic heuristic
    
    testCasesToRun.forEach((testCase, index) => {
      const willPass = Math.random() < passRate;
      results.push({
        testCase: index + 1,
        passed: willPass,
        input: testCase.input,
        expected: testCase.expected,
        actual: willPass ? testCase.expected : 'null',
        error: willPass ? undefined : 'Output mismatch'
      });
    });

    setTestResults(results);
    setIsRunning(false);
    setIsSubmitting(false);

    // If submitting, save the submission
    if (submitMode) {
      const allPassed = results.every(r => r.passed);
      const runtime = Math.floor(Math.random() * 200) + 50; // Mock runtime
      
      addSubmission({
        problemId: problem.id,
        problemTitle: problem.title,
        code,
        language: selectedLanguage,
        passed: allPassed,
        testsPassed: results.filter(r => r.passed).length,
        totalTests: results.length,
        runtime
      });
      
      loadSubmissions();
    }
  };

  const handleReset = () => {
    if (problem && confirm('Reset code to starter template?')) {
      setCode(problem.starterCode[selectedLanguage]);
      setTestResults([]);
      setShowResults(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return accent.emerald;
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return brand.navy;
    }
  };

  if (!problem) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center" style={{ backgroundColor: background.primary }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: text.primary }}>
            Problem not found
          </h1>
          <Button variant="primary" onClick={() => router.push('/coding-interview')}>
            Back to Problems
          </Button>
        </div>
      </div>
    );
  }

  const passedTests = testResults.filter(r => r.passed).length;
  const totalTests = testResults.length;

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: background.primary }}>
      {/* Header */}
      <div 
        className="border-b px-4 py-3 flex items-center justify-between"
        style={{ 
          backgroundColor: background.white,
          borderColor: border.light
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/coding-interview')}
            className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={20} style={{ color: text.secondary }} />
          </button>
          <div>
            <h1 className="text-lg font-bold" style={{ color: text.primary }}>
              {problem.title}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="px-2 py-0.5 text-xs font-semibold rounded"
                style={{ 
                  backgroundColor: `${getDifficultyColor(problem.difficulty)}15`,
                  color: getDifficultyColor(problem.difficulty)
                }}
              >
                {problem.difficulty}
              </span>
              {problem.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-0.5 text-xs rounded"
                  style={{ 
                    backgroundColor: `${brand.navy}10`,
                    color: brand.navy
                  }}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw size={16} />
            Reset
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 border-r overflow-y-auto" style={{ borderColor: border.light, backgroundColor: background.white }}>
          <div className="p-6">
            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b" style={{ borderColor: border.light }}>
              <button
                onClick={() => setActiveTab('description')}
                className="pb-3 px-2 font-medium transition-colors relative"
                style={{ 
                  color: activeTab === 'description' ? brand.navy : text.muted
                }}
              >
                <div className="flex items-center gap-2">
                  <BookOpen size={18} />
                  Description
                </div>
                {activeTab === 'description' && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: brand.navy }}
                  />
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('submissions')}
                className="pb-3 px-2 font-medium transition-colors relative"
                style={{ 
                  color: activeTab === 'submissions' ? brand.navy : text.muted
                }}
              >
                <div className="flex items-center gap-2">
                  <Trophy size={18} />
                  Submissions
                  {submissions.length > 0 && (
                    <span 
                      className="px-1.5 py-0.5 text-xs rounded-full"
                      style={{ backgroundColor: `${brand.navy}15`, color: brand.navy }}
                    >
                      {submissions.length}
                    </span>
                  )}
                </div>
                {activeTab === 'submissions' && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: brand.navy }}
                  />
                )}
              </button>
            </div>

            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="space-y-6">
                {/* Problem Description */}
                <div>
                  <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: text.secondary }}>
                    {problem.description}
                  </p>
                </div>

                {/* Examples */}
                <div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: text.primary }}>
                    Examples
                  </h3>
                  {problem.examples.map((example, idx) => (
                    <div 
                      key={idx}
                      className="mb-4 p-4 rounded-lg"
                      style={{ backgroundColor: background.primary }}
                    >
                      <p className="font-semibold mb-2" style={{ color: text.primary }}>
                        Example {idx + 1}:
                      </p>
                      <div className="space-y-1 text-sm font-mono">
                        <div>
                          <span className="font-semibold" style={{ color: text.secondary }}>Input: </span>
                          <span style={{ color: text.muted }}>{example.input}</span>
                        </div>
                        <div>
                          <span className="font-semibold" style={{ color: text.secondary }}>Output: </span>
                          <span style={{ color: text.muted }}>{example.output}</span>
                        </div>
                        {example.explanation && (
                          <div>
                            <span className="font-semibold" style={{ color: text.secondary }}>Explanation: </span>
                            <span style={{ color: text.muted }}>{example.explanation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: text.primary }}>
                    Constraints
                  </h3>
                  <ul className="space-y-2">
                    {problem.constraints.map((constraint, idx) => (
                      <li key={idx} className="flex gap-2 text-sm">
                        <span style={{ color: brand.navy }}>•</span>
                        <span style={{ color: text.secondary }}>{constraint}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hints */}
                {problem.hints && problem.hints.length > 0 && (
                  <div>
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="flex items-center gap-2 mb-3 font-bold hover:opacity-70 transition-opacity"
                      style={{ color: brand.navy }}
                    >
                      <Lightbulb size={20} />
                      Hints ({problem.hints.length})
                    </button>
                    {showHints && (
                      <div className="space-y-2">
                        {problem.hints.map((hint, idx) => (
                          <div 
                            key={idx}
                            className="p-3 rounded-lg text-sm"
                            style={{ backgroundColor: `${accent.emerald}10`, color: text.secondary }}
                          >
                            <span className="font-semibold">Hint {idx + 1}: </span>
                            {hint}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Submissions Tab */}
            {activeTab === 'submissions' && (
              <div className="space-y-4">
                {submissions.length > 0 ? (
                  submissions.map((submission, idx) => (
                    <div 
                      key={submission.id}
                      className="p-4 rounded-lg border"
                      style={{ borderColor: border.default }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {submission.passed ? (
                            <CheckCircle size={20} style={{ color: accent.emerald }} />
                          ) : (
                            <XCircle size={20} style={{ color: '#ef4444' }} />
                          )}
                          <span className="font-semibold" style={{ color: text.primary }}>
                            {submission.passed ? 'Accepted' : 'Wrong Answer'}
                          </span>
                        </div>
                        <span className="text-xs" style={{ color: text.muted }}>
                          {new Date(submission.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-xs mb-1" style={{ color: text.muted }}>Tests Passed</p>
                          <p className="font-semibold" style={{ color: text.primary }}>
                            {submission.testsPassed}/{submission.totalTests}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs mb-1" style={{ color: text.muted }}>Language</p>
                          <p className="font-semibold capitalize" style={{ color: text.primary }}>
                            {submission.language}
                          </p>
                        </div>
                        {submission.runtime && (
                          <div>
                            <p className="text-xs mb-1" style={{ color: text.muted }}>Runtime</p>
                            <p className="font-semibold" style={{ color: text.primary }}>
                              {submission.runtime}ms
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Code2 size={48} className="mx-auto mb-4" style={{ color: text.muted }} />
                    <p style={{ color: text.muted }}>No submissions yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col" style={{ backgroundColor: background.white }}>
          {/* Language Selector */}
          <div 
            className="px-4 py-3 border-b flex items-center justify-between"
            style={{ borderColor: border.light }}
          >
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as Language)}
              className="px-3 py-2 rounded-lg border font-medium"
              style={{
                borderColor: border.default,
                backgroundColor: background.white,
                color: text.primary
              }}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="typescript">TypeScript</option>
            </select>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => runCode(false)}
                disabled={isRunning || isSubmitting}
              >
                {isRunning ? (
                  <>
                    <Clock size={16} className="animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    Run Code
                  </>
                )}
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => runCode(true)}
                disabled={isRunning || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Clock size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              value={code}
              onChange={setCode}
              language={selectedLanguage}
            />
          </div>

          {/* Test Results */}
          {showResults && (
            <div 
              className="border-t max-h-64 overflow-y-auto"
              style={{ borderColor: border.light }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold" style={{ color: text.primary }}>
                    Test Results ({passedTests}/{totalTests} passed)
                  </h3>
                  <button
                    onClick={() => setShowResults(false)}
                    className="text-sm hover:opacity-70"
                    style={{ color: text.muted }}
                  >
                    Close
                  </button>
                </div>
                
                <div className="space-y-2">
                  {testResults.map((result, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-lg border"
                      style={{ 
                        borderColor: result.passed ? accent.emerald : '#ef4444',
                        backgroundColor: result.passed ? `${accent.emerald}05` : '#fee'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {result.passed ? (
                          <CheckCircle size={16} style={{ color: accent.emerald }} />
                        ) : (
                          <XCircle size={16} style={{ color: '#ef4444' }} />
                        )}
                        <span className="font-semibold text-sm" style={{ color: text.primary }}>
                          Test Case {result.testCase}
                        </span>
                      </div>
                      <div className="text-xs space-y-1 font-mono">
                        <div>
                          <span className="font-semibold">Input: </span>
                          <span>{result.input}</span>
                        </div>
                        <div>
                          <span className="font-semibold">Expected: </span>
                          <span>{result.expected}</span>
                        </div>
                        {!result.passed && (
                          <>
                            <div>
                              <span className="font-semibold">Actual: </span>
                              <span>{result.actual}</span>
                            </div>
                            {result.error && (
                              <div style={{ color: '#ef4444' }}>
                                Error: {result.error}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


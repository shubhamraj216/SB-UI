"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Code, Trophy, Target, CheckCircle, Circle } from 'lucide-react';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { 
  codingProblems, 
  getProblemsByFilter, 
  allTopics, 
  difficulties,
  Difficulty,
  Topic,
  Problem
} from '@/lib/codingProblems';
import { getSubmissionsByProblem } from '@/lib/storage';
import { background, text, brand, border, accent } from '@/lib/colors';

export default function CodingInterviewPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | ''>('');
  const [selectedTopic, setSelectedTopic] = useState<Topic | ''>('');
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>(codingProblems);
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());

  // Load solved problems
  useEffect(() => {
    const solved = new Set<string>();
    codingProblems.forEach(problem => {
      const submissions = getSubmissionsByProblem(problem.id);
      if (submissions.some(s => s.passed)) {
        solved.add(problem.id);
      }
    });
    setSolvedProblems(solved);
  }, []);

  // Filter problems
  useEffect(() => {
    const filtered = getProblemsByFilter(
      selectedDifficulty || undefined,
      selectedTopic || undefined,
      searchQuery || undefined
    );
    setFilteredProblems(filtered);
  }, [searchQuery, selectedDifficulty, selectedTopic]);

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'Easy': return accent.emerald;
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
    }
  };

  const stats = {
    total: codingProblems.length,
    solved: solvedProblems.size,
    easy: codingProblems.filter(p => p.difficulty === 'Easy').length,
    medium: codingProblems.filter(p => p.difficulty === 'Medium').length,
    hard: codingProblems.filter(p => p.difficulty === 'Hard').length,
  };

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: background.primary }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: text.primary }}>
            Coding Interview Practice
          </h1>
          <p className="text-xl" style={{ color: text.muted }}>
            Master algorithms and data structures with {codingProblems.length} curated problems
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div 
            className="p-4 rounded-xl border text-center"
            style={{ 
              backgroundColor: background.white,
              borderColor: border.default
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy size={20} style={{ color: brand.navy }} />
              <span className="text-2xl font-bold" style={{ color: brand.navy }}>
                {stats.solved}
              </span>
            </div>
            <p className="text-sm" style={{ color: text.muted }}>Solved</p>
          </div>

          <div 
            className="p-4 rounded-xl border text-center"
            style={{ 
              backgroundColor: background.white,
              borderColor: border.default
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target size={20} style={{ color: text.muted }} />
              <span className="text-2xl font-bold" style={{ color: text.primary }}>
                {stats.total}
              </span>
            </div>
            <p className="text-sm" style={{ color: text.muted }}>Total</p>
          </div>

          <div 
            className="p-4 rounded-xl border text-center"
            style={{ 
              backgroundColor: background.white,
              borderColor: border.default
            }}
          >
            <span className="text-2xl font-bold" style={{ color: accent.emerald }}>
              {stats.easy}
            </span>
            <p className="text-sm" style={{ color: text.muted }}>Easy</p>
          </div>

          <div 
            className="p-4 rounded-xl border text-center"
            style={{ 
              backgroundColor: background.white,
              borderColor: border.default
            }}
          >
            <span className="text-2xl font-bold" style={{ color: '#f59e0b' }}>
              {stats.medium}
            </span>
            <p className="text-sm" style={{ color: text.muted }}>Medium</p>
          </div>

          <div 
            className="p-4 rounded-xl border text-center"
            style={{ 
              backgroundColor: background.white,
              borderColor: border.default
            }}
          >
            <span className="text-2xl font-bold" style={{ color: '#ef4444' }}>
              {stats.hard}
            </span>
            <p className="text-sm" style={{ color: text.muted }}>Hard</p>
          </div>
        </div>

        {/* Filters */}
        <div 
          className="p-6 rounded-xl mb-6"
          style={{ 
            backgroundColor: background.white,
            border: `1px solid ${border.default}`
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" 
                size={18} 
                style={{ color: text.muted }} 
              />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all"
                style={{
                  borderColor: border.default,
                  backgroundColor: background.white,
                  color: text.primary
                }}
              />
            </div>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | '')}
              className="px-4 py-2.5 rounded-lg border transition-all"
              style={{
                borderColor: border.default,
                backgroundColor: background.white,
                color: text.primary
              }}
            >
              <option value="">All Difficulties</option>
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>

            {/* Topic Filter */}
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value as Topic | '')}
              className="px-4 py-2.5 rounded-lg border transition-all"
              style={{
                borderColor: border.default,
                backgroundColor: background.white,
                color: text.primary
              }}
            >
              <option value="">All Topics</option>
              {allTopics.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Problems List */}
        <div 
          className="rounded-xl overflow-hidden border"
          style={{ 
            backgroundColor: background.white,
            borderColor: border.default
          }}
        >
          {/* Table Header */}
          <div 
            className="grid grid-cols-12 gap-4 px-6 py-4 border-b font-semibold text-sm"
            style={{ 
              borderColor: border.light,
              backgroundColor: background.primary,
              color: text.secondary
            }}
          >
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-6 md:col-span-5">Title</div>
            <div className="hidden md:block col-span-4">Topics</div>
            <div className="col-span-5 md:col-span-2 text-center">Difficulty</div>
          </div>

          {/* Table Body */}
          <div className="divide-y" style={{ borderColor: border.light }}>
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem, index) => {
                const isSolved = solvedProblems.has(problem.id);
                
                return (
                  <Link
                    key={problem.id}
                    href={`/coding-interview/${problem.id}`}
                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
                  >
                    {/* Status */}
                    <div className="col-span-1 flex justify-center">
                      {isSolved ? (
                        <CheckCircle size={20} style={{ color: accent.emerald }} />
                      ) : (
                        <Circle size={20} style={{ color: border.default }} />
                      )}
                    </div>

                    {/* Title */}
                    <div className="col-span-6 md:col-span-5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium" style={{ color: text.muted }}>
                          {index + 1}.
                        </span>
                        <span 
                          className="font-semibold hover:underline"
                          style={{ color: isSolved ? brand.navy : text.primary }}
                        >
                          {problem.title}
                        </span>
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="hidden md:flex col-span-4 gap-2 flex-wrap">
                      {problem.topics.slice(0, 2).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 text-xs rounded-md"
                          style={{ 
                            backgroundColor: `${brand.navy}10`,
                            color: brand.navy
                          }}
                        >
                          {topic}
                        </span>
                      ))}
                      {problem.topics.length > 2 && (
                        <span
                          className="px-2 py-1 text-xs rounded-md"
                          style={{ 
                            backgroundColor: `${brand.navy}10`,
                            color: brand.navy
                          }}
                        >
                          +{problem.topics.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Difficulty */}
                    <div className="col-span-5 md:col-span-2 flex justify-center">
                      <span
                        className="px-3 py-1 text-sm font-semibold rounded-full"
                        style={{ 
                          backgroundColor: `${getDifficultyColor(problem.difficulty)}15`,
                          color: getDifficultyColor(problem.difficulty)
                        }}
                      >
                        {problem.difficulty}
                      </span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="text-center py-16">
                <Code size={48} className="mx-auto mb-4" style={{ color: text.muted }} />
                <p className="text-lg font-medium mb-2" style={{ color: text.primary }}>
                  No problems found
                </p>
                <p style={{ color: text.muted }}>
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center" style={{ color: text.muted }}>
          <p className="text-sm">
            Showing {filteredProblems.length} of {codingProblems.length} problems
          </p>
        </div>
      </div>
    </div>
  );
}


'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { GithubRepo, GithubUser, SortOption, RateLimit } from '@/types/github';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import DashboardHeader from '@/components/DashboardHeader';
import StatsCards from '@/components/StatsCards';
import LanguageGroup from '@/components/LanguageGroup';
import CompactSearchBar from '@/components/CompactSearchBar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [rateLimit, setRateLimit] = useState<RateLimit | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('stars');
  const [filterLang, setFilterLang] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hasSearched, setHasSearched] = useState(false);

  // Apply theme to document
  useEffect(() => {
    // On mount, check if there is a saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    } else {
      // Default to dark if no saved theme
      document.documentElement.className = 'dark';
    }
  }, []);

  // Update document class when theme changes
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      return newTheme;
    });
  };

  const fetchStars = async (searchUsername: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setUsername(searchUsername);
    setRepos([]);
    setUser(null);

    // Don't reset rate limit immediately, keep previous if any, or let it update

    const steps = [
      'Establishing secure tunnel to GitHub...',
      'Verifying API handshake protocols...',
      'Mapping decentralized star network...',
      'Extracting repository metadata...',
      'Running language dependency analysis...',
      'Optimizing influence score indices...',
      'Compiling real-time dashboard data...'
    ];

    let currentStepIndex = 0;
    const stepInterval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setScanStep(steps[currentStepIndex]);
        currentStepIndex++;
      }
    }, 400);

    try {
      // Use our Next.js API route to fetch GitHub data
      const response = await fetch(`/api/github?username=${encodeURIComponent(searchUsername)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch data');
      }

      // Brief delay for UX
      await new Promise(resolve => setTimeout(resolve, 800));

      if (data.repos.length === 0) {
        throw new Error('This user has no public starred repositories.');
      }

      setUser(data.user);
      setRepos(data.repos);
      if (data.rateLimit) {
        setRateLimit(data.rateLimit);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setRepos([]);
      setUser(null);
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setScanStep('');
    }
  };

  const resetSearch = () => {
    setHasSearched(false);
    setRepos([]);
    setUser(null);
    setUsername('');
    setError(null);
    setFilterLang('All');
    setSortBy('stars');
    setSearchTerm('');
    // rateLimit can persist
  };

  // ... (useMemo hooks remain same)

  // Compute languages for filter dropdown
  const languages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach(repo => {
      if (repo.language) langs.add(repo.language);
    });
    return ['All', ...Array.from(langs).sort()];
  }, [repos]);

  // Sort and filter repos
  const sortedAndFilteredRepos = useMemo(() => {
    let result = [...repos];

    // Language Filter
    if (filterLang !== 'All') {
      result = result.filter(repo => repo.language === filterLang);
    }

    // Search Term Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(repo =>
        repo.name.toLowerCase().includes(lowerTerm) ||
        (repo.description && repo.description.toLowerCase().includes(lowerTerm))
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'recent') return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
      return 0;
    });
    return result;
  }, [repos, sortBy, filterLang, searchTerm]);

  // Group repos by language
  const groupedRepos = useMemo(() => {
    const groups: Record<string, GithubRepo[]> = {};
    sortedAndFilteredRepos.forEach(repo => {
      const lang = repo.language || 'Other';
      if (!groups[lang]) groups[lang] = [];
      groups[lang].push(repo);
    });
    return groups;
  }, [sortedAndFilteredRepos]);

  // Calculate global stats
  const stats = useMemo(() => {
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const langCounts: Record<string, number> = {};
    repos.forEach(repo => {
      const lang = repo.language || 'Unknown';
      langCounts[lang] = (langCounts[lang] || 0) + 1;
    });

    // Find top language
    let topLang = 'None';
    let maxCount = 0;
    Object.entries(langCounts).forEach(([lang, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topLang = lang;
      }
    });

    return { totalStars, topLanguage: topLang };
  }, [repos]);

  return (
    <div className="min-h-screen flex flex-col transition-all duration-200">

      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        hasSearched={hasSearched}
        isLoading={isLoading}
        onSearch={fetchStars}
        onReset={resetSearch}
      />

      <main
        className={`
          w-full mx-auto px-6 md:px-12 
          ${!hasSearched
            ? 'flex-1 flex flex-col items-center justify-center max-w-7xl'
            : 'pt-12 pb-16 max-w-5xl flex-1 flex flex-col'}
        `}
      >
        <div className={`w-full transition-all duration-500 ${isLoading ? 'opacity-40 blur-md pointer-events-none scale-[0.99]' : 'opacity-100 blur-0 scale-100'}`}>
          {/* Hero - Initial State */}
          {!hasSearched && (
            <HeroSection onSearch={fetchStars} isLoading={isLoading} rateLimit={rateLimit} />
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
              <ErrorState message={error} onRetry={resetSearch} />
            </div>
          )}

          {/* Dashboard - Results */}
          {hasSearched && !isLoading && !error && (
            <div className="animate-slide-up space-y-8">
              <StatsCards
                totalRepos={repos.length}
                topLanguage={stats.topLanguage}
                user={user}
                rateLimit={rateLimit}
              />

              <DashboardHeader
                username={username}
                user={user}
                languages={languages}
                filterLang={filterLang}
                sortBy={sortBy}
                onFilterChange={setFilterLang}
                onSortChange={setSortBy}
                filteredData={sortedAndFilteredRepos}
                allRepos={repos}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />

              <div className="space-y-16">
                {Object.keys(groupedRepos)
                  .sort((a, b) => {
                    if (a === 'Other') return 1;
                    if (b === 'Other') return -1;
                    return a.localeCompare(b);
                  })
                  .map(lang => (
                    <LanguageGroup key={lang} language={lang} repos={groupedRepos[lang]} />
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Loading State - Overlay or center */}
        {isLoading && hasSearched && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/20 backdrop-blur-md">
            <LoadingState step={scanStep} />
          </div>
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

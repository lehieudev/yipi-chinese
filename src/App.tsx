import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardHome } from '@/pages/DashboardHome';
import { BeginnerPage } from '@/pages/BeginnerPage';
import { HskCurriculumPage } from '@/pages/HskCurriculumPage';
import { ExercisesPage } from '@/pages/ExercisesPage';
import { HskExamPage } from '@/pages/HskExamPage';
import { TocflExamPage } from '@/pages/TocflExamPage';
import { VideosPage } from '@/pages/VideosPage';
import { ListeningPage } from '@/pages/ListeningPage';
import { SpeakingPage } from '@/pages/SpeakingPage';
import { ReadingPage } from '@/pages/ReadingPage';
import { ShadowingPage } from '@/pages/ShadowingPage';
import { WritingPage } from '@/pages/WritingPage';
import { PronunciationPage } from '@/pages/PronunciationPage';
import { GrammarPage } from '@/pages/GrammarPage';
import { ConversationPage } from '@/pages/ConversationPage';
import { TranslationPage } from '@/pages/TranslationPage';
import { AITutorPage } from '@/pages/AITutorPage';
import { NotebookPage } from '@/pages/NotebookPage';
import { TopicVocabPage } from '@/pages/TopicVocabPage';
import { VocabTipsPage } from '@/pages/VocabTipsPage';
import { QuantifiersPage } from '@/pages/QuantifiersPage';
import { CharactersPage } from '@/pages/CharactersPage';
import { RadicalsPage } from '@/pages/RadicalsPage';
import { SyllablesPage } from '@/pages/SyllablesPage';
import { GeneralPracticePage } from '@/pages/GeneralPracticePage';
import { StoriesPage } from '@/pages/StoriesPage';
import { StudyMaterialsPage } from '@/pages/StudyMaterialsPage';
import { GamesPage } from '@/pages/GamesPage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { FriendsPage } from '@/pages/FriendsPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { AffiliatePage } from '@/pages/AffiliatePage';
import { SettingsPage } from '@/pages/SettingsPage';

import { TransitionProvider } from '@/contexts/TransitionContext';

export default function App() {
  return (
    <Router>
      <TransitionProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />

          <Route path="beginner" element={<BeginnerPage />} />
          <Route path="hsk" element={<HskCurriculumPage />} />
          <Route path="exercises" element={<ExercisesPage />} />
          <Route path="exam" element={<HskExamPage />} />
          <Route path="tocfl" element={<TocflExamPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="listening" element={<ListeningPage />} />
          <Route path="speaking" element={<SpeakingPage />} />
          <Route path="reading" element={<ReadingPage />} />
          <Route path="writing" element={<WritingPage />} />
          <Route path="pronunciation" element={<PronunciationPage />} />
          <Route path="shadowing" element={<ShadowingPage />} />
          <Route path="grammar" element={<GrammarPage />} />
          <Route path="conversation" element={<ConversationPage />} />
          <Route path="translation" element={<TranslationPage />} />
          <Route path="ai-tutor" element={<AITutorPage />} />
          <Route path="notebook" element={<NotebookPage />} />
          <Route path="topic-vocab" element={<TopicVocabPage />} />
          <Route path="vocab-tips" element={<VocabTipsPage />} />
          <Route path="quantifiers" element={<QuantifiersPage />} />
          <Route path="characters" element={<CharactersPage />} />
          <Route path="radicals" element={<RadicalsPage />} />
          <Route path="syllables" element={<SyllablesPage />} />
          <Route path="general-practice" element={<GeneralPracticePage />} />
          <Route path="stories" element={<StoriesPage />} />
          <Route path="materials" element={<StudyMaterialsPage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="friends" element={<FriendsPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="affiliate" element={<AffiliatePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TransitionProvider>
    </Router>
  );
}

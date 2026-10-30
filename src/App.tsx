import React, { useState, useEffect } from 'react';
import { BirthdayConfig, MemoryItem } from './types';
import { INITIAL_BIRTHDAY_CONFIG } from './utils/defaultData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BirthdayCake } from './components/BirthdayCake';
import { PolaroidGallery } from './components/PolaroidGallery';
import { ReasonsJar } from './components/ReasonsJar';
import { OpenWhenLetters } from './components/OpenWhenLetters';
import { ScratchVouchers } from './components/ScratchVouchers';
import { LoveQuiz } from './components/LoveQuiz';
import { PersonalizeModal } from './components/PersonalizeModal';
import { Footer } from './components/Footer';
import { FloatingHeartsOverlay } from './components/FloatingHeartsOverlay';

const STORAGE_KEY = 'forever_birthday_config_v4';

export default function App() {
  const [config, setConfig] = useState<BirthdayConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.girlfriendName === 'Maya' || !parsed.girlfriendName) {
          parsed.girlfriendName = 'Shrishti';
        }
        if (parsed.boyfriendName === 'Alex' || !parsed.boyfriendName) {
          parsed.boyfriendName = 'Aryan';
        }
        parsed.birthdayDate = '2026-11-30';
        parsed.ageMilestone = 16;
        parsed.anniversaryDate = '2026-02-15';
        return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_BIRTHDAY_CONFIG;
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Save changes to localStorage
  const updateConfig = (newConfig: BirthdayConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch {
      // Handle storage quota if any
    }
  };

  const handleAddMemory = (newMemory: MemoryItem) => {
    const updated = {
      ...config,
      memories: [newMemory, ...config.memories],
    };
    updateConfig(updated);
  };

  const handleAddReason = (newReason: string) => {
    const updated = {
      ...config,
      loveReasons: [...config.loveReasons, newReason],
    };
    updateConfig(updated);
  };

  const handleRedeemVoucher = (voucherId: string) => {
    const updatedVouchers = config.vouchers.map((v) =>
      v.id === voucherId ? { ...v, isRedeemed: true } : v
    );
    updateConfig({
      ...config,
      vouchers: updatedVouchers,
    });
  };

  const handleUpdateWish = (newWish: string) => {
    updateConfig({
      ...config,
      customWish: newWish,
    });
  };

  const handleScrollToCake = () => {
    const el = document.getElementById('cake');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f4] text-stone-800 selection:bg-rose-200 selection:text-rose-900 font-sans">
      {/* Top Bar */}
      <Navbar
        girlfriendName={config.girlfriendName}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        audioPlaying={audioPlaying}
        setAudioPlaying={setAudioPlaying}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection config={config} onScrollToCake={handleScrollToCake} />

        {/* Interactive Birthday Cake & Wish Blowing */}
        <BirthdayCake config={config} onUpdateWish={handleUpdateWish} />

        {/* Polaroid Memory Vault */}
        <PolaroidGallery memories={config.memories} onAddMemory={handleAddMemory} />

        {/* Jar of Reasons Why I Love You */}
        <ReasonsJar
          reasons={config.loveReasons}
          girlfriendName={config.girlfriendName}
          boyfriendName={config.boyfriendName}
          onAddReason={handleAddReason}
        />

        {/* Open When Letters */}
        <OpenWhenLetters
          letters={config.letters}
          girlfriendName={config.girlfriendName}
        />

        {/* Interactive Scratch-off Coupon Vouchers */}
        <ScratchVouchers vouchers={config.vouchers} onRedeem={handleRedeemVoucher} />

        {/* Romantic Love Story Quiz */}
        <LoveQuiz
          questions={config.quizQuestions}
          girlfriendName={config.girlfriendName}
          boyfriendName={config.boyfriendName}
        />
      </main>

      {/* Romantic Footer */}
      <Footer
        girlfriendName={config.girlfriendName}
        boyfriendName={config.boyfriendName}
      />

      {/* Floating Interactive Hearts Overlay */}
      <FloatingHeartsOverlay />

      {/* Personalization Studio Modal */}
      <PersonalizeModal
        config={config}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onSaveConfig={updateConfig}
      />
    </div>
  );
}

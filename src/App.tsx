/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Layers, 
  SearchCheck, 
  LineChart, 
  HelpCircle, 
  LogOut, 
  Bell, 
  UserCircle, 
  Volume2, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  Timer, 
  ListChecks, 
  Flame, 
  Zap, 
  SkipForward,
  ChevronRight,
  Play,
  X,
  Edit3
} from 'lucide-react';

import wordsData from './data/words.json';

// --- Types ---

type View = 'dashboard' | 'flashcards' | 'quiz' | 'challenge';

interface Word {
  id: string;
  word: string;
  meaning: string;
  pronounce: string;
  type: string;
  example?: string;
  category?: string;
  image?: string;
}

const ALL_WORDS = wordsData as Word[];

// --- Helper Functions ---

const getRandomWords = (count: number) => {
  const shuffled = [...ALL_WORDS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// --- Initial Data ---

const getWordsOfTheDay = () => ALL_WORDS.sort(() => 0.5 - Math.random()).slice(0, 4).map((w, i) => ({
  ...w,
  category: i % 2 === 0 ? 'LEVEL B2' : 'OXFORD 3000',
  image: `https://picsum.photos/seed/${w.word}/400/300`
}));

// --- Components ---

const Sidebar = ({ activeView, setView, theme, toggleTheme }: { activeView: View, setView: (v: View) => void, theme: 'dark' | 'light', toggleTheme: () => void }) => (
  <aside className="hidden lg:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-surface-container-low/90 backdrop-blur-xl border-r border-outline-variant/20 flex-col p-4 gap-2 z-40">
    <div className="p-4 flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden">
          <img 
            src="https://picsum.photos/seed/avatar/100/100" 
            alt="User" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <p className="font-display text-lg text-primary font-bold">Người học Pro</p>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Oxford 3000</p>
        </div>
      </div>
    </div>
    
    <nav className="flex flex-col gap-1 mt-6">
      <NavItem 
        icon={<LayoutDashboard size={20} />} 
        label="Bảng điều khiển" 
        active={activeView === 'dashboard'} 
        onClick={() => setView('dashboard')} 
      />
      <NavItem 
        icon={<Layers size={20} />} 
        label="Thẻ ghi nhớ" 
        active={activeView === 'flashcards'} 
        onClick={() => setView('flashcards')} 
      />
      <NavItem 
        icon={<SearchCheck size={20} />} 
        label="Trắc nghiệm" 
        active={activeView === 'challenge'} 
        onClick={() => setView('challenge')} 
      />
      <NavItem 
        icon={<Edit3 size={20} />} 
        label="Viết chính tả" 
        active={activeView === 'quiz'} 
        onClick={() => setView('quiz')} 
      />
      <NavItem icon={<LineChart size={20} />} label="Tiến độ" />
    </nav>

    <div className="mt-auto px-4 py-6 space-y-4">
      <button 
        onClick={toggleTheme}
        className="w-full flex items-center justify-center gap-3 bg-surface-container-high text-on-surface font-display text-xs font-bold py-3 rounded-xl border border-outline-variant/30 active:scale-95 transition-all"
      >
        {theme === 'dark' ? <Lightbulb size={16} /> : <Zap size={16} />}
        {theme === 'dark' ? 'CHẾ ĐỘ SÁNG' : 'CHẾ ĐỘ TỐI'}
      </button>
      <button 
        onClick={() => setView('challenge')}
        className="w-full bg-primary text-on-primary font-display text-xs font-bold py-3 rounded-xl neon-glow-primary active:scale-95 transition-all"
      >
        BẮT ĐẦU THỬ THÁCH
      </button>
    </div>

    <div className="border-t border-outline-variant/20 pt-2 pb-4">
      <NavItem icon={<HelpCircle size={20} />} label="Trợ giúp" />
      <NavItem icon={<LogOut size={20} />} label="Đăng xuất" />
    </div>
  </aside>
);

const BottomNav = ({ activeView, setView }: { activeView: View, setView: (v: View) => void }) => (
  <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-surface-container-low/95 backdrop-blur-xl border-t border-outline-variant/20 flex justify-around items-center px-4 z-50">
    <button onClick={() => setView('dashboard')} className={`flex flex-col items-center gap-1 ${activeView === 'dashboard' ? 'text-primary' : 'text-on-surface-variant'}`}>
      <LayoutDashboard size={24} />
      <span className="text-[10px] font-bold uppercase tracking-widest">Chính</span>
    </button>
    <button onClick={() => setView('flashcards')} className={`flex flex-col items-center gap-1 ${activeView === 'flashcards' ? 'text-primary' : 'text-on-surface-variant'}`}>
      <Layers size={24} />
      <span className="text-[10px] font-bold uppercase tracking-widest">Thẻ</span>
    </button>
    <button onClick={() => setView('challenge')} className={`relative -top-4 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center active:scale-90 transition-transform`}>
      <Zap size={28} />
    </button>
    <button onClick={() => setView('quiz')} className={`flex flex-col items-center gap-1 ${activeView === 'quiz' ? 'text-primary' : 'text-on-surface-variant'}`}>
      <Edit3 size={24} />
      <span className="text-[10px] font-bold uppercase tracking-widest">Viết</span>
    </button>
    <button className="flex flex-col items-center gap-1 text-on-surface-variant">
      <UserCircle size={24} />
      <span className="text-[10px] font-bold uppercase tracking-widest">Tôi</span>
    </button>
  </nav>
);

const NavItem = ({ icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 w-full ${
      active 
        ? 'bg-secondary-container/20 text-secondary border-r-4 border-secondary shadow-[0_0_15px_rgba(220,184,255,0.1)]' 
        : 'text-on-surface-variant hover:bg-surface-bright/10 hover:text-primary'
    }`}
  >
    {icon}
    <span className="font-display text-xs font-bold uppercase tracking-wider">{label}</span>
  </button>
);

const TopNav = ({ showBack, onBack }: { showBack?: boolean, onBack?: () => void }) => (
  <header className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-6 z-50">
    <div className="flex items-center gap-4">
      {showBack ? (
        <button onClick={onBack} className="p-2 hover:bg-surface-variant/30 rounded-full transition-colors text-on-surface-variant">
          <X size={20} />
        </button>
      ) : null}
      <span className="font-display text-xl font-bold text-primary tracking-tight">3000 TỪ VỰNG OXFORD</span>
    </div>
    
    <div className="flex items-center gap-6">
      <nav className="hidden md:flex items-center gap-8">
        <button className="text-on-surface font-display text-xs font-bold uppercase border-b-2 border-primary h-16">Trang chủ</button>
        <button className="text-on-surface-variant hover:text-primary font-display text-xs font-bold uppercase h-16 transition-colors">Thẻ ghi nhớ</button>
        <button className="text-on-surface-variant hover:text-primary font-display text-xs font-bold uppercase h-16 transition-colors">Luyện tập</button>
      </nav>
      <div className="flex items-center gap-4">
        <button className="text-on-surface-variant hover:text-primary transition-colors"><Bell size={20} /></button>
        <button className="text-on-surface-variant hover:text-primary transition-colors"><UserCircle size={20} /></button>
      </div>
    </div>
  </header>
);

// --- View: Dashboard ---

const DashboardView = ({ setView, progress, wordsOfTheDay }: { setView: (v: View) => void, progress: number, wordsOfTheDay: Word[] }) => {
  const percentage = Math.round((progress / ALL_WORDS.length) * 100);
  const dashOffset = 276 - (276 * percentage / 100);

  return (
  <div className="animate-in fade-in duration-500 pb-24 lg:pb-0">
    {/* Hero Stats */}
    <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-8 md:mb-12">
      <div className="md:col-span-4 glass-panel bg-surface-container rounded-3xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-secondary/10" />
        <p className="font-display text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">Chuỗi ngày học</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-on-surface">1 <span className="text-xl md:text-2xl font-medium">Ngày</span></h2>
        <div className="flex gap-1 mt-4">
          {[1].map(i => <div key={i} className="h-1 flex-1 bg-secondary rounded-full" />)}
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-1 flex-1 bg-secondary/20 rounded-full" />)}
        </div>
      </div>

      <div className="md:col-span-4 glass-panel bg-surface-container rounded-3xl p-6 flex items-center gap-6">
        <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-surface-bright" />
            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="276" strokeDashoffset={dashOffset} strokeLinecap="round" className="text-primary transition-all duration-1000" />
          </svg>
          <span className="absolute font-display text-primary font-bold">{percentage}%</span>
        </div>
        <div>
          <p className="font-display text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Tổng tiến trình</p>
          <h3 className="font-display text-xl md:text-2xl font-bold text-on-surface">{progress} <span className="text-xs text-on-surface-variant font-medium">/ {ALL_WORDS.length}</span></h3>
          <p className="text-xs md:text-sm text-on-surface-variant">Từ đã thuộc</p>
        </div>
      </div>

      <div className="md:col-span-4 glass-panel bg-surface-container rounded-3xl p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <p className="font-display text-[10px] text-tertiary font-bold uppercase tracking-widest">Strength Chart</p>
          <LineChart size={16} className="text-tertiary" />
        </div>
        <div className="flex items-end gap-1.5 h-16 mt-4">
          {[30, 45, 60, 40, 85, 70, 95].map((h, i) => (
            <div 
              key={i} 
              style={{ height: `${h}%` }} 
              className={`flex-1 rounded-t-sm transition-all duration-500 ${i === 6 ? 'bg-tertiary neon-glow-primary' : 'bg-tertiary/20 hover:bg-tertiary/40'}`} 
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-on-surface-variant font-display font-medium">MON</span>
          <span className="text-[10px] text-primary font-display font-medium">SUN</span>
        </div>
      </div>
    </section>

    {/* Mastery Pathways */}
    <section className="mb-12">
      <h2 className="font-display text-3xl font-bold text-on-surface mb-8">Lộ trình học tập</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PathCard 
          icon={<Layers size={24} />} 
          title="Thẻ ghi nhớ" 
          desc="Hệ thống lặp lại ngắt quãng giúp ghi nhớ lâu dài." 
          meta="FLASHCARDS" 
          color="primary"
          onClick={() => setView('flashcards')}
        />
        <PathCard 
          icon={<Zap size={24} />} 
          title="Trắc nghiệm" 
          desc="Các phiên học nhanh để kiểm tra tốc độ phản xạ." 
          meta="MULTIPLE CHOICE" 
          color="secondary"
          onClick={() => setView('challenge')}
        />
        <PathCard 
          icon={<Edit3 size={24} />} 
          title="Viết chính tả" 
          desc="Luyện viết từ đúng chính tả dựa trên nghĩa tiếng Việt." 
          meta="SPELLING" 
          color="tertiary"
          onClick={() => setView('quiz')}
        />
      </div>
    </section>

    {/* Words of the Day */}
    <section>
      <div className="flex justify-between items-end mb-8">
        <h2 className="font-display text-3xl font-bold text-on-surface">Từ vựng hôm nay</h2>
        <button onClick={() => window.location.reload()} className="text-primary font-display text-xs font-bold uppercase hover:underline">Làm mới danh sách</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wordsOfTheDay.map(word => (
          <WordCard key={word.id} word={word} />
        ))}
      </div>
    </section>
  </div>
  );
};

const PathCard = ({ icon, title, desc, meta, color, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`group glass-panel bg-surface-container hover:bg-surface-container-high rounded-3xl p-6 transition-all border-l-4 text-left ${
      color === 'primary' ? 'border-primary neon-glow-primary' : 
      color === 'secondary' ? 'border-secondary' : 'border-tertiary'
    }`}
  >
    <div className="flex justify-between items-start mb-10">
      <div className={`p-3 rounded-xl ${
        color === 'primary' ? 'bg-primary/10 text-primary' : 
        color === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-tertiary/10 text-tertiary'
      }`}>
        {icon}
      </div>
      <span className="text-on-surface-variant font-display text-[10px] font-bold tracking-widest">{meta}</span>
    </div>
    <h3 className="font-display text-2xl font-bold text-on-surface mb-1">{title}</h3>
    <p className="text-sm text-on-surface-variant mb-6">{desc}</p>
    <div className={`flex items-center gap-1 group-hover:gap-2 transition-all font-display text-xs font-bold uppercase ${
      color === 'primary' ? 'text-primary' : 
      color === 'secondary' ? 'text-secondary' : 'text-tertiary'
    }`}>
      Bắt đầu học <ChevronRight size={14} />
    </div>
  </button>
);

const WordCard = ({ word }: { word: Word }) => (
  <div className="glass-panel bg-surface-container rounded-3xl overflow-hidden group">
    <div className="h-32 relative">
      <img src={word.image} alt={word.word} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/20 to-transparent" />
    </div>
    <div className="p-6 relative -mt-8">
      <span className="bg-surface-container px-3 py-1 rounded-lg border border-outline-variant/30 text-[10px] font-display font-bold tracking-widest text-tertiary uppercase mb-3 inline-block">
        {word.type}
      </span>
      <h4 className="font-display text-xl font-bold text-on-surface mb-1">{word.word}</h4>
      <p className="text-sm text-on-surface-variant line-clamp-2">{word.meaning}</p>
    </div>
  </div>
);

// --- View: Flashcards ---

const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  window.speechSynthesis.speak(utterance);
};

const FlashcardView = ({ words, onComplete }: { words: Word[], onComplete: (masteredIds: string[]) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  const currentWord = words[currentIndex];
  const progress = Math.round(((currentIndex) / words.length) * 100);

  const handleAction = (known: boolean) => {
    const newMastered = known ? [...masteredIds, currentWord.id] : masteredIds;
    setMasteredIds(newMastered);
    setIsFlipped(false);
    
    if (currentIndex < words.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    } else {
      onComplete(newMastered);
    }
  };

  if (!currentWord) return null;
  
  return (
    <div className="flex-grow flex flex-col max-w-2xl mx-auto w-full pt-10">
      <header className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 px-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => onComplete(masteredIds)} className="p-2 hover:bg-surface-variant/30 rounded-full transition-colors text-on-surface-variant">
            <X size={20} />
          </button>
          <span className="font-display text-xl font-bold text-primary tracking-tight">LUYỆN THẺ GHI NHỚ</span>
        </div>
      </header>

      <div className="flex justify-between items-end mb-2 mt-8">
        <div>
          <p className="font-display text-[10px] text-tertiary font-bold uppercase tracking-widest">Từ thứ: {currentIndex + 1} / {words.length}</p>
          <h1 className="font-display text-2xl font-bold text-on-surface">Ghi nhớ từ vựng</h1>
        </div>
        <span className="font-display text-sm text-primary font-bold">Tiến độ {progress}%</span>
      </div>
      <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden mb-12">
        <div className="h-full bg-primary rounded-full relative transition-all duration-500" style={{ width: `${progress}%` }}>
          <div className="absolute right-0 top-0 h-full w-4 bg-primary neon-glow-primary" />
        </div>
      </div>

      <div className="perspective-1000 w-full aspect-[4/3] relative cursor-pointer group mb-8" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div 
          className="w-full h-full relative"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 backface-hidden rounded-[40px] bg-surface-container-high border border-primary/20 flex flex-col items-center justify-center p-12 shadow-2xl overflow-hidden">
            <button 
              onClick={(e) => { e.stopPropagation(); speak(currentWord.word); }}
              className="absolute top-8 right-8 p-3 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
            >
              <Volume2 size={24} />
            </button>
            <div className="flex flex-col items-center gap-2">
              <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-display text-[10px] font-bold tracking-widest uppercase">{currentWord.type}</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-on-surface text-center break-words max-w-full">{currentWord.word}</h2>
              {currentWord.pronounce && <span className="font-display text-base md:text-lg text-on-surface-variant">{currentWord.pronounce}</span>}
            </div>
            <div className="mt-16 flex flex-col items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <Play size={20} className="text-outline-variant rotate-90" />
              <span className="font-display text-[10px] font-bold tracking-widest text-outline-variant uppercase">Nhấn để xem nghĩa</span>
            </div>
          </div>

          <div className="absolute inset-0 backface-hidden rounded-[40px] bg-gradient-to-br from-surface-container-highest to-surface-container-low border border-secondary/20 flex flex-col items-center justify-center p-12 shadow-2xl" style={{ transform: 'rotateY(180deg)' }}>
            <div className="flex flex-col items-center gap-6 text-center">
              <span className="bg-secondary/10 text-secondary px-4 py-1 rounded-full font-display text-[10px] font-bold tracking-widest uppercase">NGHĨA CỦA TỪ</span>
              <h2 className="font-display text-3xl font-bold text-on-surface">{currentWord.meaning}</h2>
              <div className="w-16 h-px bg-outline-variant/30" />
              <p className="text-sm text-on-surface-variant">Nhấn lại để xem từ tiếng Anh</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={(e) => { e.stopPropagation(); handleAction(false); }}
          className="flex-1 bg-surface-container-low border-2 border-error/20 hover:border-error/50 flex items-center justify-center gap-2 py-5 rounded-2xl transition-all group scale-95 active:scale-90"
        >
          <XCircle size={20} className="text-error group-hover:scale-110 transition-transform" />
          <span className="font-display text-[10px] font-bold tracking-widest text-error uppercase">CẦN HỌC THÊM</span>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleAction(true); }}
          className="flex-1 bg-tertiary/10 border-2 border-tertiary/20 hover:border-tertiary/60 flex items-center justify-center gap-2 py-5 rounded-2xl transition-all group scale-95 active:scale-90 shadow-[0_0_20px_rgba(0,220,229,0.1)]"
        >
          <CheckCircle2 size={20} className="text-tertiary group-hover:scale-110 transition-transform" />
          <span className="font-display text-[10px] font-bold tracking-widest text-tertiary uppercase">ĐÃ THUỘC TỪ NÀY</span>
        </button>
      </div>
    </div>
  );
};

// --- View: Quiz (Fill in) ---

const QuizView = ({ words, onComplete }: { words: Word[], onComplete: (masteredIds: string[]) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  
  const currentWord = words[currentIndex];
  const progress = Math.round(((currentIndex) / words.length) * 100);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim().toLowerCase() === currentWord.word.toLowerCase()) {
      const newMastered = [...masteredIds, currentWord.id];
      setMasteredIds(newMastered);
      if (currentIndex < words.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setInput('');
        setIsWrong(false);
      } else {
        onComplete(newMastered);
      }
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500);
    }
  };
  
  if (!currentWord) return null;

  return (
    <div className="flex-grow flex flex-col items-center justify-center max-w-4xl mx-auto w-full pt-10 pb-20">
      <header className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 px-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => onComplete(masteredIds)} className="p-2 hover:bg-surface-variant/30 rounded-full transition-colors text-on-surface-variant">
            <X size={20} />
          </button>
          <span className="font-display text-xl font-bold text-primary tracking-tight">LUYỆN VIẾT CHÍNH TẢ</span>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={`w-full max-w-2xl space-y-8 md:space-y-12 text-center animate-in slide-in-from-bottom-8 duration-700 px-4 ${isWrong ? 'animate-shake' : ''}`}>
        <div className="space-y-4">
          <div className="inline-flex px-4 py-1 rounded-full bg-secondary-container/20 border border-secondary/30">
            <span className="font-display text-[10px] font-bold text-secondary uppercase tracking-widest">{currentWord.type}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-on-surface tracking-tight break-words">{currentWord.meaning}</h1>
          <p className="text-sm md:text-lg text-on-surface-variant">Hãy viết từ tiếng Anh có nghĩa như trên.</p>
        </div>

        <div className="relative group w-full">
          <input 
            type="text"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập từ..."
            className={`w-full h-24 md:h-32 bg-surface-container/60 backdrop-blur-xl border rounded-3xl text-center font-display text-3xl md:text-5xl placeholder-outline-variant/30 transition-all outline-none px-6 md:px-10 ${
              isWrong ? 'border-error text-error shadow-error/20' : 'border-primary/20 focus:border-primary text-primary neon-glow-primary'
            }`}
          />
          <button type="button" onClick={() => setInput(currentWord.word)} className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-primary text-primary font-display text-[10px] font-bold hover:bg-primary/10 transition-all active:scale-95 group">
            <Lightbulb size={14} className="md:w-4 md:h-4" />
            <span className="hidden sm:inline">GỢI Ý</span>
          </button>
        </div>

        <div className="flex justify-center gap-8 opacity-40">
          <div className="flex items-center gap-2">
            <kbd className="bg-surface-container-highest px-2 py-1 rounded text-[10px] font-mono border border-outline-variant/30">ENTER</kbd>
            <span className="font-display text-[10px] font-bold uppercase tracking-wider">Xác nhận</span>
          </div>
        </div>
      </form>

      {/* Quiz Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-surface-container-lowest/80 backdrop-blur-md border-t border-outline-variant/10 z-40">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-1">
            <div className="flex justify-between items-end">
              <span className="font-display text-[10px] font-bold text-on-surface-variant uppercase">Tiến trình</span>
              <span className="font-display text-[10px] font-bold text-primary">{currentIndex + 1} / {words.length}</span>
            </div>
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary neon-glow-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button onClick={() => onComplete(masteredIds)} className="bg-primary text-on-primary px-10 py-3 rounded-xl font-display text-xs font-bold uppercase hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20">
              Kết thúc phiên
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- View: Challenge (Multiple Choice) ---

const ChallengeView = ({ words, onComplete }: { words: Word[], onComplete: (masteredIds: string[]) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [timer, setTimer] = useState(10);
  const [choices, setChoices] = useState<any[]>([]);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  const currentWord = words[currentIndex];
  
  useEffect(() => {
    if (!currentWord) return;
    
    // Generate 4 choices
    const otherWords = ALL_WORDS.filter(w => w.id !== currentWord.id);
    const randomOthers = otherWords.sort(() => 0.5 - Math.random()).slice(0, 3);
    const allChoices = [...randomOthers, currentWord]
      .sort(() => 0.5 - Math.random())
      .map(w => ({
        id: w.id,
        text: w.meaning,
        isCorrect: w.id === currentWord.id
      }));
    
    setChoices(allChoices);
    setSelectedId(null);
    setTimer(10);
  }, [currentIndex, currentWord]);

  useEffect(() => {
    if (timer > 0 && !selectedId) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    } else if (timer === 0 && !selectedId) {
      setSelectedId('TIMEOUT');
      setTimeout(() => {
        setCurrentIndex(prev => prev < words.length - 1 ? prev + 1 : prev);
        if (currentIndex === words.length - 1) onComplete(masteredIds);
      }, 1500);
    }
  }, [timer, selectedId, currentIndex, words.length, onComplete, masteredIds]);

  const handleSelect = (id: string) => {
    if (selectedId) return;
    setSelectedId(id);

    const isCorrect = choices.find(c => c.id === id)?.isCorrect;
    const newMastered = isCorrect ? [...masteredIds, currentWord.id] : masteredIds;
    setMasteredIds(newMastered);
    
    setTimeout(() => {
      setCurrentIndex(prev => {
        if (prev < words.length - 1) {
          return prev + 1;
        } else {
          onComplete(newMastered);
          return prev;
        }
      });
    }, 1500);
  };

  if (!currentWord) return null;

  return (
    <div className="flex-grow flex flex-col items-center justify-center max-w-[1200px] mx-auto w-full pt-10 pb-12" key={currentIndex}>
      {/* Quiz Progress Overlay */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-[60] bg-surface-container-low overflow-hidden">
        <div className="bg-primary h-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }} />
      </div>

      <header className="fixed top-1.5 left-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 px-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => onComplete(masteredIds)} className="p-2 hover:bg-surface-variant/30 rounded-full transition-colors text-on-surface-variant">
            <X size={20} />
          </button>
          <span className="font-display text-xl font-bold text-primary tracking-tight">THỬ THÁCH HÀNG NGÀY</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-display text-[10px] font-bold text-primary uppercase">Câu hỏi {currentIndex + 1}/{words.length}</span>
          <span className="font-display text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Oxford 3000</span>
        </div>
      </header>

      {/* Timer Circle */}
      <div className="flex flex-col items-center mb-16">
        <div className="relative w-24 h-24 mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-surface-container" />
            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="276" strokeDashoffset={276 - (276 * timer / 10)} strokeLinecap="round" className="text-primary transition-all duration-1000" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-bold text-primary leading-tight">{timer}</span>
            <span className="text-[8px] font-display font-bold text-on-surface-variant tracking-widest uppercase">Giây</span>
          </div>
        </div>
        <button 
          onClick={() => speak(currentWord.word)}
          className="flex items-center gap-2 px-4 py-1.5 bg-surface-container rounded-full border border-outline-variant/30 hover:bg-surface-container-high transition-colors text-primary"
        >
          <Volume2 size={14} />
          <span className="font-display text-[10px] font-bold uppercase tracking-widest">Nghe phát âm</span>
        </button>
      </div>

      {/* Question */}
      <section className="text-center mb-8 md:mb-16 space-y-4 px-4">
        <span className="font-display text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Kiểm tra từ vựng</span>
        <h1 className="font-display text-3xl md:text-6xl font-bold text-on-surface leading-tight">
          Từ <span className="text-primary relative">"{currentWord.word}"<span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/20 blur-sm" /></span> có nghĩa là gì?
        </h1>
        <div className="flex justify-center gap-3">
          <span className="px-4 py-1 rounded-full bg-secondary-container/20 text-secondary text-[10px] font-display font-bold tracking-widest border border-secondary/30 uppercase">{currentWord.type}</span>
          <span className="px-4 py-1 rounded-full bg-primary-container/20 text-primary text-[10px] font-display font-bold tracking-widest border border-primary/30 uppercase tracking-widest">DỄ</span>
        </div>
      </section>



      {/* Options Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {choices.map((choice, index) => {
          const isSelected = selectedId === choice.id;
          const showCorrect = selectedId && choice.isCorrect;
          const showWrong = isSelected && !choice.isCorrect;
          
          return (
            <button 
              key={index}
              onClick={() => handleSelect(choice.id)}
              disabled={!!selectedId}
              className={`group relative flex flex-col items-start p-6 md:p-8 rounded-3xl border-2 transition-all duration-300 glass-panel ${
                showCorrect ? 'bg-tertiary/10 border-tertiary shadow-[0_0_30px_rgba(0,220,229,0.2)]' :
                showWrong ? 'bg-error-container/20 border-error shadow-[0_0_30px_rgba(255,180,171,0.15)]' :
                isSelected ? 'border-primary' :
                'bg-surface-container border-outline-variant/30 hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2 md:mb-4">
                <span className={`w-8 h-8 flex items-center justify-center rounded-full border font-display text-[10px] font-bold ${
                  showCorrect ? 'bg-tertiary border-tertiary text-on-tertiary' :
                  showWrong ? 'bg-error border-error text-on-error' :
                  'border-outline-variant text-on-surface-variant group-hover:border-primary group-hover:text-primary'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                {showCorrect && <CheckCircle2 size={24} className="text-tertiary" />}
                {showWrong && <XCircle size={24} className="text-error" />}
              </div>
              <p className={`font-display text-lg md:text-2xl font-bold text-left ${
                showCorrect ? 'text-tertiary' : showWrong ? 'text-error' : 'text-on-surface'
              }`}>
                {choice.text}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [sessionWords, setSessionWords] = useState<Word[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [wordsOfTheDay, setWordsOfTheDay] = useState<Word[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Load progress and theme
  useEffect(() => {
    const saved = localStorage.getItem('oxford3000_progress');
    if (saved) setProgress(JSON.parse(saved).length);
    
    const savedTheme = localStorage.getItem('oxford3000_theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    } else {
      document.documentElement.className = 'dark';
    }
    
    setWordsOfTheDay(getWordsOfTheDay());
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem('oxford3000_theme', newTheme);
  };

  const updateProgress = (wordIds: string[]) => {
    const saved = localStorage.getItem('oxford3000_progress');
    const currentProgress = saved ? JSON.parse(saved) : [];
    const newProgress = Array.from(new Set([...currentProgress, ...wordIds]));
    localStorage.setItem('oxford3000_progress', JSON.stringify(newProgress));
    setProgress(newProgress.length);
  };

  // Initialize session words when switching views
  useEffect(() => {
    if (view === 'flashcards' || view === 'quiz' || view === 'challenge') {
      setSessionWords(getRandomWords(10));
    }
  }, [view]);

  // Handle back from specialized views
  const handleBack = () => setView('dashboard');
  
  const handleSessionComplete = (masteredIds: string[]) => {
    updateProgress(masteredIds);
    setView('dashboard');
  };

  return (
    <div className={`min-h-screen bg-background text-on-surface font-sans selection:bg-primary/30 overflow-x-hidden ${theme}`}>
      {view === 'dashboard' && <TopNav showBack={view !== 'dashboard'} onBack={handleBack} />}
      {view === 'dashboard' && <Sidebar activeView={view} setView={setView} theme={theme} toggleTheme={toggleTheme} />}
      {view === 'dashboard' && <BottomNav activeView={view} setView={setView} />}
      
      <main className={`transition-all duration-500 ease-in-out ${view === 'dashboard' ? 'lg:pl-64 pt-24 px-4 md:px-12 pb-24 md:pb-12' : 'pt-16 px-4 pb-12'}`}>
        <div className="max-w-[1200px] mx-auto min-h-[calc(100vh-140px)] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex-grow flex flex-col"
            >
              {view === 'dashboard' && <DashboardView setView={setView} progress={progress} wordsOfTheDay={wordsOfTheDay} />}
              {view === 'flashcards' && <FlashcardView words={sessionWords} onComplete={handleSessionComplete} />}
              {view === 'quiz' && <QuizView words={sessionWords} onComplete={handleSessionComplete} />}
              {view === 'challenge' && <ChallengeView words={sessionWords} onComplete={handleSessionComplete} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { 
  Smartphone, 
  Gamepad2, 
  Printer, 
  Menu, 
  Search, 
  Phone, 
  Volume2, 
  ChevronRight, 
  ChevronDown, 
  Check, 
  Sparkles, 
  ArrowLeft, 
  Share2, 
  CheckCircle2, 
  BookOpen, 
  Users, 
  DollarSign, 
  UserCheck, 
  Bell, 
  RotateCcw,
  Trophy,
  Layers,
  Car
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  INITIAL_STUDENTS, 
  INITIAL_STAFF, 
  INITIAL_DIARIES, 
  INITIAL_ANNOUNCEMENTS, 
  WORD_OF_THE_DAY, 
  ALL_PORTALS_LIST 
} from '../data/mockData';
import { Student, StaffMember, DiaryEntry, Announcement, FeeReceipt } from '../types';

interface SimulatorProps {
  initialTab?: 'mschool' | 'mkids' | 'thermal';
  /** Render only the tabs + phone (no section chrome/heading), for use inside the Hero. */
  embedded?: boolean;
  /** Show only this demo and hide the switcher dock (e.g. inside a single product panel). */
  lockedTab?: 'mschool' | 'mkids' | 'thermal';
}

export const InteractiveDeviceSimulator: React.FC<SimulatorProps> = ({ initialTab = 'mschool', embedded = false, lockedTab }) => {
  const [activeTab, setActiveTab] = useState<'mschool' | 'mkids' | 'thermal'>(lockedTab ?? initialTab);

  useEffect(() => {
    setActiveTab(lockedTab ?? initialTab);
  }, [initialTab, lockedTab]);

  // MSCHOOL STATE
  const [currentScreen, setCurrentScreen] = useState<'home' | 'fee' | 'attendance' | 'diary' | 'search' | 'reminder'>('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [topSliderTab, setTopSliderTab] = useState<'words' | 'defaulters' | 'absentees' | 'reminders'>('words');

  // Fee collection state
  const [selectedStudentGr, setSelectedStudentGr] = useState('90');
  const [selectedFeeMonths, setSelectedFeeMonths] = useState<string[]>(['February 2026', 'March 2026', 'April 2026']);
  const [feeConfirmModalOpen, setFeeConfirmModalOpen] = useState(false);
  const [generatedReceipt, setGeneratedReceipt] = useState<FeeReceipt | null>(null);
  const [printOptionModal, setPrintOptionModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quick attendance state
  const [attClass, setAttClass] = useState('Nursery');
  const [attSection, setAttSection] = useState('A');
  const [attDate, setAttDate] = useState('2026-09-27');
  const [attendanceList, setAttendanceList] = useState<{ id: string; name: string; father: string; status: 'PRESENT' | 'LATE' | 'ABSENT' | 'LEAVE' }[]>([
    { id: '103', name: 'Umar Majeed', father: 'Abud Majeed', status: 'PRESENT' },
    { id: '201', name: 'Sammi Khan', father: 'Gul Khan', status: 'LATE' },
    { id: '203', name: 'Bibi Sanjii', father: 'Tajkhan', status: 'ABSENT' },
    { id: '9949', name: 'Essa Mehmood', father: 'Mehmood Khan', status: 'PRESENT' },
    { id: '9951', name: 'Ayan Tariq', father: 'Tariq Mehmood', status: 'LEAVE' },
  ]);
  const [attConfirmModal, setAttConfirmModal] = useState(false);

  // Diary state
  const [diaryClass, setDiaryClass] = useState('Nursery');
  const [diarySection, setDiarySection] = useState('A');
  const [diaryText, setDiaryText] = useState('');
  const [diaryList, setDiaryList] = useState<DiaryEntry[]>(INITIAL_DIARIES);

  // Reminders state
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);

  // MKIDS STATE
  const [mKidsGame, setMKidsGame] = useState<'carRace' | 'tracing' | 'balloons'>('carRace');
  // Math race
  const [raceAnswer, setRaceAnswer] = useState<number | null>(null);
  const [carPosition, setCarPosition] = useState(15);
  // Tracing canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [traceChecked, setTraceChecked] = useState(false);
  // Balloon pop
  const [balloons, setBalloons] = useState<{ id: number; letter: string; popped: boolean }[]>([
    { id: 1, letter: 'M', popped: false },
    { id: 2, letter: 'P', popped: false },
    { id: 3, letter: 'H', popped: false },
    { id: 4, letter: 'X', popped: false },
    { id: 5, letter: 'H', popped: false },
    { id: 6, letter: 'Z', popped: false },
    { id: 7, letter: 'S', popped: false },
    { id: 8, letter: 'B', popped: false },
    { id: 9, letter: 'H', popped: false },
    { id: 10, letter: 'H', popped: false },
    { id: 11, letter: 'K', popped: false },
    { id: 12, letter: 'H', popped: false },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const speakText = (text: string, lang = 'en-US') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Canvas drawing for letter tracing
  useEffect(() => {
    if (activeTab === 'mkids' && mKidsGame === 'tracing' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 12;
        ctx.strokeStyle = '#3b82f6';
      }
    }
  }, [activeTab, mKidsGame]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setTraceChecked(false);
    }
  };

  const checkTracing = () => {
    setTraceChecked(true);
    confetti({ particleCount: 50, spread: 60 });
    speakText('Great job! Letter G is for Goat!', 'en-US');
  };

  // Math car race answer check
  const handleCarAnswer = (val: number) => {
    setRaceAnswer(val);
    if (val === 9) {
      setCarPosition(85);
      confetti({ particleCount: 60, spread: 70 });
      speakText('Correct! Six plus three equals nine!', 'en-US');
    } else {
      speakText('Try again!', 'en-US');
    }
  };

  // Balloon pop
  const handleBalloonClick = (b: { id: number; letter: string; popped: boolean }) => {
    if (b.popped) return;
    if (b.letter === 'H') {
      setBalloons((prev) =>
        prev.map((item) => (item.id === b.id ? { ...item, popped: true } : item))
      );
      speakText('Pop! H!', 'en-US');
    } else {
      speakText('Find letter H!', 'en-US');
    }
  };

  // Fee calculation
  const currentStudent = INITIAL_STUDENTS.find((s) => s.grNo === selectedStudentGr) || INITIAL_STUDENTS[0];
  const totalDueAmount = selectedFeeMonths.length * currentStudent.monthlyFee;

  const handleToggleFeeMonth = (month: string) => {
    if (selectedFeeMonths.includes(month)) {
      setSelectedFeeMonths(selectedFeeMonths.filter((m) => m !== month));
    } else {
      setSelectedFeeMonths([...selectedFeeMonths, month]);
    }
  };

  const handleConfirmFeePayment = () => {
    setFeeConfirmModalOpen(false);
    const slipNumber = Math.floor(Math.random() * 900) + 100;
    const newReceipt: FeeReceipt = {
      slipNo: slipNumber,
      slipDate: new Date().toISOString().split('T')[0],
      studentId: currentStudent.grNo,
      studentName: currentStudent.name,
      fatherName: currentStudent.fatherName,
      class: currentStudent.class,
      section: currentStudent.section,
      monthlyFee: currentStudent.monthlyFee,
      monthsPaid: selectedFeeMonths,
      totalDues: currentStudent.totalDues,
      receivedAmount: totalDueAmount,
      remainingAmount: Math.max(0, currentStudent.totalDues - totalDueAmount),
      familyId: currentStudent.familyId,
      timestamp: Date.now(),
    };
    setGeneratedReceipt(newReceipt);
    showToast('Fee paid successfully! Receipt ready.');
  };

  // Attendance status cycler
  const cycleAttendanceStatus = (id: string) => {
    const statuses: ('PRESENT' | 'LATE' | 'ABSENT' | 'LEAVE')[] = ['PRESENT', 'LATE', 'ABSENT', 'LEAVE'];
    setAttendanceList((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextIdx = (statuses.indexOf(s.status) + 1) % statuses.length;
          return { ...s, status: statuses[nextIdx] };
        }
        return s;
      })
    );
  };

  const Wrapper = embedded ? 'div' : 'section';

  const attSummary = {
    total: attendanceList.length,
    present: attendanceList.filter((a) => a.status === 'PRESENT').length,
    late: attendanceList.filter((a) => a.status === 'LATE').length,
    absent: attendanceList.filter((a) => a.status === 'ABSENT').length,
    leave: attendanceList.filter((a) => a.status === 'LEAVE').length,
  };

  return (
    <Wrapper {...(embedded ? {} : { id: 'interactive-demo' })} className={embedded ? 'text-[#202124] relative' : 'py-14 sm:py-18 bg-white text-[#202124] relative border-b border-[#dadce0]'}>
      <div id={embedded ? undefined : 'simulator'} className={embedded ? '' : 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'}>
        
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto ${embedded ? 'hidden' : 'mb-10'}`}>
          {!embedded && (<>
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-1.5 block">
            Interactive Product Proof
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-2.5">
            See how everyday school tasks become faster and simpler.
          </h2>
          <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
            Test real operational workflows directly in your browser. Collect fees with instant 58mm thermal receipts, sweep attendance in 15 seconds, and explore our learning games.
          </p>
          </>)}

          {/* Mode Switcher Tabs (Google Style Segmented Pill) */}
          <div className={`${embedded ? '' : 'mt-6'} inline-flex p-1 rounded-full bg-[#f1f3f4] border border-[#dadce0] shadow-xs max-w-md w-full justify-between`}>
            <button
              onClick={() => setActiveTab('mschool')}
              className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'mschool'
                  ? 'bg-[#1a73e8] text-white shadow-xs'
                  : 'text-[#5f6368] hover:text-[#202124]'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>MSchool OS</span>
            </button>
            <button
              onClick={() => setActiveTab('mkids')}
              className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'mkids'
                  ? 'bg-[#f29900] text-white shadow-xs'
                  : 'text-[#5f6368] hover:text-[#202124]'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>mKids Games</span>
            </button>
            <button
              onClick={() => setActiveTab('thermal')}
              className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'thermal'
                  ? 'bg-[#1e8e3e] text-white shadow-xs'
                  : 'text-[#5f6368] hover:text-[#202124]'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>Thermal Slip</span>
            </button>
          </div>
        </div>

        {/* Device Canvas Frame */}
        <div className={embedded ? 'relative isolate flex flex-col xl:flex-row justify-center items-center xl:items-center gap-5 xl:gap-6' : 'flex justify-center items-center'}>
          {embedded && (
            <>
              {/* Soft colour glow behind the device */}
              <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-[70%] w-[80%] -z-10 rounded-full bg-gradient-to-tr from-[#1a73e8]/25 via-[#f29900]/15 to-[#1e8e3e]/25 blur-3xl" />

              {/* Mode switcher: small icon dock (vertical on wide screens, a row above the phone otherwise) */}
              {!lockedTab && (
              <div
                role="tablist"
                aria-label="Product demos"
                className="flex xl:flex-col items-center gap-1.5 p-1.5 rounded-2xl bg-white/90 backdrop-blur border border-[#dadce0] shadow-lg"
              >
                {([
                  { id: 'mschool', label: 'MSchool OS', Icon: Smartphone, color: '#1a73e8' },
                  { id: 'mkids', label: 'mKids Games', Icon: Gamepad2, color: '#f29900' },
                  { id: 'thermal', label: 'Thermal Slip', Icon: Printer, color: '#1e8e3e' },
                ] as const).map(({ id, label, Icon, color }) => {
                  const active = activeTab === id;
                  return (
                    <motion.button
                      key={id}
                      role="tab"
                      aria-selected={active}
                      aria-label={label}
                      title={label}
                      onClick={() => setActiveTab(id)}
                      whileTap={{ scale: 0.88 }}
                      whileHover={{ y: -1 }}
                      className={`group relative h-10 xl:w-10 px-3 xl:px-0 rounded-xl inline-flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                        active ? 'text-white' : 'text-[#5f6368] hover:text-[#202124]'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="demo-tab-pill"
                          className="absolute inset-0 rounded-xl"
                          style={{ backgroundColor: color, boxShadow: `0 8px 18px -6px ${color}aa` }}
                          transition={{ type: 'spring', stiffness: 500, damping: 34 }}
                        />
                      )}
                      <motion.span
                        key={active ? 'on' : 'off'}
                        initial={active ? { scale: 0.6, rotate: -12 } : false}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                        className="relative z-10 inline-flex"
                      >
                        <Icon className="w-[18px] h-[18px]" />
                      </motion.span>
                      <span className="relative z-10 xl:hidden">{label}</span>

                      {/* Hover label (wide screens, where the dock is icon-only) */}
                      <span className="hidden xl:block pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#202124] px-2.5 py-1 text-[11px] font-medium text-white opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150">
                        {label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
              )}
            </>
          )}
          <div className={embedded
            ? 'w-full max-w-[330px] sm:max-w-[340px] bg-[#111214] rounded-[42px] p-2.5 border-[3px] border-[#3c4043] ring-1 ring-black/10 shadow-[0_30px_60px_-20px_rgba(32,33,36,0.45)] relative'
            : 'w-full max-w-[380px] sm:max-w-[410px] bg-[#202124] rounded-[44px] p-3 shadow-2xl border-4 border-[#dadce0] relative'}>
            
            {/* Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#111214] rounded-b-xl flex items-center justify-center z-30">
              <div className="w-10 h-1 bg-slate-700 rounded-full" />
            </div>

            {/* Screen Viewport */}
            <div className="keep-theme relative bg-slate-100 text-slate-900 rounded-[30px] overflow-hidden h-[clamp(460px,calc(100svh-170px),640px)] flex flex-col font-sans select-none border border-slate-200 shadow-inner">
              
              {/* Status Bar */}
              <div className="bg-slate-900 text-slate-300 px-5 pt-2 pb-1 flex items-center justify-between text-[11px] font-mono shrink-0">
                <span className="font-bold text-white">4:20 PM</span>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-[10px]">4G</span>
                  <div className="w-4 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center">
                    <div className="w-full h-full bg-emerald-400 rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* Toast Notification */}
              {toastMessage && (
                <div className="absolute top-10 left-3 right-3 z-50 bg-slate-900/95 text-white px-3 py-2 rounded-xl text-xs flex items-center gap-2 shadow-xl border border-blue-500/40 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-medium leading-tight">{toastMessage}</span>
                </div>
              )}

              {/* ================= TAB 1: MSCHOOL ADMIN APP ================= */}
              {activeTab === 'mschool' && (
                <div className="flex-1 flex flex-col overflow-hidden relative bg-slate-50">
                  {/* Top Bar */}
                  <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-slate-200 shrink-0 shadow-2xs">
                    <div className="flex items-center gap-2.5">
                      {currentScreen === 'home' ? (
                        <button 
                          onClick={() => setDrawerOpen(true)}
                          className="p-1 rounded-md text-slate-700 hover:bg-slate-100 cursor-pointer"
                        >
                          <Menu className="w-5 h-5 text-sky-700" />
                        </button>
                      ) : (
                        <button 
                          onClick={() => setCurrentScreen('home')}
                          className="p-1 rounded-md text-slate-700 hover:bg-slate-100 cursor-pointer flex items-center gap-1 text-xs font-bold text-sky-700"
                        >
                          <ArrowLeft className="w-4 h-4 text-sky-700" />
                          <span>Home</span>
                        </button>
                      )}
                      <div>
                        <div className="text-xs font-bold text-sky-900 leading-tight">MSchool Academy</div>
                        <div className="text-[10px] text-slate-500 font-medium">Campus ID: #9991</div>
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white text-[10px] font-black">
                      MS
                    </div>
                  </div>

                  {/* SCREEN 1: HOME */}
                  {currentScreen === 'home' && (
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-8">
                      {/* Top Horizontal Navigation */}
                      <div className="flex items-center gap-0.5 border-b border-slate-200 pb-1 text-xs font-bold text-slate-500 overflow-x-auto no-scrollbar">
                        <button
                          onClick={() => setTopSliderTab('words')}
                          className={`whitespace-nowrap px-1.5 py-1 rounded-md text-[11px] transition-colors ${
                            topSliderTab === 'words' ? 'text-sky-800 bg-sky-50 font-black border-b-2 border-sky-600' : 'hover:text-slate-800'
                          }`}
                        >
                          Word of the Day
                        </button>
                        <button
                          onClick={() => setTopSliderTab('defaulters')}
                          className={`whitespace-nowrap px-1.5 py-1 rounded-md text-[11px] transition-colors ${
                            topSliderTab === 'defaulters' ? 'text-sky-800 bg-sky-50 font-black border-b-2 border-sky-600' : 'hover:text-slate-800'
                          }`}
                        >
                          Top Defaulters
                        </button>
                        <button
                          onClick={() => setTopSliderTab('absentees')}
                          className={`whitespace-nowrap px-1.5 py-1 rounded-md text-[11px] transition-colors ${
                            topSliderTab === 'absentees' ? 'text-sky-800 bg-sky-50 font-black border-b-2 border-sky-600' : 'hover:text-slate-800'
                          }`}
                        >
                          Top Absentees
                        </button>
                      </div>

                      {/* Card Content based on Slider */}
                      {topSliderTab === 'words' && (
                        <div className="p-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 shadow-xs border border-amber-300">
                          <div className="text-[10px] font-extrabold text-amber-900 uppercase tracking-wider mb-0.5">
                            Daily Engagement Card
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-lg font-black text-slate-950 flex items-center gap-1.5">
                                {WORD_OF_THE_DAY.word}
                                <span className="text-xs font-normal text-amber-900 font-serif">
                                  ({WORD_OF_THE_DAY.urdu})
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-800 font-medium">
                                Meaning: {WORD_OF_THE_DAY.meaning}
                              </p>
                            </div>
                            <button
                              onClick={() => speakText(`${WORD_OF_THE_DAY.word}. Meaning: ${WORD_OF_THE_DAY.meaning}`)}
                              className="w-8 h-8 rounded-full bg-white/90 text-amber-900 flex items-center justify-center shadow hover:bg-white active:scale-95 cursor-pointer"
                              title="Listen"
                            >
                              <Volume2 className="w-4 h-4 text-amber-900" />
                            </button>
                          </div>
                        </div>
                      )}

                      {topSliderTab === 'defaulters' && (
                        <div className="space-y-1.5">
                          <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between text-xs">
                            <div>
                              <div className="font-bold text-slate-900">90 - Muhammad Ahmed</div>
                              <div className="text-[10px] text-slate-600">Muhammad Kashif • Five-A</div>
                            </div>
                            <div className="text-right flex items-center gap-2">
                              <span className="font-black text-red-600 text-xs">Rs 18,000</span>
                              <button 
                                onClick={() => showToast('Opening WhatsApp reminder for Muhammad Kashif...')}
                                className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center"
                              >
                                <Phone className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {topSliderTab === 'absentees' && (
                        <div className="p-2 rounded-lg bg-red-50 border border-red-200 flex items-center justify-between text-xs">
                          <div>
                            <div className="font-bold text-slate-900">120 - Arham Sultan</div>
                            <div className="text-[10px] text-slate-600">KG-1 • Absent 215+ Days</div>
                          </div>
                          <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                            Critical Alert
                          </span>
                        </div>
                      )}

                      {/* Today's Actions (8 Icon Grid) */}
                      <div>
                        <div className="text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                          Today&apos;s Actions
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <button
                            onClick={() => setCurrentScreen('diary')}
                            className="p-2 rounded-xl bg-white border border-slate-200 hover:border-sky-400 flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs"
                          >
                            <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center mb-1">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-700">Add Diary</span>
                          </button>

                          <button
                            onClick={() => setCurrentScreen('attendance')}
                            className="p-2 rounded-xl bg-white border border-slate-200 hover:border-amber-400 flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs"
                          >
                            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-1">
                              <UserCheck className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-700">Attendance</span>
                          </button>

                          <button
                            onClick={() => setCurrentScreen('search')}
                            className="p-2 rounded-xl bg-white border border-slate-200 hover:border-red-400 flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs"
                          >
                            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center mb-1">
                              <Search className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-700">Search</span>
                          </button>

                          <button
                            onClick={() => showToast('Staff Attendance: 4 of 4 Staff logged.')}
                            className="p-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs"
                          >
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1">
                              <Users className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-700">Staff</span>
                          </button>

                          <button
                            onClick={() => setCurrentScreen('fee')}
                            className="p-2 rounded-xl bg-white border border-slate-200 hover:border-amber-400 flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs"
                          >
                            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-1">
                              <DollarSign className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-700">Submit Fee</span>
                          </button>

                          <button
                            onClick={() => setCurrentScreen('attendance')}
                            className="p-2 rounded-xl bg-white border border-slate-200 hover:border-teal-400 flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs"
                          >
                            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mb-1">
                              <UserCheck className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-700">View Roster</span>
                          </button>

                          <button
                            onClick={() => showToast('Exam Result Cards generated.')}
                            className="p-2 rounded-xl bg-white border border-slate-200 hover:border-sky-400 flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs"
                          >
                            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center mb-1">
                              <Bell className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-700">Exam Cards</span>
                          </button>

                          <button
                            onClick={() => showToast('Time table load balanced.')}
                            className="p-2 rounded-xl bg-white border border-slate-200 hover:border-fuchsia-400 flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs"
                          >
                            <div className="w-8 h-8 rounded-lg bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center mb-1">
                              <Layers className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-700">Timetable</span>
                          </button>
                        </div>
                      </div>

                      {/* Today at a Glance */}
                      <div>
                        <div className="text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                          Today at a Glance
                        </div>
                        <div className="space-y-1.5">
                          <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                            <div>
                              <div className="font-bold text-slate-800">Student Attendance</div>
                              <div className="text-[10px] text-slate-500">Total: 68 • Present: 62 • Absent: 6</div>
                            </div>
                            <button
                              onClick={() => setCurrentScreen('attendance')}
                              className="w-6 h-6 rounded-md bg-sky-600 text-white flex items-center justify-center hover:bg-sky-700 cursor-pointer"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                            <div>
                              <div className="font-bold text-slate-800">Staff Attendance</div>
                              <div className="text-[10px] text-slate-500">Total Staff: 4 • Present: 3 • Late: 1</div>
                            </div>
                            <button
                              onClick={() => showToast('Staff roster confirmed')}
                              className="w-6 h-6 rounded-md bg-sky-600 text-white flex items-center justify-center hover:bg-sky-700 cursor-pointer"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 2: SUBMIT FEE */}
                  {currentScreen === 'fee' && (
                    <div className="flex-1 overflow-y-auto p-3 space-y-2.5 pb-6">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                        <span className="text-xs font-black text-slate-800">Submit Fee</span>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          Atomic Protected
                        </span>
                      </div>

                      {/* Search Student Input */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Student Gr No</label>
                          <input
                            type="text"
                            value={selectedStudentGr}
                            onChange={(e) => setSelectedStudentGr(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                          />
                        </div>
                        <button
                          onClick={() => showToast(`Loaded Gr #${selectedStudentGr}`)}
                          className="mt-3.5 px-3 py-1.5 bg-sky-600 text-white rounded-lg text-xs font-bold hover:bg-sky-700 cursor-pointer"
                        >
                          Search
                        </button>
                      </div>

                      {/* Fee Months */}
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                          <span className="font-bold text-slate-800">Pending Months</span>
                          <span className="text-[10px] text-slate-500">{currentStudent.name} (Gr {currentStudent.grNo})</span>
                        </div>

                        <div className="space-y-1 max-h-36 overflow-y-auto">
                          {currentStudent.unpaidMonths.slice(0, 3).map((m) => (
                            <div
                              key={m}
                              onClick={() => handleToggleFeeMonth(m)}
                              className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100"
                            >
                              <div>
                                <div className="font-bold text-slate-800 text-[11px]">{m}</div>
                                <div className="text-[10px] text-slate-500">Monthly Tuition</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-black text-slate-900">Rs {currentStudent.monthlyFee}</span>
                                <input
                                  type="checkbox"
                                  checked={selectedFeeMonths.includes(m)}
                                  readOnly
                                  className="rounded text-sky-600 cursor-pointer"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-slate-200 pt-1.5 space-y-0.5 text-xs">
                          <div className="flex justify-between text-red-600 font-bold">
                            <span>Total Dues:</span>
                            <span>Rs {currentStudent.totalDues}</span>
                          </div>
                          <div className="flex justify-between text-sky-700 font-black">
                            <span>Paying Now:</span>
                            <span>Rs {totalDueAmount}</span>
                          </div>
                        </div>

                        <button
                          disabled={totalDueAmount === 0}
                          onClick={() => setFeeConfirmModalOpen(true)}
                          className="w-full py-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs cursor-pointer shadow-sm"
                        >
                          SUBMIT FEE & PRINT SLIP
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 3: QUICK ATTENDANCE */}
                  {currentScreen === 'attendance' && (
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 pb-6">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                        <span className="text-xs font-black text-slate-800">Quick Attendance Sweep</span>
                        <span className="text-[10px] text-slate-500">Tap cards to toggle</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Class</label>
                          <select
                            value={attClass}
                            onChange={(e) => setAttClass(e.target.value)}
                            className="w-full p-1 bg-white border border-slate-300 rounded-lg font-bold text-xs"
                          >
                            <option value="Nursery">Nursery</option>
                            <option value="KG-1">KG-1</option>
                            <option value="KG-2">KG-2</option>
                            <option value="Five">Five</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Section</label>
                          <select
                            value={attSection}
                            onChange={(e) => setAttSection(e.target.value)}
                            className="w-full p-1 bg-white border border-slate-300 rounded-lg font-bold text-xs"
                          >
                            <option value="A">Section A</option>
                            <option value="B">Section B</option>
                          </select>
                        </div>
                      </div>

                      {/* Attendance Grid */}
                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        {attendanceList.map((stu) => {
                          const statusBg =
                            stu.status === 'PRESENT'
                              ? 'bg-emerald-500 text-white'
                              : stu.status === 'LATE'
                              ? 'bg-amber-400 text-slate-950 font-black'
                              : stu.status === 'ABSENT'
                              ? 'bg-red-500 text-white'
                              : 'bg-sky-500 text-white';

                          return (
                            <div
                              key={stu.id}
                              onClick={() => cycleAttendanceStatus(stu.id)}
                              className={`p-2 rounded-xl border text-center cursor-pointer transition-transform active:scale-95 shadow-2xs ${statusBg}`}
                            >
                              <div className="text-[10px] font-bold opacity-80">#{stu.id}</div>
                              <div className="text-xs font-black truncate">{stu.name}</div>
                              <div className="text-[9px] uppercase font-bold mt-1 tracking-wider">
                                {stu.status}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Summary Tally */}
                      <div className="bg-white p-2 rounded-xl border border-slate-200 text-center text-xs font-bold text-slate-700 flex justify-around">
                        <span>Total: {attSummary.total}</span>
                        <span className="text-emerald-600">P: {attSummary.present}</span>
                        <span className="text-amber-600">L: {attSummary.late}</span>
                        <span className="text-red-600">A: {attSummary.absent}</span>
                      </div>

                      <button
                        onClick={() => {
                          setAttConfirmModal(true);
                          confetti({ particleCount: 30, spread: 50 });
                        }}
                        className="w-full py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs cursor-pointer shadow-sm"
                      >
                        CONFIRM ATTENDANCE
                      </button>
                    </div>
                  )}

                  {/* SCREEN 4: DIARY */}
                  {currentScreen === 'diary' && (
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 pb-6">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                        <span className="text-xs font-black text-slate-800">Parent Homework Diary</span>
                        <span className="text-[10px] text-slate-500">Nursery (A)</span>
                      </div>

                      <div className="space-y-2">
                        {diaryList.map((d) => (
                          <div key={d.id} className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs">
                            <div className="flex justify-between items-center text-[10px] text-sky-700 font-bold mb-1">
                              <span>{d.subject} • {d.class}({d.section})</span>
                              <span className="text-slate-400">{d.date}</span>
                            </div>
                            <p className="text-slate-700 text-xs leading-normal">{d.content}</p>
                          </div>
                        ))}
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs space-y-2">
                        <div className="font-bold text-slate-800 text-[11px]">Post New Class Diary</div>
                        <textarea
                          rows={2}
                          value={diaryText}
                          onChange={(e) => setDiaryText(e.target.value)}
                          placeholder="Type homework or notes..."
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                        <button
                          onClick={() => {
                            if (!diaryText.trim()) return;
                            const newD: DiaryEntry = {
                              id: `d-${Date.now()}`,
                              class: diaryClass,
                              section: diarySection,
                              date: 'Today',
                              subject: 'Daily Assignment',
                              content: diaryText,
                            };
                            setDiaryList([newD, ...diaryList]);
                            setDiaryText('');
                            showToast('Diary published to Parent App!');
                          }}
                          className="w-full py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg text-xs cursor-pointer"
                        >
                          POST TO PARENTS
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 5: SEARCH */}
                  {currentScreen === 'search' && (
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 pb-6">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                        <span className="text-xs font-black text-slate-800">Instant Student Search</span>
                        <span className="text-[10px] text-emerald-600 font-bold">&lt; 2ms latency</span>
                      </div>

                      <div className="space-y-1.5">
                        {INITIAL_STUDENTS.slice(0, 4).map((s) => (
                          <div key={s.id} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs shadow-2xs">
                            <div>
                              <div className="font-bold text-slate-900">{s.name} (Gr #{s.grNo})</div>
                              <div className="text-[10px] text-slate-500">{s.fatherName} • {s.class}-{s.section}</div>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedStudentGr(s.grNo);
                                setCurrentScreen('fee');
                              }}
                              className="px-2 py-1 bg-sky-50 text-sky-700 font-bold rounded-md text-[10px] border border-sky-200 hover:bg-sky-100"
                            >
                              Collect Fee
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Drawer Menu Overlay (12 Portals) */}
                  {drawerOpen && (
                    <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-xs flex">
                      <div className="w-64 bg-white h-full shadow-2xl flex flex-col p-3 overflow-y-auto text-xs animate-in slide-in-from-left">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                          <span className="font-black text-sky-900 text-sm">Browse Portals</span>
                          <button onClick={() => setDrawerOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                            ✕
                          </button>
                        </div>
                        <div className="space-y-1">
                          {ALL_PORTALS_LIST.map((p) => (
                            <div
                              key={p.name}
                              onClick={() => {
                                setDrawerOpen(false);
                                if (p.name.includes('Fee')) setCurrentScreen('fee');
                                else if (p.name.includes('Attendance')) setCurrentScreen('attendance');
                                else if (p.name.includes('Student')) setCurrentScreen('search');
                                else showToast(`Switched to ${p.name}`);
                              }}
                              className="p-2 rounded-lg hover:bg-sky-50 text-slate-700 font-bold flex items-center justify-between cursor-pointer"
                            >
                              <span>{p.name}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1" onClick={() => setDrawerOpen(false)} />
                    </div>
                  )}

                  {/* Confirmation Modal */}
                  {feeConfirmModalOpen && (
                    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                      <div className="bg-white rounded-2xl p-4 w-full max-w-xs text-center space-y-3 shadow-2xl animate-in zoom-in-95">
                        <h4 className="font-black text-slate-900 text-sm">Confirm Payment</h4>
                        <p className="text-xs text-slate-600">
                          You are about to collect <strong>Rs. {totalDueAmount}</strong> for <strong>{currentStudent.name}</strong>.
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setFeeConfirmModalOpen(false)}
                            className="flex-1 py-1.5 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleConfirmFeePayment}
                            className="flex-1 py-1.5 bg-sky-600 text-white font-bold rounded-lg text-xs"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Generated Slip Modal */}
                  {generatedReceipt && (
                    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
                      <div className="bg-white rounded-2xl p-3.5 w-full max-w-xs shadow-2xl space-y-2 text-xs animate-in zoom-in-95">
                        <div className="flex justify-between items-center border-b border-slate-200 pb-1">
                          <span className="font-black text-slate-900">Digital Fee Slip #{generatedReceipt.slipNo}</span>
                          <button onClick={() => setGeneratedReceipt(null)} className="text-slate-400 hover:text-slate-700">✕</button>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1 text-[11px]">
                          <div className="flex justify-between font-bold text-slate-800">
                            <span>Student:</span>
                            <span>{generatedReceipt.studentName}</span>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>Class:</span>
                            <span>{generatedReceipt.class} ({generatedReceipt.section})</span>
                          </div>
                          <div className="flex justify-between text-emerald-600 font-bold">
                            <span>Paid Amount:</span>
                            <span>Rs. {generatedReceipt.receivedAmount}</span>
                          </div>
                          <div className="flex justify-between text-slate-500">
                            <span>Remaining Dues:</span>
                            <span>Rs. {generatedReceipt.remainingAmount}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          <button
                            onClick={() => {
                              setActiveTab('thermal');
                              setGeneratedReceipt(null);
                            }}
                            className="py-1.5 bg-slate-900 text-white font-bold rounded-lg text-[10px] flex items-center justify-center gap-1"
                          >
                            <Printer className="w-3 h-3" /> 58mm Thermal
                          </button>
                          <button
                            onClick={() => {
                              showToast('Receipt sent to parent WhatsApp!');
                              setGeneratedReceipt(null);
                            }}
                            className="py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-[10px] flex items-center justify-center gap-1"
                          >
                            <Share2 className="w-3 h-3" /> WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Attendance Saved Dialog */}
                  {attConfirmModal && (
                    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                      <div className="bg-white rounded-2xl p-4 w-full max-w-xs text-center space-y-2 shadow-2xl animate-in zoom-in-95">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                          <Check className="w-5 h-5" />
                        </div>
                        <h4 className="font-black text-slate-900 text-sm">Attendance Submitted!</h4>
                        <p className="text-xs text-slate-600">
                          {attSummary.present} Present, {attSummary.absent} Absent. SMS notifications dispatched.
                        </p>
                        <button
                          onClick={() => setAttConfirmModal(false)}
                          className="w-full py-1.5 bg-sky-600 text-white font-bold rounded-lg text-xs"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* ================= TAB 2: MKIDS GAMIFIED LEARNING ================= */}
              {activeTab === 'mkids' && (
                <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-200 relative select-none">
                  {/* Top Game Bar */}
                  <div className="bg-white/90 backdrop-blur-md px-3 py-2 flex items-center justify-between border-b border-amber-300 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs">
                        mK
                      </div>
                      <span className="text-xs font-black text-amber-900">mKids Adventure</span>
                    </div>

                    {/* Game Selector */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setMKidsGame('carRace')}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          mKidsGame === 'carRace' ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        Math Race
                      </button>
                      <button
                        onClick={() => setMKidsGame('tracing')}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          mKidsGame === 'tracing' ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        Letter Trace
                      </button>
                      <button
                        onClick={() => setMKidsGame('balloons')}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          mKidsGame === 'balloons' ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        Balloons
                      </button>
                    </div>
                  </div>

                  {/* GAME 1: MATH CAR RACE */}
                  {mKidsGame === 'carRace' && (
                    <div className="flex-1 flex flex-col justify-between p-3 relative overflow-hidden">
                      {/* Race Track Header */}
                      <div className="bg-white/90 p-2.5 rounded-2xl text-center shadow-md border border-amber-300">
                        <div className="text-[10px] uppercase font-black text-amber-800 tracking-wider">
                          Nursery Math Question
                        </div>
                        <div className="text-2xl font-black text-slate-900 font-mono">
                          6 + 3 = ?
                        </div>
                      </div>

                      {/* Race Tracks with Animated Cars */}
                      <div className="relative h-44 bg-slate-800/80 rounded-2xl p-2 border-2 border-amber-400 overflow-hidden space-y-3 flex flex-col justify-center">
                        <div className="absolute right-4 top-0 bottom-0 w-2 border-r-2 border-dashed border-white/50" />
                        
                        {/* Track 1: Opponent */}
                        <div className="relative h-8 bg-slate-900/50 rounded-lg flex items-center px-1">
                          <div className="w-8 h-6 bg-rose-500 rounded flex items-center justify-center text-[10px] text-white font-bold ml-12">
                            🚗
                          </div>
                        </div>

                        {/* Track 2: Opponent */}
                        <div className="relative h-8 bg-slate-900/50 rounded-lg flex items-center px-1">
                          <div className="w-8 h-6 bg-teal-500 rounded flex items-center justify-center text-[10px] text-white font-bold ml-24">
                            🚙
                          </div>
                        </div>

                        {/* Track 3: Player Car (Moves based on state) */}
                        <div className="relative h-8 bg-amber-500/20 rounded-lg flex items-center px-1 border border-amber-400/40">
                          <motion.div 
                            animate={{ left: `${carPosition}%` }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            className="absolute w-9 h-7 bg-amber-400 rounded-md flex items-center justify-center text-xs shadow-md border border-amber-200"
                          >
                            🏎️
                          </motion.div>
                        </div>
                      </div>

                      {/* Answer Choices */}
                      <div className="space-y-1.5">
                        <div className="text-[10px] text-center font-bold text-slate-800">
                          Tap the correct number:
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {[11, 9, 7].map((num) => (
                            <button
                              key={num}
                              onClick={() => handleCarAnswer(num)}
                              className={`py-3 rounded-xl font-black text-lg shadow-md transition-transform active:scale-90 cursor-pointer ${
                                raceAnswer === num && num === 9
                                  ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                                  : 'bg-white hover:bg-amber-100 text-slate-900'
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* GAME 2: LETTER TRACING */}
                  {mKidsGame === 'tracing' && (
                    <div className="flex-1 flex flex-col justify-between p-3">
                      <div className="bg-white/90 p-2 rounded-xl text-center shadow-xs">
                        <span className="text-xs font-black text-slate-800">
                          Write the beginning letter &apos;g&apos; for Goat (بکری)!
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 my-auto">
                        <div className="bg-white p-3 rounded-2xl flex flex-col items-center justify-center shadow-md">
                          <span className="text-4xl mb-1">🐐</span>
                          <span className="text-xs font-black text-slate-700">Goat / بکری</span>
                        </div>

                        {/* Interactive Drawing Canvas */}
                        <div className="bg-white rounded-2xl p-1 relative flex items-center justify-center shadow-md border border-blue-200">
                          <canvas
                            ref={canvasRef}
                            width={140}
                            height={140}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                            className="bg-slate-50 rounded-xl cursor-crosshair touch-none"
                          />
                          {!isDrawing && !traceChecked && (
                            <div className="absolute pointer-events-none text-4xl text-slate-300 font-serif opacity-30">
                              g
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={clearCanvas}
                          className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                        >
                          CLEAR
                        </button>
                        <button
                          onClick={checkTracing}
                          className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl text-xs shadow cursor-pointer"
                        >
                          CHECK ✓
                        </button>
                      </div>
                    </div>
                  )}

                  {/* GAME 3: BALLOON POPPING */}
                  {mKidsGame === 'balloons' && (
                    <div className="flex-1 flex flex-col justify-between p-3">
                      <div className="bg-white/90 p-2 rounded-xl text-center shadow-xs">
                        <span className="text-xs font-black text-slate-800">
                          Find and pop the balloons with the letter &apos;H&apos;!
                        </span>
                      </div>

                      {/* Balloon Grid */}
                      <div className="grid grid-cols-4 gap-2 my-auto">
                        {balloons.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => handleBalloonClick(b)}
                            disabled={b.popped}
                            className={`h-11 rounded-2xl font-black text-sm transition-transform active:scale-75 shadow-xs flex items-center justify-center cursor-pointer ${
                              b.popped
                                ? 'opacity-20 scale-75 bg-slate-400'
                                : b.letter === 'H'
                                ? 'bg-amber-400 hover:bg-amber-300 text-slate-900 border border-amber-300'
                                : 'bg-white hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            {b.popped ? '💥' : b.letter}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setBalloons(balloons.map((b) => ({ ...b, popped: false })));
                        }}
                        className="py-2 bg-white text-slate-800 font-bold rounded-xl text-xs shadow-xs"
                      >
                        Reset Balloons
                      </button>
                    </div>
                  )}

                </div>
              )}

              {/* ================= TAB 3: 58MM THERMAL RECEIPT ================= */}
              {activeTab === 'thermal' && (
                <div className="flex-1 bg-slate-200 p-3 overflow-y-auto flex flex-col items-center justify-between">
                  <div className="w-full max-w-[280px] bg-white rounded-lg p-3 shadow-lg border border-slate-300 text-slate-900 font-receipt text-[11px] leading-tight space-y-2">
                    {/* Header */}
                    <div className="text-center border-b border-dashed border-slate-400 pb-2">
                      <div className="font-bold text-xs uppercase tracking-wider">MSCHOOL ACADEMY</div>
                      <div className="text-[10px]">MAIN CAMPUS • PAKISTAN</div>
                      <div className="text-[9px] text-slate-500">TEL: 0304-2130798</div>
                      <div className="font-bold mt-1 text-[10px]">OFFICIAL FEE RECEIPT</div>
                    </div>

                    {/* Receipt Body */}
                    <div className="space-y-1 text-[10px]">
                      <div className="flex justify-between">
                        <span>Slip #: 00{generatedReceipt?.slipNo || 412}</span>
                        <span>Date: 2026-09-27</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GR No: 90</span>
                        <span>Class: Five (A)</span>
                      </div>
                      <div>Student: Muhammad Ahmed</div>
                      <div>Father: Muhammad Kashif</div>
                      <div className="border-t border-dashed border-slate-300 my-1" />
                      <div className="flex justify-between">
                        <span>Tuition Fee (Feb-Apr):</span>
                        <span>Rs. 6,000</span>
                      </div>
                      <div className="flex justify-between font-bold border-t border-slate-300 pt-1">
                        <span>AMOUNT RECEIVED:</span>
                        <span>Rs. 6,000</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Balance Remaining:</span>
                        <span>Rs. 12,000</span>
                      </div>
                    </div>

                    {/* Barcode & Footer */}
                    <div className="text-center pt-2 border-t border-dashed border-slate-400 space-y-1">
                      <div className="text-xs font-mono tracking-widest font-black">||| | |||| | ||| ||||</div>
                      <div className="text-[9px] text-slate-500 font-sans">
                        Generated by MSchool Engine
                      </div>
                    </div>
                  </div>

                  <div className="w-full max-w-[280px] space-y-1.5 pt-2">
                    <button
                      onClick={() => showToast('Printing ESC/POS 58mm thermal receipt...')}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow"
                    >
                      <Printer className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Print 58mm Paper Slip</span>
                    </button>
                    <button
                      onClick={() => showToast('WhatsApp receipt link generated and sent!')}
                      className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </Wrapper>
  );
};

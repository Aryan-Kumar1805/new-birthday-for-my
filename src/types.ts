export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location: string;
  story: string;
  photoUrl?: string;
  tag: string;
  caption: string;
}

export interface LoveLetter {
  id: string;
  sealColor: string;
  openWhen: string;
  subtitle: string;
  datePenciled: string;
  salutation: string;
  body: string[];
  signature: string;
}

export interface ScratchVoucher {
  id: string;
  title: string;
  category: string;
  reward: string;
  iconName: string;
  isRedeemed: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface BirthdayConfig {
  girlfriendName: string;
  boyfriendName: string;
  nickname: string;
  birthdayDate: string; // YYYY-MM-DD
  anniversaryDate: string; // YYYY-MM-DD
  ageMilestone: number;
  heroHeadline: string;
  heroSubtitle: string;
  loveReasons: string[];
  memories: MemoryItem[];
  letters: LoveLetter[];
  vouchers: ScratchVoucher[];
  quizQuestions: QuizQuestion[];
  customWish: string;
  wishesBlownOut: boolean;
}

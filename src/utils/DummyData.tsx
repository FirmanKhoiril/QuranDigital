import { BookOpen, Gamepad2, Lightbulb, Volume2 } from "lucide-react";

export const qaris = [
  { name: "Abdullah Al-Juhany", key: "01" },
  { name: "Abdul Muhsin Al-Qasim", key: "02" },
  { name: "Abdurrahman as-Sudais", key: "03" },
  { name: "Ibrahim Al-Dossari", key: "04" },
  { name: "Misyari Rasyid Al-Afasi", key: "05" },
]

export const features = [
  {
    title: "Baca Al-Quran",
    desc: "Teks Arab, transliterasi, dan terjemahan bahasa Indonesia",
    icon: <BookOpen className="w-8 h-8 text-green-500" />,
  },
  {
    title: "Audio Berkualitas",
    desc: "Mendengarkan dengan audio dari qari terbaik dunia",
    icon: <Volume2 className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Tafsir Lengkap",
    desc: "Memahami makna dengan tafsir yang mudah dipahami",
    icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
  },
  {
    title: "Game Edukatif",
    desc: "Belajar Al-Quran dengan cara yang menyenangkan",
    icon: <Gamepad2 className="w-8 h-8 text-emerald-500" />,
  },
];
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import quranMeta from "./quran-meta.json";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ayahList from "@/app/randomizer/ayahs.json";
import { cn } from "@/lib/utils";

type RandomizationMethod = "surah" | "ayah" | "page" | "juz";

type Ayah = {
  number: number;
  text: String;
  surah: {
    number: number;
    name: String;
    englishName: String;
    englishNameTranslation: String;
    revelationType: String;
    numberOfAyahs: number;
  };
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: false;
};

type QuranMeta = {
  code: number;
  status: string;
  data: {
    ayahs: {
      count: number;
      references: {
        number: number;
        text: string;
        surah: {
          number: number;
          name: string;
          englishName: string;
          englishNameTranslation: string;
          numberOfAyahs: number;
          revelationType: string;
        };
        numberInSurah: number;
        juz: number;
        manzil: number;
        page: number;
        ruku: number;
        hizbQuarter: number;
        sajda: boolean;
        edition: {
          identifier: string;
          language: string;
          name: string;
          englishName: string;
          format: string;
          type: string;
          direction: string;
        }[];
      };
    };
    surahs: {
      count: number;
      references: {
        number: number;
        name: string;
        englishName: string;
        englishNameTranslation: string;
        numberOfAyahs: number;
        revelationType: string;
      }[];
    };
    pages: {
      count: number;
      references: {
        page: number;
        surah: number;
        ayah: number;
      }[];
    };
    juzs: {
      count: number;
      references: {
        juz: number;
        surah: number;
        ayah: number;
      }[];
    };
    hizbQuarters: {
      count: number;
      references: {
        quarter: number;
        surah: number;
        ayah: number;
      }[];
    };
    manzils: {
      count: number;
      references: {
        manzil: number;
        surah: number;
        ayah: number;
      }[];
    };
    rukus: {
      count: number;
      references: {
        ruku: number;
        surah: number;
        ayah: number;
      }[];
    };
    sajdas: {
      count: number;
      references: {
        surah: number;
        ayah: number;
      }[];
    };
  };
};

type Surah = QuranMeta["data"]["surahs"]["references"][0];

const ayahs = ayahList as Ayah[];
const surahs: Surah[] = quranMeta.data.surahs.references;
const ayahCount = quranMeta.data.ayahs.count;
const pageCount = quranMeta.data.pages.count;
const pages = quranMeta.data.pages.references;
const juzCount = quranMeta.data.juzs.count;
const juzs = quranMeta.data.juzs.references;

export default function EnhancedQuranApp() {
  const [selectedJuzs, setSelectedJuzs] = useState<number[]>([]);
  const [juzSurahs, setJuzSurahs] = useState<number[]>([]);
  const [question, setQuestion] = useState<Ayah | null>();

  useEffect(() => {
    setJuzSurahs([]);
    ayahs.filter((x) => {
      if (selectedJuzs.includes(x.juz)) {
        setJuzSurahs((prev) =>
          prev.includes(x.surah.number) ? prev : [...prev, x.surah.number]
        );
      }
    });
  }, [selectedJuzs]);

  const randomizeFromJuz = () => {
    const questions = ayahs.filter((x) => selectedJuzs.includes(x.juz));
    setQuestion(questions[Math.floor(Math.random() * questions.length)]);
  };

  const randomizeFromSurah = () => {
    const questions = ayahs.filter((x) => juzSurahs.includes(x.surah.number));
    setQuestion(questions[Math.floor(Math.random() * questions.length)]);
  };

  const resetSelections = () => {
    setSelectedJuzs([]);
    setQuestion(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 grid grid-cols-2 items-center justify-center p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Quran App {ayahs.length}
          </CardTitle>
          <CardDescription className="gap-2 flex">
          <Button onClick={randomizeFromJuz as any}>Random from Juz</Button>
          <Button onClick={randomizeFromSurah as any}>Random from Surahs</Button>
            <Button variant="destructive" onClick={resetSelections as any}>
              Reset
            </Button>
            {question?.surah.number}:{question?.numberInSurah}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-2">Choose volume(s):</h2>
            <ToggleGroup
              type="multiple"
              className="grid grid-cols-6"
              value={selectedJuzs.map(String)}
              onValueChange={(value) => setSelectedJuzs(value.map(Number))}
            >
              {juzs.map((juz, juzIndex) => (
                <ToggleGroupItem
                  key={juzIndex + 1}
                  value={String(juzIndex + 1)}
                  className="h-5"
                  variant="outline"
                >
                  {juzIndex + 1}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="space-y-6 mt-12">
            <h2 className="text-xl font-semibold mb-2">Choose surah(s):</h2>
            <ToggleGroup
              type="multiple"
              className="grid grid-cols-5"
              value={juzSurahs.map(String)}
              onValueChange={(value) => setJuzSurahs(value.map(Number))}
            >
              {surahs.map((surah) => {
                const inSelectedJuz = juzSurahs.some((x) => x === surah.number);

                return (
                  <ToggleGroupItem
                    key={surah.number}
                    value={String(surah.number)}
                    className={cn(
                      "h-5 justify-start truncate",
                      inSelectedJuz && "bg-primary text-primary-foreground"
                    )}
                    variant="outline"
                  >
                    {`${surah.number}. ${surah.englishName}`}
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>
        </CardContent>
      </Card>
      <iframe
        src={`https://tanzil.net/#${question?.surah.number}:${question?.numberInSurah}`}
        title="Tanzil"
        className="h-full w-full"
      />
    </div>
  );
}

// return (
//   <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//     <Card className="w-full max-w-2xl">
//       <CardHeader>
//         <CardTitle className="text-3xl font-bold text-center">
//           Quran App
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-6">
//           <div>
//             <h2 className="text-xl font-semibold mb-2">
//               Select Randomization Method:
//             </h2>
//             <RadioGroup
//               value={method}
//               onValueChange={(value) =>
//                 setMethod(value as RandomizationMethod)
//               }
//               className="flex flex-wrap gap-4"
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="surah" id="surah" />
//                 <Label htmlFor="surah">Surah</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="ayah" id="ayah" />
//                 <Label htmlFor="ayah">Verse (Ayah)</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="page" id="page" />
//                 <Label htmlFor="page">Page</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="juz" id="juz" />
//                 <Label htmlFor="juz">Volume (Juz)</Label>
//               </div>
//             </RadioGroup>
//           </div>

//           {method === "surah" && (
//             <div>
//               <Label htmlFor="surah-select" className="text-lg font-semibold">
//                 Select Surah:
//               </Label>
//               <Select
//                 value={selectedSurah.toString()}
//                 onValueChange={(value) => setSelectedSurah(parseInt(value))}
//               >
//                 <SelectTrigger className="w-full mt-2">
//                   <SelectValue placeholder="Select a Surah" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {surahs.map((surah) => (
//                     <SelectItem
//                       key={surah.number}
//                       value={surah.number.toString()}
//                     >
//                       {surah.number}. {surah.englishName} (
//                       {surah.englishNameTranslation})
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           )}

//           <Button
//             onClick={fetchRandomContent}
//             disabled={loading}
//             className="w-full"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Loading...
//               </>
//             ) : (
//               "Get Random Content"
//             )}
//           </Button>

//           {error && <p className="text-red-500">{error}</p>}

//           {content && (
//             <div className="mt-6 p-4 bg-white rounded-md shadow">
//               <pre className="whitespace-pre-wrap font-arabic text-lg">
//                 {content}
//               </pre>
//             </div>
//           )}

//           {method === "surah" && selectedSurah && (
//             <div className="mt-4 p-4 bg-white rounded-md shadow">
//               <h3 className="text-lg font-semibold mb-2">
//                 Surah Information:
//               </h3>
//               <p>
//                 <strong>Name:</strong> {surahs[selectedSurah - 1].name}
//               </p>
//               <p>
//                 <strong>English Name:</strong>{" "}
//                 {surahs[selectedSurah - 1].englishName}
//               </p>
//               <p>
//                 <strong>English Translation:</strong>{" "}
//                 {surahs[selectedSurah - 1].englishNameTranslation}
//               </p>
//               <p>
//                 <strong>Number of Verses:</strong>{" "}
//                 {surahs[selectedSurah - 1].numberOfAyahs}
//               </p>
//               <p>
//                 <strong>Revelation Type:</strong>{" "}
//                 {surahs[selectedSurah - 1].revelationType}
//               </p>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   </div>
// );

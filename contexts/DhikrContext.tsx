
import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

export interface DhikrItem {
  dhikr_id: string;
  Arabic: string;
  Transliteration: string;
  Meaning: string;
  DhikrSelectorText: string;
}

export const DhikrList: DhikrItem[] = [
  {
    dhikr_id: 'Subhan Allah',
    Arabic: 'سُبْحَانَ اللَّهِ',
    Transliteration: 'Subḥān Allāh',
    Meaning: 'Glory be to Allah',
    DhikrSelectorText: 'Subhan Allah',
  },
  {
    dhikr_id: 'Alhamdulillah',
    Arabic: 'الْحَمْدُ لِلَّهِ',
    Transliteration: 'Alhamdulillah',
    Meaning: 'Praise be to Allah',
    DhikrSelectorText: 'Alhamdulillah',
  },
  {
    dhikr_id: 'Allahu Akbar',
    Arabic: 'اللَّهُ أَكْبَرُ',
    Transliteration: 'Allahu Akbar',
    Meaning: 'Allah is the Greatest',
    DhikrSelectorText: 'Allahu Akbar',
  },
  {
    dhikr_id: 'La ilaha illallah',
    Arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ',
    Transliteration: 'La Ilaha illAllah',
    Meaning: 'There is no God except Allah',
    DhikrSelectorText: 'La ilaha illallah',
  },
  {
    dhikr_id: 'Astagfirullah',
    Arabic: 'أَسْتَغْفِرُ اللَّهَ',
    Transliteration: 'Astagfirullah',
    Meaning: 'I seek forgiveness from Allah',
    DhikrSelectorText: 'Astagfirullah',
  },
  {
    dhikr_id: 'Subhan Allahi wa-bi Hamdihi',
    Arabic: 'سُبْحَانَ اللّهِ وَ بِحَمْدِهِ',
    Transliteration: 'Subhan Allahi Wa Bihamdihi',
    Meaning: 'Glory and praise is to Allah',
    DhikrSelectorText: 'Subhan Allahi wa-bi Hamdihi',
  },
  {
    dhikr_id: 'Subhan Allahil Azeem',
    Arabic: 'سُبْحَانَ اللَّهِ الْعَظِيمِ',
    Transliteration: 'Subhan Allahil Azeem',
    Meaning: 'Glory be to Allah, The Greatest',
    DhikrSelectorText: 'Subhan Allahil Azeem',
  },
  {
    dhikr_id: 'Rabbi zidni ilma',
    Arabic: 'رَبِّ زِدْنِي عِلْمًا',
    Transliteration: 'Rabbi Zidni Ilma',
    Meaning: 'My Lord, increase me in knowledge',
    DhikrSelectorText: 'Rabbi zidni ilma',
  },
  {
    dhikr_id: 'HasbunAllah wa ni\'mal wakeel',
    Arabic: 'حَسْبُنَا ٱللَّٰهُ وَنِعْمَ ٱلْوَكِيلُ',
    Transliteration: 'HasbunAllah Wa Ni\'mal Wakeel',
    Meaning: 'Allah is Sufficient for us, and He is the best disposer of affairs',
    DhikrSelectorText: 'HasbunAllah wa ni\'mal wakeel',
  },
  {
    dhikr_id: 'La Hawla Wala Quwata Illa Billah',
    Arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    Transliteration: 'La Hawla Wala Quwata Illa Billah',
    Meaning: 'There is no power nor strength except with Allah',
    DhikrSelectorText: 'La Hawla Wala Quwata Illa Billah',
  },
  {
    dhikr_id: 'Tasbeeh',
    Arabic: 'Tasbeeh',
    Transliteration: ' ',
    Meaning: ' ',
    DhikrSelectorText: 'Tasbeeh',
  },
];

interface DhikrContextType {
  activeDhikrIndex: number;
  activeDhikr: DhikrItem;
  dhikrCounts: { [key: string]: number };
  selectDhikr: (index: number, currentCounterValue: number) => void;
  navigateDhikrNext: (currentCounterValue: number) => void;
  navigateDhikrPrev: (currentCounterValue: number) => void;
  updateDhikrCount: (dhikrId: string, count: number) => void;
}

const DhikrContext = createContext<DhikrContextType | undefined>(undefined);

export function DhikrProvider({ children }: { children: ReactNode }) {
  const [activeDhikrIndex, setActiveDhikrIndex] = useState(0);
  const [dhikrCounts, setDhikrCounts] = useState<{ [key: string]: number }>({});
  const isInitialized = useRef(false);

  const activeDhikr = DhikrList[activeDhikrIndex];

  useEffect(() => {
    if (isInitialized.current) {
      return;
    }

    const initialCounts: { [key: string]: number } = {};
    DhikrList.forEach(dhikr => {
      initialCounts[dhikr.dhikr_id] = 0;
    });
    
    console.log('Initializing Dhikr counts:', initialCounts);
    setDhikrCounts(initialCounts);
    isInitialized.current = true;
  }, []);

  const updateDhikrCount = (dhikrId: string, count: number) => {
    console.log('Updating Dhikr count:', dhikrId, 'to', count);
    setDhikrCounts(prev => ({ ...prev, [dhikrId]: count }));
  };

  const selectDhikr = (index: number, currentCounterValue: number) => {
    console.log('Saving current count for', activeDhikr.dhikr_id, ':', currentCounterValue);
    updateDhikrCount(activeDhikr.dhikr_id, currentCounterValue);
    console.log('Dhikr selected:', DhikrList[index].dhikr_id);
    setActiveDhikrIndex(index);
  };

  const navigateDhikrNext = (currentCounterValue: number) => {
    console.log('Saving current count for', activeDhikr.dhikr_id, ':', currentCounterValue);
    updateDhikrCount(activeDhikr.dhikr_id, currentCounterValue);
    setActiveDhikrIndex((prev) => {
      const nextIndex = (prev + 1) % DhikrList.length;
      console.log('Navigating to next Dhikr:', DhikrList[nextIndex].dhikr_id);
      return nextIndex;
    });
  };

  const navigateDhikrPrev = (currentCounterValue: number) => {
    console.log('Saving current count for', activeDhikr.dhikr_id, ':', currentCounterValue);
    updateDhikrCount(activeDhikr.dhikr_id, currentCounterValue);
    setActiveDhikrIndex((prev) => {
      const prevIndex = (prev - 1 + DhikrList.length) % DhikrList.length;
      console.log('Navigating to previous Dhikr:', DhikrList[prevIndex].dhikr_id);
      return prevIndex;
    });
  };

  return (
    <DhikrContext.Provider
      value={{
        activeDhikrIndex,
        activeDhikr,
        dhikrCounts,
        selectDhikr,
        navigateDhikrNext,
        navigateDhikrPrev,
        updateDhikrCount,
      }}
    >
      {children}
    </DhikrContext.Provider>
  );
}

export function useDhikr() {
  const context = useContext(DhikrContext);
  if (context === undefined) {
    throw new Error('useDhikr must be used within a DhikrProvider');
  }
  return context;
}

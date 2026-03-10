
import { useState, useRef, useCallback, useEffect } from 'react';
import { useDhikr } from '../contexts/DhikrContext';
import * as Haptics from 'expo-haptics';

const MAX_COUNTER_VALUE = 999999;
const TAP_RATE_LIMIT = 7;
const TAP_WINDOW = 1000;

export function useCounter() {
  const { activeDhikr, dhikrCounts, updateDhikrCount } = useDhikr();
  const [counterValue, setCounterValue] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const tapTimestamps = useRef<number[]>([]);
  const previousDhikrId = useRef<string>(activeDhikr.dhikr_id);

  useEffect(() => {
    if (previousDhikrId.current !== activeDhikr.dhikr_id) {
      const savedCount = dhikrCounts[activeDhikr.dhikr_id] || 0;
      setCounterValue(savedCount);
      previousDhikrId.current = activeDhikr.dhikr_id;
    }
  }, [activeDhikr.dhikr_id, dhikrCounts]);

  const checkTapRate = useCallback((): boolean => {
    const now = Date.now();
    const recentTaps = tapTimestamps.current.filter(
      (timestamp) => now - timestamp < TAP_WINDOW
    );
    tapTimestamps.current = recentTaps;

    if (recentTaps.length >= TAP_RATE_LIMIT) {
      return false;
    }

    tapTimestamps.current.push(now);
    return true;
  }, []);

  const incrementCounter = useCallback(async () => {
    if (!checkTapRate()) {
      setShowWarning(true);
      return;
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setCounterValue((prev) => {
      const newValue = prev >= MAX_COUNTER_VALUE ? 0 : prev + 1;
      return newValue;
    });
    
    const newValue = counterValue >= MAX_COUNTER_VALUE ? 0 : counterValue + 1;
    updateDhikrCount(activeDhikr.dhikr_id, newValue);
  }, [checkTapRate, activeDhikr.dhikr_id, updateDhikrCount, counterValue]);

  const decrementCounter = useCallback(() => {
    const newValue = Math.max(0, counterValue - 1);
    setCounterValue(newValue);
    updateDhikrCount(activeDhikr.dhikr_id, newValue);
  }, [activeDhikr.dhikr_id, updateDhikrCount, counterValue]);

  const resetCounter = useCallback(() => {
    setCounterValue(0);
    updateDhikrCount(activeDhikr.dhikr_id, 0);
    tapTimestamps.current = [];
  }, [activeDhikr.dhikr_id, updateDhikrCount]);

  const closeWarning = useCallback(() => {
    setShowWarning(false);
  }, []);

  return {
    counterValue,
    showWarning,
    incrementCounter,
    decrementCounter,
    resetCounter,
    closeWarning,
  };
}

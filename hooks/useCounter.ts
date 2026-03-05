
import { useState, useRef, useCallback, useEffect } from 'react';
import { useDhikr } from '../contexts/DhikrContext';

const MAX_COUNTER_VALUE = 999999;
const TAP_RATE_LIMIT = 7;
const TAP_WINDOW = 1000;

export function useCounter() {
  const { activeDhikr, dhikrCounts, updateDhikrCount } = useDhikr();
  const [counterValue, setCounterValue] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const tapTimestamps = useRef<number[]>([]);
  const previousDhikrId = useRef<string>(activeDhikr.dhikr_id);

  // Load saved count when activeDhikr changes
  useEffect(() => {
    // Only update if the Dhikr actually changed
    if (previousDhikrId.current !== activeDhikr.dhikr_id) {
      const savedCount = dhikrCounts[activeDhikr.dhikr_id] || 0;
      console.log('Loading saved count for', activeDhikr.dhikr_id, ':', savedCount);
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
      console.log('Tap rate exceeded: User tapping too fast');
      return false;
    }

    tapTimestamps.current.push(now);
    return true;
  }, []);

  const incrementCounter = useCallback(() => {
    console.log('Counter increment attempted');
    
    if (!checkTapRate()) {
      console.log('Showing warning modal');
      setShowWarning(true);
      return;
    }

    setCounterValue((prev) => {
      const newValue = prev >= MAX_COUNTER_VALUE ? 0 : prev + 1;
      console.log('Counter value changed:', prev, '->', newValue);
      updateDhikrCount(activeDhikr.dhikr_id, newValue);
      return newValue;
    });
  }, [checkTapRate, activeDhikr.dhikr_id, updateDhikrCount]);

  const decrementCounter = useCallback(() => {
    console.log('Counter decrement button tapped');
    setCounterValue((prev) => {
      const newValue = Math.max(0, prev - 1);
      console.log('Counter value changed:', prev, '->', newValue);
      updateDhikrCount(activeDhikr.dhikr_id, newValue);
      return newValue;
    });
  }, [activeDhikr.dhikr_id, updateDhikrCount]);

  const resetCounter = useCallback(() => {
    console.log('Counter reset button tapped for', activeDhikr.dhikr_id);
    setCounterValue(0);
    updateDhikrCount(activeDhikr.dhikr_id, 0);
    tapTimestamps.current = [];
  }, [activeDhikr.dhikr_id, updateDhikrCount]);

  const closeWarning = useCallback(() => {
    console.log('Warning modal closed');
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

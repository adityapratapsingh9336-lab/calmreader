import { useState, useEffect, useCallback } from 'react';
import { telemetryTracker } from '../utils/telemetryTracker';
import { evaluateAdaptation, PROFILE_TYPES } from '../utils/adaptationEngine';

export function useAdaptiveEngine(text, initialSettings) {
  const [settings, setSettings] = useState(initialSettings);
  const [profileType, setProfileType] = useState(PROFILE_TYPES.NORMAL);
  const [toastMessage, setToastMessage] = useState(null);
  const [isAutoEnabled, setIsAutoEnabled] = useState(true);

  // Initialize telemetry tracker when passage text changes
  useEffect(() => {
    if (text) {
      telemetryTracker.startPassage(text);
    }
  }, [text]);

  // Periodic evaluation ticker (evaluates telemetry every 4 seconds)
  useEffect(() => {
    if (!text || !isAutoEnabled) return;

    const interval = setInterval(() => {
      const metrics = telemetryTracker.getMetrics();
      const adaptation = evaluateAdaptation(metrics, settings);

      setProfileType(adaptation.profileType);

      // Sync telemetry metrics to backend server
      fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics,
          profileType: adaptation.profileType,
          timestamp: new Date().toISOString()
        })
      }).catch((err) => console.warn('Telemetry backend sync error:', err));

      if (adaptation.shouldAdapt) {
        setSettings(adaptation.newSettings);
        setToastMessage(adaptation.reason);

        // Auto-hide toast notification after 5 seconds
        setTimeout(() => setToastMessage(null), 5000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [text, settings, isAutoEnabled]);

  const updateSettings = useCallback((partial) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const toggleAutoAdapt = useCallback(() => {
    setIsAutoEnabled((prev) => !prev);
  }, []);

  const dismissToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  return {
    settings,
    updateSettings,
    profileType,
    toastMessage,
    dismissToast,
    isAutoEnabled,
    toggleAutoAdapt,
    telemetryMetrics: telemetryTracker.getMetrics(),
  };
}

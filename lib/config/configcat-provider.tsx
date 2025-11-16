'use client';

import * as configcat from 'configcat-js';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { FeatureFlag } from './feature-flags';

interface ConfigCatContextType {
  isFeatureEnabled: (flag: FeatureFlag) => boolean;
  isLoading: boolean;
}

const ConfigCatContext = createContext<ConfigCatContextType>({
  isFeatureEnabled: () => false,
  isLoading: true,
});

export const useFeatureFlags = () => useContext(ConfigCatContext);

interface ConfigCatProviderProps {
  children: ReactNode;
}

export function ConfigCatProvider({ children }: ConfigCatProviderProps) {
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sdkKey = process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY;
    
    if (!sdkKey) {
      console.warn('ConfigCat SDK key not found. Feature flags will default to disabled.');
      setIsLoading(false);
      return;
    }

    // Initialize ConfigCat client
    const configCatClient = configcat.getClient(
      sdkKey,
      configcat.PollingMode.AutoPoll,
      {
        pollIntervalSeconds: 60,
        setupHooks: (hooks) => {
          hooks.on('configChanged', async () => {
            await loadFlags(configCatClient);
          });
        },
      }
    );

    loadFlags(configCatClient);

    return () => {
      configCatClient.dispose();
    };
  }, []);

  const loadFlags = async (configCatClient: configcat.IConfigCatClient) => {
    try {
      // Get all flag values at once
      const allValues = await configCatClient.getAllValuesAsync();
      const flagValues: Record<string, boolean> = {};

      for (const [key, value] of Object.entries(allValues)) {
        flagValues[key] = Boolean(value);
      }

      setFlags(flagValues);
    } catch (error) {
      console.error('Error loading feature flags:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFeatureEnabled = (flag: FeatureFlag): boolean => {
    return flags[flag] ?? false;
  };

  return (
    <ConfigCatContext.Provider value={{ isFeatureEnabled, isLoading }}>
      {children}
    </ConfigCatContext.Provider>
  );
}

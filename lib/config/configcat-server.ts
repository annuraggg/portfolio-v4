import { getClient, PollingMode, SettingValue } from "@configcat/sdk";

const sdkKey = process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY;

let configCatClient: ReturnType<typeof getClient> | null = null;

function getConfigCatClient() {
  if (!sdkKey || sdkKey.length < 20) {
    return null;
  }
  if (!configCatClient) {
    try {
      configCatClient = getClient(sdkKey, PollingMode.AutoPoll, {
        pollIntervalSeconds: 60,
      });
    } catch (error) {
      console.warn("ConfigCat client initialization failed:", error);
      return null;
    }
  }
  return configCatClient;
}

export { configCatClient };

export async function getFeatureFlag(key: string, defaultValue: SettingValue) {
  try {
    const client = getConfigCatClient();
    if (!client) {
      return defaultValue;
    }
    return await client.getValueAsync(key, defaultValue);
  } catch (error) {
    console.warn("ConfigCat feature flag check failed:", error);
    return defaultValue;
  }
}

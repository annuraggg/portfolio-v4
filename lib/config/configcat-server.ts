import { getClient, PollingMode, SettingValue } from "@configcat/sdk";

export const configCatClient = getClient(
  process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY!,
  PollingMode.AutoPoll,
  {
    pollIntervalSeconds: 60,
  }
);

export async function getFeatureFlag(key: string, defaultValue: SettingValue) {
  return await configCatClient.getValueAsync(key, defaultValue);
}

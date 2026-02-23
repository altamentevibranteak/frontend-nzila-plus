# Deployment Checklist (EAS)

1. Install EAS CLI: `npm install -g eas-cli`
2. Configure `eas.json` as needed (not included here).
3. Ensure credentials configured for your account (`eas credentials` / `eas device:create`).
4. Run: `eas build --profile development --platform android` to create a dev build.
5. Install the generated build on a device or emulator.
6. For App Store / Play Store builds, follow EAS docs and set production profiles.

Notes:
- Use environment variables for production API_URL.
- Consider enabling `expo-updates` for OTA.

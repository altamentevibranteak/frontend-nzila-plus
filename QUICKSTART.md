# Quickstart

Prerequisites:
- Node 16 (use nvm recommended)
- npm
- Install `eas` CLI if you plan to build: `npm install -g eas-cli`

Commands:

```bash
# install deps
npm install

# copy example env
cp .env.example .env
# optionally edit .env and set USE_MOCK=true for local mocks

# start metro (tunnel recommended in Codespaces)
npx expo start --tunnel

# run in web
npx expo start --web

# create an EAS development build (Android example)
eas build --profile development --platform android
```

Notes:
- For Codespaces, use the `--tunnel` option to expose dev server to the mobile device if needed.

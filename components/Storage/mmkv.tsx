import { MMKV } from 'react-native-mmkv'

const appStorage = new MMKV({
  id: 'theme-app',
})

export function getTheme() {
    return appStorage.getString("theme");
}

export function setTheme(theme: string) {
    appStorage.set("theme", theme);
}
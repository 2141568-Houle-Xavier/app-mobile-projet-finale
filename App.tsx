import React, { useContext, useEffect, useState } from 'react';
import Topbar from './components/Views/Topbar';
import Home from './components/Views/Home/Home';  
import AjouterVille from './components/Views/Ajouter/AjouterVille';
import RequetePermission from './components/Permission';

import { Provider as PaperProvider, DefaultTheme, Button, adaptNavigationTheme, Appbar } from 'react-native-paper';

import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, useNavigation, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { darkTheme, lightTheme } from './models/ThemeColors';
import DatabaseProvider from './context/database.context';
import { getTheme, setTheme } from './components/Storage/mmkv';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = {
  ...DefaultTheme,
  ...LightTheme,
  colors: {
    ...lightTheme.colors,
    ...LightTheme.colors,
  } 
}

const CombinedDarkTheme = {
  ...DefaultTheme,
  ...DarkTheme,
  colors: {
    ...darkTheme.colors,
    ...DarkTheme.colors,
  }
}


export type RootStackParamList = {
  Home: undefined; 
  Ajouter: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const [userTheme, setUserTheme] = useState(getTheme());

  const toggleTheme = () => {
    if (userTheme === "dark") {
      setUserTheme("light")
      setTheme("light")
    }
    else {
      setUserTheme("dark")
      setTheme("dark")
    } 
  }

  const theme = userTheme == "dark" ? CombinedDarkTheme : CombinedLightTheme;

  const renderTopBar = ({ route }: { route: { name: string } }) => {
    const navigation = useNavigation();

    if (route.name === "Home") {
      return <Topbar onToggleTheme={toggleTheme} />;
    }
    
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Xavier Houle"/>
      </Appbar.Header>
    );
  };

  useEffect(() => {
    RequetePermission()
  }, [])

  return (
    <DatabaseProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
              <Stack.Navigator initialRouteName="Home"
                screenOptions={{
                  header: (props) => renderTopBar(props)
                }}
              >
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Ajouter" component={AjouterVille}/>
              </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </DatabaseProvider>
  );
}


export default App;

import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Appbar, Divider, useTheme } from "react-native-paper";
import { RootStackParamList } from '../../App';


interface TopbarProps {
    onToggleTheme: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onToggleTheme }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const theme = useTheme();

    const handleNavigation = () => {
        navigation.navigate("Ajouter");
    }

    return (
        <>
            <Appbar.Header style={{backgroundColor: theme.colors.surface, zIndex: 3}}>
                <Appbar.Action icon="brightness-4" onPress={onToggleTheme}/>
                <Appbar.Content title = "Xavier Houle" style={{ alignItems: "center" }}/>
                <Appbar.Action icon="plus" onPress={handleNavigation}/>
            </Appbar.Header>
            <Divider/>
        </>
    );
}


export default Topbar;
import React, { useRef, useState } from "react"
import { TouchableOpacity, Image, GestureResponderEvent } from "react-native"
import { Card, IconButton, Text, useTheme, Menu, Portal, Divider } from "react-native-paper"
import { IMeteo } from "../../../models/IMeteo"

interface CarteMeteoProps {
    meteoData: IMeteo
}

const CarteMeteo = ({ meteoData }: CarteMeteoProps) => {
    const theme = useTheme();
    const [isMenuVisible, setMenuVisible] = useState(false);

    const handleMenuPress = () => {
        setMenuVisible(true);
    };

    const handleMenuItemPress = () => {
        // Handle menu item press here
        setMenuVisible(false);
    };

    return (
        <TouchableOpacity onPress={() => {}}>
            <Card style={{ minWidth: "100%", backgroundColor: theme.colors.surfaceVariant }}>
                <Card.Actions style={{position: "absolute", zIndex: 2, right: 7}}>
                    <Menu
                        visible={isMenuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={
                            <IconButton
                                icon="dots-vertical"
                                onPress={handleMenuPress}
                                size={16}
                                iconColor={theme.colors.onBackground}
                            />
                        }
                        anchorPosition="bottom"
                        contentStyle={{backgroundColor: theme.colors.surface}}
                    >
                        <Menu.Item 
                            onPress={handleMenuItemPress} 
                            title="Edit" 
                            dense
                        />
                        <Menu.Item 
                            onPress={handleMenuItemPress} 
                            title="Delete" 
                            dense
                        />
                    </Menu>
                </Card.Actions>

                <Card.Title title="Aston Jonction" titleVariant="titleLarge" style={{paddingTop: 10}}/>

                <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ flex: 1 }} variant="titleMedium">
                        {meteoData?.weather[0].description[0].toUpperCase() + meteoData?.weather[0].description.slice(1)}
                    </Text>
                    <Text variant="titleMedium">{meteoData ? Math.round(meteoData.main.temp - 273.15) : 0}C°</Text>

                    <Image
                        style={{ width: 50, height: 50, }}
                        source={{ uri: `https://openweathermap.org/img/wn/${meteoData?.weather[0].icon}@2x.png` }}
                    />
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}

export default CarteMeteo;

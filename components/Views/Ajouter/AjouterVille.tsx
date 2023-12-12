import React from "react";
import { useState } from "react"
import { Button, Card, TextInput, useTheme } from "react-native-paper";

 const AjouterVille = () => {
    const theme = useTheme();
    const [ville, setVille] = useState("");

    return (
        <Card style={{width: "90%", backgroundColor: theme.colors.surfaceVariant, alignSelf: "center", marginTop: 10}}>
            <Card.Title title="Ajouter une ville" titleVariant="titleLarge"/>

            <Card.Content>
                <TextInput
                    label="Nom de la Ville"
                    value={ville}
                    onChangeText={ville => setVille(ville)}
                    mode="outlined"
                />

                <Button mode="contained" onPress={() => {}} style={{marginTop: 25, width: 150, alignSelf: "flex-end"}}>
                    Enregistrer
                </Button>
            </Card.Content>
        </Card>
    );
}

export default AjouterVille;
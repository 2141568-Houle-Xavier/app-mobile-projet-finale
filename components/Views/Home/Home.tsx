import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Image, TouchableOpacity } from "react-native";
import { Text, Card, useTheme, IconButton } from "react-native-paper";
import { HomeStyle } from "./HomeStyle";
import  ApiService from "../../ApiService";
import { IMeteo } from "../../../models/IMeteo";
import { DatabaseContext } from "../../../context/database.context";
import { IVille } from "../../../models/IVille";
import CarteMeteo from "./CarteMeteo";

const Home = () => {
  const api = new ApiService("https://api.openweathermap.org/data/2.5/weather")
  const [chargement, setChargement] = useState(false); // Limite 1 requète par loading. 
  const [meteoData, setMeteoData] = useState<IMeteo>();
  const {connexion, setConnexion} = useContext(DatabaseContext);
  const [villes, setVilles] = useState<IVille[]>([]);
  const theme = useTheme();

  const fetchMeteoData = async () => {
    setChargement(true)

    await api.get("?lat=46&lon=-72&appid=57352fb3fbe40aa493121bc7f108f592&lang=fr")
    .then((data) => {
      setMeteoData(data as IMeteo)
    })
    .catch((err) => {console.log(err)})
    .finally(() => {setChargement(false)})
  }

  useEffect(() => {
    fetchMeteoData()
  }, []);

  if (chargement) {
    return <Text>La température d'aujourd'hui est en chargement.</Text>
  }

  return (
    <ScrollView contentContainerStyle={HomeStyle.conteneur}>
        <CarteMeteo meteoData={meteoData}/>
    </ScrollView>
  );
};

export default Home;

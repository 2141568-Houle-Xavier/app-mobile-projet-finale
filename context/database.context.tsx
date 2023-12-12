import React, {useEffect, useState} from "react";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import { getDBConnection } from "../components/Storage/requetes";

export type DatabaseContextType = {
    connexion: SQLiteDatabase,
    setConnexion: (db: SQLiteDatabase) => void;
}

export const DatabaseContext = React.createContext<DatabaseContextType>({
    connexion: null,
    setConnexion: () => {},
});

const getDatabaseConnection  = async () => {return await getDBConnection()}

export default function DatabaseProvider(props: any) {
    const [connexion, setConnexion] = useState(null);
    
    const initializeDatabase = async () => {
        const databaseConnection = await getDatabaseConnection();
        setConnexion(databaseConnection);
    }

    useEffect(() => {
        initializeDatabase();
    }, []);

    const values = {
        connexion,
        setConnexion,
    }

    return (
        <DatabaseContext.Provider value={values}>
            {props.children}
        </DatabaseContext.Provider>
    );
}
import {
    enablePromise,
    openDatabase,
    SQLiteDatabase,
  } from 'react-native-sqlite-storage';
import { IVille } from '../../models/IVille';

enablePromise(true);

export const   getDBConnection = async () => {
    return openDatabase({name: "MeteoDatabase.db", location: "default"})
};

export const createTableVille = async (db: SQLiteDatabase) => {
    const query = `CREATE TABLE IF NOT EXISTS villes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL
    );`;

    await db.executeSql(query);
};

export const getVilles = async (db: SQLiteDatabase): Promise<IVille[]> => {
    try {
        const villes: IVille[] = [];

        const results = await db.executeSql(
            `SELECT * FROM villes;`,
        );

        results.forEach(results => {
            for (let index = 0; index < results.rows.length; index++) {
                villes.push(results.rows.item(index));
            }
        });

        return villes;

    } catch (error) {
        console.log(error)
        throw Error('Impossible de récupérer la vile.');
    };
    
};
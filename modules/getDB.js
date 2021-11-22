import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


const firebaseApp = initializeApp({
    apiKey: "AIzaSyBEsHSEU8VxOwxnNfEtfhIA7zY1MCK7d5c",
    authDomain: "market-7392f.firebaseapp.com",
    projectId: "market-7392f",
    storageBucket: "market-7392f.appspot.com",
    messagingSenderId: "487492108717",
    appId: "1:487492108717:web:195e96c0ce21c76a972124"
});
const db = getFirestore(firebaseApp);

function getDB() {
    // Promise. Посылаем запрос на сервер в базу данных
    let getObjData = new Promise((resolve, reject) => {
        // Обращаемся к базе данных и получаем все из раздела 'catalog'
        try {
            const querySnapshot = getDocs(collection(db, "catalog"));
            resolve(querySnapshot);
        }
        catch(err) {
            console.log("No such document!");
        }
    });

    return new Promise((resolve, reject) => {
        getObjData
        .then(dataRaw => dataRaw.docs)
        .then(dataRawArr => dataRawArr.map(item => {
        const obj = item.data();
        obj.id = item.id;
        return obj;
        }))
        .then(data => resolve(data));
    });
}

export default getDB;
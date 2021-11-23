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

async function getDB() {
    try {
        const querySnapshot = await getDocs(collection(db, "catalog"));
        const dataArr = querySnapshot.docs.map(item => {
            const obj = item.data();
            obj.id = item.id;
            return obj;
        });
        const str = JSON.stringify(dataArr)
        localStorage.setItem("items", str);
    }
    catch(err) {
        console.log("No such document!");
    }
}

export default getDB;
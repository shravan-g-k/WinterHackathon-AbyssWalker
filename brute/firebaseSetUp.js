import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc, getDoc, getDocs, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxm82-peO-DiiVgSC9Wz94YuMInTnhq-M",
  authDomain: "brute-b55d9.firebaseapp.com",
  projectId: "brute-b55d9",
  storageBucket: "brute-b55d9.firebasestorage.app",
  messagingSenderId: "416799718740",
  appId: "1:416799718740:web:6ca60beeead1784d75dcc1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Configuration for your database paths
const appId = "my_app_id"; 
const chatsCollection = "chats";

/**
 * Retrieves all history of the current chat
 */
export async function getChatHistory(chatId) {
    if (!chatId) return [];
    const user = auth.currentUser;
    if (!user) return [];

    const chatRef = doc(db, 'artifacts', appId, 'users', user.uid, chatsCollection, chatId);
    try {
        const docSnap = await getDoc(chatRef);
        return docSnap.exists() ? (docSnap.data().messages || []) : [];
    } catch (e) {
        console.error("Error fetching chat history:", e);
        return [];
    }
}

/**
 * Saves a new message to a chat. Creates a new doc if chatId is null.
 */
export async function newMessage(chatId, botData, userData) {
    let user = auth.currentUser;
    
    if (!user) {
        console.error("No authenticated user found.");
        return null;
    }

    const timestamp = Date.now();
    const newEntry = { bot: botData, user: userData, timestamp };
    let chatRef;

    if (chatId) {
        chatRef = doc(db, 'artifacts', appId, 'users', user.uid, chatsCollection, chatId);
    } else {
        // Generates a new ID if chatId is null
        chatRef = doc(collection(db, 'artifacts', appId, 'users', user.uid, chatsCollection));
    }

    try {
        await setDoc(chatRef, {
            messages: arrayUnion(newEntry),
            lastUpdated: timestamp,
            chatId: chatRef.id,
            userId: user.uid
        }, { merge: true });

        return chatRef.id;
    } catch (e) {
        console.error("Error saving message:", e);
        return null;
    }
}
import { 
  doc, 
  collection, 
  setDoc, 
  getDoc, 
  getDocs, 
  arrayUnion 
} from "firebase/firestore"; 
import { db, auth } from "./firebaseSetUp"; // Corrected file reference

// Define these or pass them as arguments
const appId = "my_app_id"; 
const chatsCollection = "chats";

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
        // Path to existing chat
        chatRef = doc(db, 'artifacts', appId, 'users', user.uid, chatsCollection, chatId);
    } else {
        // Path to new chat (auto-generates ID)
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

export async function getChatData(chatId) {
    const user = auth.currentUser;
    if (!user || !chatId) return null;
    const chatRef = doc(db, 'artifacts', appId, 'users', user.uid, chatsCollection, chatId);
    try {
        const docSnap = await getDoc(chatRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (e) {
        console.error("Error fetching chat data:", e);
        return null;
    }
}

export async function getChatHistory(chatId) {
    const data = await getChatData(chatId);
    return data ? (data.messages || []) : [];
}

export async function getAllUserChats() {
    const user = auth.currentUser;
    if (!user) return [];
    const chatsCol = collection(db, 'artifacts', appId, 'users', user.uid, chatsCollection);
    try {
        const querySnapshot = await getDocs(chatsCol);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.error("Error fetching all chats:", e);
        return [];
    }
}
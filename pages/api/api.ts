import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

 export const chatData = async (id) => {
    try{
        const docRef = doc(db, 'chats', `${id}`);
        const docSnap = await getDoc(docRef);  
        if (docSnap.exists()) {
            //console.log("Document data:", docSnap.data());
            return docSnap.data();
        } else {
            // docSnap.data() will be undefined in this case
            console.log('No such document!', id);
        }
    }
    catch (error) {
        console.log(error.message);
    }
 


};
 export const chatRecipient = async (email) => {
    try{
        const docRef = doc(db, 'users', `${email}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            //console.log("Document data:", docSnap.data());
            return docSnap.data();
        } else {
            // docSnap.data() will be undefined in this case
            console.log('No such user!');
        }
    }
    catch (error) {
        console.log(error.message);
    }
  

   
};
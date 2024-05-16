import {
  addDoc,
  doc,
  collection,
  getDocs,
  where,
  documentId,
  query,
  getDoc,
  deleteDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../firebase";

async function readUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  let response = querySnapshot.docs.map((doc) => doc.data());
  return response;
}

async function readUserById() {
  const docRef = doc(db, "collection_1/documento");
  const querySnapshot = await getDoc(docRef);
  console.log("querySnapshot.docs", querySnapshot.get());
  return null;
}

async function getDocument(coll, id) {
  const docRef = doc(db, coll, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return docSnap.data();
  else return null;
}

async function addUser() {
  try {
    const docRef = await  (collection(db, "users"), {
      first: "Alan",
      middle: "Mathison",
      last: "Turing",
      born: 1912,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


async function updateUser(fieldName, fieldValue, userIndex = 0) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    if (querySnapshot.docs.length > userIndex) {
      const userDoc = querySnapshot.docs[userIndex]; // Accede al usuario especificado por posición
      const userId = userDoc.id;
  
      console.log(`ID del usuario en posición ${userIndex}:`, userId);
  
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { [fieldName]: fieldValue });
      console.log("Documento del usuario actualizado exitosamente");
    } else {
      console.log("No hay suficientes usuarios en la colección para actualizar.");
    }
  } catch (e) {
    console.error("Error actualizando el documento del usuario: ", e);
  }
}

async function deleteUser(userIndex = 1) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    if (querySnapshot.docs.length > userIndex) {
      const userDoc = querySnapshot.docs[userIndex]; // Accede al usuario especificado por posición
      const userId = userDoc.id;
  
      console.log(`ID del usuario en posición ${userIndex}:`, userId);
  
      const userRef = doc(db, "users", userId);
      await deleteDoc(userRef);
      console.log(`Usuario en posición ${userIndex} eliminado exitosamente`);
    } else {
      console.log("No hay suficientes usuarios en la colección para eliminar.");
    }
  } catch (e) {
    console.error("Error eliminando el usuario: ", e);
  }
}


export { readUsers, addUser, readUserById, deleteUser, updateUser};

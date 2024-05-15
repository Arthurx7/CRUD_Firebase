import { useEffect, useState } from "react";
import "./App.css";
import { readUsers, addUser, deleteUser, updateUser } from "./core/service/firebase/db/users";
import { db } from "./core/service/firebase/firebase";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getUsersCallBack();
  }, []);

  let getUsersCallBack = async () => {
    let response = await readUsers(db);
    console.log("response ", response);
  };

  return (
    <>
      <button onClick={() => addUser(db)}>Añadir Caracter</button>
      <button onClick={() => deleteUser(db)}>Borrar</button>
      <button onClick={() => updateUser(db)}>Actualizar</button>
    </>
  );
}

export default App;

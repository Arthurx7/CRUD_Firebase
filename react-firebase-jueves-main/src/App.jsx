import { useEffect, useState } from "react";
import "./App.css";
import { readUsers, addUser, deleteUser, updateUser } from "./core/service/firebase/db/users";
import { db } from "./core/service/firebase/firebase";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersCallBack();
  }, []);

  const getUsersCallBack = async () => {
    let response = await readUsers(db);
    setUsers(response);
    console.log("Usuarios obtenidos:", response);
  };

  return (
    <div>
      <button onClick={async () => {
        await addUser();
        getUsersCallBack();
      }}>Añadir Usuario</button>

      <button onClick={async () => {
        await deleteUser();
        getUsersCallBack();
      }}>Borrar Usuario</button>

      <button onClick={async () => {
        await updateUser();
        getUsersCallBack();
      }}>Actualizar Usuario</button>

      
    </div>
  );
}

export default App;

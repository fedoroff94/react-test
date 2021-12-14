import React from "react";
import SearchBar from "./components/Common/SearchBar";
import Users from "./components/UsersPage/Users";
import { useState } from "react";
import Repositories from "./components/UsersPage/Repositories";

function App() {

  let [users, setUsers] = useState('');
  let [activeUser, setActiveUser] = useState('')

  return (
    <div className="App">
     <SearchBar setUsers={setUsers}/>
     {users && <Users users={users} setActiveUser={setActiveUser}/>}
     {activeUser && <Repositories login={activeUser}/>}
    </div>
  );
}

export default App;

import React from "react";
import SearchBar from "./components/Common/SearchBar";
import Users from "./components/UsersPage/Users";
import { useState } from "react";
import Repositories from "./components/UsersPage/Repositories";
import IssuesPage from "./components/IssuesPage/IssuesPage";
import BasicModal from "./components/IssuesPage/Modal";

const App = () => {

  let [users, setUsers] = useState('');
  let [activeUser, setActiveUser] = useState('');
  let [currentRepo, setCurrentRepo] = useState('');

  let [starsCount, setStarsCount] = useState('');
  let [watchCount, setWatchCount] = useState('');
  let [userName, setUserName] = useState('');
  let  [repoId, setRepoId] = useState('');

  const [open, setOpen] = useState(false);

  const clearPrevData = () => {
    setActiveUser('')
    setCurrentRepo('')
  }

  return (
    <div className="App">
     <SearchBar setUsers={setUsers} clearPrevData={clearPrevData}/>
     {users && <Users users={users} setActiveUser={setActiveUser} setUserName={setUserName} clearPrevData={clearPrevData}/>}
     
     {activeUser && !currentRepo && <Repositories login={activeUser} setCurrentRepo={setCurrentRepo} setStarsCount={setStarsCount} setWatchCount={setWatchCount} setRepoId={setRepoId}/> }
     {currentRepo && <IssuesPage login={activeUser} currentRepo={currentRepo} starsCount={starsCount} watchCount={watchCount} userName={userName} setOpen={setOpen}/>}
     <BasicModal setOpen={setOpen} open={open} repoId={repoId}/>
    </div>
  );
}

export default App;

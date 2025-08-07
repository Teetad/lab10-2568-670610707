import { UserCard } from "../components/UserCard";
import { cleanUser } from "../libs/CleanUser";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function RandomUserPage() {
  const [users, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState(1);
  const [first,setFirst] = useState(true);
  const [zero,setZero] = useState(false);
  useEffect(() => {
    if (first){
      setFirst(false)
      return;
    }
    const saved = JSON.stringify(genAmount);
    localStorage.setItem("key",saved);
  }, [genAmount]);
  
  useEffect(() => {
    const saved = localStorage.getItem("key");
    if(saved == null)return;
    const loaded = JSON.parse(saved);
    setGenAmount(loaded);
  }, []);
  
  
  const generateBtnOnClick = async () => {
    setIsLoading(true);
    if(genAmount <= 0){
      setZero(false);
      setIsLoading(false);
      return;
    }else{
      setZero(true);
    }
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const users = resp.data.results;
    //Your code here
    //Process result from api response with map function. Tips use function from /src/libs/CleanUser
    const cleanuser = users.map((users : any) => cleanUser(users))
    //Then update state with function : setUsers(...)
    setUsers(cleanuser);
    setIsLoading(false);
  };

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(event: any) => setGenAmount(event.target.value)}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && zero &&(
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {users && !isLoading && users.map((a : any) => <UserCard name = {a.name} email = {a.email} imgUrl={a.imgUrl} address={a.address}/>)}
    </div>
  );
}

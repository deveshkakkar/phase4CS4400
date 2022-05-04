import React, {useState} from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";


function CreateCorp() {
  const [corpID,setcorpID] = useState("");
  const [name,setName] = useState("");
  const [shortName,setShortName] = useState("");
  const [resAssets,setResAssets] = useState("");
  
  const submitPost = () => {
    Axios.post('http://localhost:3002/api/create', {corpId: corpID, name: name, shortName:shortName, resAssets:resAssets}).then((response) => {
      alert(JSON.stringify(response.data))

    }
  return (
    <div class="p-3">
      <form>
      <label class="p-2">
        Corporation ID:
        <input class="m-1" type="text" name="corpId"  onChange={(e)=> {
                    setcorpID(e.target.value)
                }}/>
      </label>
      <br></br>
      <label class="p-2">
        Long Name:
        <input class="m-1" type="text" name="lname" onChange={(e)=> {
                    setName(e.target.value)
                }}/>
      </label>
      <br></br>
      <label class="p-2">
        Short Name:
        <input class="m-1" type="text" name="sname" onChange={(e)=> {
                    setShortName(e.target.value)
                }} />
      </label>
      <br></br>
      <label class="p-2">
        Reserved Assets:
        <input class="m-1" type="number" name="resAssets" onChange={(e)=> {
                    setResAssets(e.target.valueAsNumber)
                }}/>
      </label>
      <br></br>
      <input class="m-1" type="submit" value="Create" onClick={submitPost}/>
      <button
        type="button"
        class="m-3"
        onClick={() => {
          Axios.post('http://localhost:3002/api/create', {corpId: corpID, name: name, shortName:shortName, resAssets:resAssets}).then((response) => {
      if (response.data.affectedRows == 0 || response.data.affectedRows == undefined) {
        alert("it didn't work!")
      } else {
        alert("it did work!")
      }
            })
        }}
      >
        Submit
      </button>
      <NavLink className="nav-link" to="/" style = {{float: "left"}}>
                <button type="button" class="button"> 
                    <span class="button__text">Back</span>
                </button>
                </NavLink>
      </form>
    </div>
  );
}

export default CreateCorp;

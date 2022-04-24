import React, {useState} from "react";
import Axios from "axios";



function About() {
  const [corpID,setcorpID] = useState("");
  const [name,setName] = useState("");
  const [shortName,setShortName] = useState("");
  const [resAssets,setResAssets] = useState("");
  
  const submitPost = () => {
    Axios.post('http://localhost:3002/api/create', {corpId: corpID, name: name, shortName:shortName, resAssets:resAssets})
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
      <input class="m-1" type="submit" value="Cancel" />
      </form>
    </div>
  );
}

export default About;

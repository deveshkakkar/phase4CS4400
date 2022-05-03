import React, {useEffect, useState} from "react";
import Axios from "axios";





const DisplayAccStat = () => {

    const [data, setData] = useState([]);
    useEffect(()=>{LikePost()},[])

    const LikePost = () => {
        Axios.get(`http://localhost:3002/api/getAccStat`).then((response)=>{ console.log(response.data)
        return response.data
        }).then((data)=>{setData(data)})
    }

    const DisplayData=data.map(
        (data)=>{
            return(
                <tr>
                    <td>{data.name_of_bank}</td>
                    <td>{data.account_identifier}</td>
                    <td>{data.account_assets}</td>
                    <td>{data.number_of_owners}</td>
                </tr>
            )
        }
    )
  
  return (
    <div>
        <table class="table table-striped">
                <thead>
                    <tr>
                    <th>Bank</th>
                    <th>Account ID</th>
                    <th>Account Balance ($)</th>
                    <th>Number of Owners</th>
                    </tr>
                </thead>
                <tbody>
                 
                    
                    {DisplayData}
                    
                </tbody>
            </table>
    </div>
  );
}

export default DisplayAccStat;
import React, {useEffect, useState} from "react";
import Axios from "axios";





const DisplayCorpStat = () => {

    const [data, setData] = useState([]);
    useEffect(()=>{LikePost()},[])

    const LikePost = () => {
        Axios.get(`http://localhost:3002/api/getCorpStat`).then((response)=>{ console.log(response.data)
        return response.data
        }).then((data)=>{setData(data)})
    }

    const DisplayData=data.map(
        (data)=>{
            return(
                <tr>
                    <td>{data.corporation_identifier}</td>
                    <td>{data.short_name}</td>
                    <td>{data.formal_name}</td>
                    <td>{data.number_of_banks}</td>
                    <td>{data.corporation_assets}</td>
                    <td>{data.total_assets}</td>
                </tr>
            )
        }
    )
  
  return (
    <div>
        <table class="table table-striped">
                <thead>
                    <tr>
                    <th>Corporation ID</th>
                    <th>Short Name</th>
                    <th>Formal Name</th>
                    <th>Number of Banks</th>
                    <th>Corporation Assets ($)</th>
                    <th>Total Assets ($)</th>
                    </tr>
                </thead>
                <tbody>
                 
                    
                    {DisplayData}
                    
                </tbody>
            </table>
    </div>
  );
}

export default DisplayCorpStat;
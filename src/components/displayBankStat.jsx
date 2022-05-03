import React, {useEffect, useState} from "react";
import Axios from "axios";





const DisplayBankStat = () => {

    const [data, setData] = useState([]);
    useEffect(()=>{LikePost()},[])

    const LikePost = () => {
        Axios.get(`http://localhost:3002/api/getBankStat`).then((response)=>{ console.log(response.data)
        return response.data
        }).then((data)=>{setData(data)})
    }

    const DisplayData=data.map(
        (data)=>{
            return(
                <tr>
                    <td>{data.bank_identifier}</td>
                    <td>{data.name_of_corporation}</td>
                    <td>{data.name_of_bank}</td>
                    <td>{data.street}</td>
                    <td>{data.city}</td>
                    <td>{data.state}</td>
                    <td>{data.zip}</td>
                    <td>{data.number_of_accounts}</td>
                    <td>{data.bank_assets}</td>
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
                    <th>Bank ID</th>
                    <th>Corporation Name</th>
                    <th>Bank Name</th>
                    <th>Street</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Number of Accounts</th>
                    <th>Bank Assets ($)</th>
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

export default DisplayBankStat;
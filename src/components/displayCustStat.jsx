import React, {useEffect, useState} from "react";
import Axios from "axios";





const DisplayCustStat = () => {

    const [data, setData] = useState([]);
    useEffect(()=>{LikePost()},[])

    const LikePost = () => {
        Axios.get(`http://localhost:3002/api/getCustStat`).then((response)=>{ console.log(response.data)
        return response.data
        }).then((data)=>{setData(data)})
    }

    const DisplayData=data.map(
        (data)=>{
            return(
                <tr>
                    <td>{data.person_identifier}</td>
                    <td>{data.tax_identifier}</td>
                    <td>{data.customer_name}</td>
                    <td>{data.date_of_birth}</td>
                    <td>{data.joined_system}</td>
                    <td>{data.street}</td>
                    <td>{data.city}</td>
                    <td>{data.state}</td>
                    <td>{data.zip}</td>
                    <td>{data.number_of_accounts}</td>
                    <td>{data.customer_assets}</td>
                </tr>
            )
        }
    )
  
  return (
    <div>
        <table class="table table-striped">
                <thead>
                    <tr>
                    <th>Customer ID</th>
                    <th>Tax ID</th>
                    <th>Customer Name</th>
                    <th>Date of Birth</th>
                    <th>Joined Date</th>
                    <th>Street</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Number of Accounts</th>
                    <th>Customer Assets ($)</th>
                    </tr>
                </thead>
                <tbody>
                 
                    
                    {DisplayData}
                    
                </tbody>
            </table>
    </div>
  );
}

export default DisplayCustStat;
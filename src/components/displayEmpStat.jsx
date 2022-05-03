import React, {useEffect, useState} from "react";
import Axios from "axios";





const DisplayEmpStat = () => {

    const [data, setData] = useState([]);
    useEffect(()=>{LikePost()},[])

    const LikePost = () => {
        Axios.get(`http://localhost:3002/api/getEmpStat`).then((response)=>{ console.log(response.data)
        return response.data
        }).then((data)=>{setData(data)})
    }

    const DisplayData=data.map(
        (data)=>{
            return(
                <tr>
                    <td>{data.perID}</td>
                    <td>{data.tax_identifier}</td>
                    <td>{data.EmpName}</td>
                    <td>{data.date_of_birth}</td>
                    <td>{data.joined_system}</td>
                    <td>{data.street}</td>
                    <td>{data.city}</td>
                    <td>{data.state}</td>
                    <td>{data.zip}</td>
                    <td>{data.num}</td>
                    <td>{data.bank_assets}</td>
                </tr>
            )
        }
    )
  
  return (
    <div>
        <table class="table table-striped">
                <thead>
                    <tr>
                    <th>Per ID</th>
                    <th>Tax ID </th>
                    <th>Name</th>
                    <th>DOB</th>
                    <th>Date Joined</th>
                    <th>Street</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Number of Banks</th>
                    <th>Bank Assets</th>
                    </tr>
                </thead>
                <tbody>
                 
                    
                    {DisplayData}
                    
                </tbody>
            </table>
    </div>
  );
}

export default DisplayEmpStat;
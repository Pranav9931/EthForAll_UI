import React, { useEffect } from 'react'
import { Loader } from '../assets';

import { useStateContext } from '../context'
const Employee = () => {

    const [navTitle, setNavTitle, address, contract, connect, getTransactions, getEmployees] = useStateContext();

    const [employee, setEmployee] = React.useState([] as any);
    const [isLoading, setIsLoading] = React.useState(false);


    const fetchEmployee = async () => {
        setIsLoading(true);
        const data = await getEmployees();
        // console.log(data)
        setEmployee(() => data);
        setIsLoading(false);
    }

    useEffect(() => {
        if (contract) fetchEmployee();
        fetchEmployee();
    }, [address, contract])
    return (
        <div className="transactions-table">
            {employee.length < 1 ?
                <div className="loader-container">
                    <img src={Loader} />
                </div>
                :
                <table>
                    <thead className='tHead'>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Salary</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>

                        {employee.map((item: any, idx = 0) => {
                            return (
                                <tr key={idx}>
                                    <td>{item.name}</td>
                                    <td>{`${(item.address).slice(0, 4)}...${(item.address).slice(-3,)}`}</td>
                                    <td>{item.salary} MATIC</td>
                                    <td>{item.department}</td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            }
        </div>
    )
}

export default Employee
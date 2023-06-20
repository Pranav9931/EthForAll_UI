import { utils, ethers } from 'ethers';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Loader } from '../assets';

import { useStateContext } from '../context'

const Payroll = () => {

    const [navTitle, setNavTitle, address, contract, connect, getTransactions, getEmployees, payrollEmployee] = useStateContext();

    const [employee, setEmployee] = React.useState([] as any);
    const [isLoading, setIsLoading] = React.useState(false);
    const [totalOutstandingAmount, setTotalOutstandingAmount] = React.useState(0);

    const navigate = useNavigate();

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

    useEffect(() => {
        let amount = 0;
        if (employee.length > 0) {
            for (let emp of employee) {
                // Convert the `uint256` value to a Unix timestamp in seconds
                const timestampInSeconds = ethers.BigNumber.from(emp.actualStartTime).div(1).toNumber();
                const currentTimeInSeconds = Math.floor(Date.now() / 1000);
                console.log(currentTimeInSeconds - timestampInSeconds)
                if (currentTimeInSeconds - timestampInSeconds >= emp.vestingPeriod)
                    amount += Number(emp.salary);
            }
        }
        setTotalOutstandingAmount(() => amount);

    }, [employee])

    const handleClick = async (amount: string) => {
        if (address) {
            const data = await payrollEmployee(amount);
            navigate("../transactions/success");
        }
        else {
            alert("Connect to wallet first.")
            navigate("../transactions/failed");
        }
    }



    return (

        <div className="payroll-container">
            <div className="payroll-main-frame">
                <span style={{ opacity: '0.4' }}>Total Outstanding Amount</span>
                <br />
                {employee.length < 1 ?
                    <center>
                        <div className="loader-container" style={{ marginTop: '-20px' }}>
                            <img src={Loader} />
                        </div>
                    </center>
                    :
                    <span className="payroll-title">{totalOutstandingAmount.toString().slice(0, 4)} MATIC</span>
                }
                <br />
                <button className="btn-connect" style={{ width: '100%', height: '50px' }} onClick={() => handleClick(`${totalOutstandingAmount}`)} disabled={isLoading}>Pay Employees</button>
            </div>
        </div>
    )
}

export default Payroll
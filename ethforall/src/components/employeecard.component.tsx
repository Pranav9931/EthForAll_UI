import { ethers } from 'ethers';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';

const EmployeeCard = ({ obj }: any) => {

    const [navTitle, setNavTitle, address, contract, connect, getTransactions, getEmployees, payrollEmployee, payEmployee] = useStateContext();

    const navigate = useNavigate();

    const condensedAddress = `${obj.address.slice(0, 3)}...${obj.address.slice(-7,)}`;

    const timestampInSeconds = ethers.BigNumber.from(obj.actualStartTime).div(1).toNumber();
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const vestingPeriodSeconds = obj.vestingPeriod;
    const isVested = currentTimeInSeconds >= timestampInSeconds + vestingPeriodSeconds;

    const handleClick = async (pId: number, salary: string) => {
        try {
            const data = await payEmployee(pId, salary);
            console.log(data);
            navigate("../transactions/success");


        } catch (err) {
            console.log(err);
            navigate("../transactions/failed");
        }
    }

    return (
        <div className="employee-card">
            <img src={obj.employeeAvatar} />
            <div className="employee-details">
                <div style={{ fontSize: '.9em' }}>
                    <span className="page-title">Name</span>
                    <div className='detail-box' >
                        {obj.name}
                    </div>
                </div>
                <div style={{ fontSize: '.9em' }} className="card-bottom-wrapper">
                    <div>
                        <span className="page-title">Address</span>
                        <div className='detail-box' >
                            {condensedAddress}
                        </div>
                    </div>
                    <div>
                        <span className="page-title">Salary</span>
                        <div className='detail-box' >
                            {obj.salary} MATIC
                        </div>
                    </div>
                    <div>
                        <span className="page-title">Vesting Period</span>
                        <div className='detail-box' >
                            {obj.vestingPeriod} Seconds
                        </div>
                    </div>
                </div>

            </div>
            <div className="employee-details-rev">
                <div style={{ fontSize: '.9em' }}>
                    <span className="page-title">Vesting Status</span>
                    <div className={`${isVested ? "success" : "warning"}`} >
                        {isVested ? "Vested" : "Not Vested"}
                    </div>
                </div>

            </div>
            <div className='btn-abs'>
                <button className="btn-connect" disabled={!isVested} onClick={() => handleClick(obj.pid, obj.salary)}>Pay Now</button>
            </div>

        </div>
    )
}

export default EmployeeCard
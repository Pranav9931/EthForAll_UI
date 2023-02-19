import React, { useEffect } from 'react'
import { Loader, PolygonScan } from '../assets';
import { Employee, EmployeeCard, Payroll, TransactionGraph, Transactions } from '../components';
import Dashboardcard from '../components/dashboardcard.component';
import "./employee.css";

import { useStateContext } from '../context';
const EmployeePage = () => {

    const [navTitle, setNavTitle, address, contract, connect, getTransactions, getEmployees] = useStateContext();

    const [employee, setEmployee] = React.useState([] as any);
    const [isLoading, setIsLoading] = React.useState(false);


    const fetchEmployee = async () => {
        setIsLoading(true);
        let data = await getEmployees();
        // console.log(data)
        setEmployee(() => data);
        setIsLoading(false);
    }

    useEffect(() => {
        if (contract) fetchEmployee();
        fetchEmployee();
    }, [address, contract])


    useEffect(() => {
        document.title = "Employees | ETHforAll";
        setNavTitle(() => "Employees Details");
    }, [])


    return (
        <div className="dashboard-container flex gap-10">
            <div className="main-dashboard-items">
                <span className="page-title">Employees</span>
                <div className="employee-wrapper">
                    {employee.length < 1
                        ?
                        <center>
                            <div className="loader-container" style={{ marginTop: '-20px', width: '30vw', minHeight: '400px' }}>
                                <img src={Loader} />
                            </div>
                        </center>
                        :
                        employee.map((employee: any, idx = 0) => {
                            return (
                                <EmployeeCard obj={employee} />
                            )
                        })
                    }
                </div>

                <div className="flex jst-spc-btw al-cnt mr-tp-20">
                    <span className="page-title">Recent Transactions</span>
                    <span style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }} onClick={() => { }}>
                        <img src={PolygonScan} className="arrow-icon" alt="polygonscan_logo" /></span>
                </div>
                <div className="transactions-details">
                    <Transactions filterType="Salary" />
                </div>
                <center>
                    <span className="load-more-btn">Load More</span>
                </center>
            </div>

            <div className="dashboard-sidebar">
                <div className="transactions-graph-container">
                    {/* <span className="sidebar-span">Payroll</span> */}
                    <Payroll />
                </div>
                <div className="transactions-employee-container">
                    <span className="sidebar-span">Employee Data</span>

                    <Employee />

                </div>
            </div>

        </div>
    )
}

export default EmployeePage
import React, { useEffect, useState } from 'react'

import "./dashboard.css";

import { useStateContext } from '../context'
import Dashboardcard from '../components/dashboardcard.component';

import { DevIcon, OperationsIcon, MarketingIcon, BusinessIcon, WalletIcon, RightArrowIcon, PolygonLogo, PolygonScan } from '../assets';
import { Employee, TransactionGraph, Transactions } from '../components';

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [navTitle, setNavTitle, address, contract, connect] = useStateContext();

    const navigate = useNavigate();

    let addr = !address ? "0x000...000" : `${address.slice(0, 3)}...${address.slice(-5,)}`;

    useEffect(() => {
        document.title = "Dashboard | EthForAll"
    }, []);

    setNavTitle(() => "Dashboard");

    const handleClick = () => {
        window.location.href = "https://mumbai.polygonscan.com/address/0x995e4619dc114687EB5B3259a0a373E06661217A";
    }

    return (
        <div className="dashboard-container flex gap-10">
            <div className="main-dashboard-items">
                <span className="page-title">Departments</span>
                <div className="department-wrapper">
                    <Dashboardcard background="linear-gradient(149deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 3%, rgba(24,216,255,1) 100%)" title="IT" amount="20.00" img={DevIcon} />
                    <Dashboardcard background="linear-gradient(149deg, rgba(214,223,193,1) 0%, rgba(201,238,215,1) 59%, rgba(190,251,234,1) 100%)" title="Business Dev" amount="04.02" img={BusinessIcon} />
                    <Dashboardcard background="linear-gradient(149deg, rgba(255,255,255,1) 0%, rgba(237,237,237,1) 5%, rgba(212,111,205,1) 100%)" title="Marketing" amount="10.03" img={MarketingIcon} />
                    <Dashboardcard background="linear-gradient(149deg, rgba(172,215,188,1) 0%, rgba(175,244,246,1) 100%)" title="Operations" amount="02.60" img={OperationsIcon} />
                </div>

                <span className="page-title">Account Details</span>
                <div className="account-details">
                    <div className="flex al-cnt jst-spc-ard flex-wrap">
                        <span className="wallet-icon">
                            <img src={WalletIcon} />
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className="page-title-sec op-5">ADDRESS</span>
                            <span style={{ marginTop: '10px' }}>{addr}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className="page-title-sec op-5">BALANCE</span>
                            <span style={{ marginTop: '10px' }}> 20.00 MATIC</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className="page-title-sec op-5">DESIGNATION</span>
                            <span style={{ marginTop: '10px' }}>CEO</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className="page-title-sec op-5">EQUITY</span>
                            <span style={{ marginTop: '10px' }}>20%</span>
                        </div>
                    </div>
                </div>

                <div className="flex jst-spc-btw al-cnt mr-tp-20">
                    <span className="page-title">Recent Transactions</span>
                    <span style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }} onClick={() => handleClick()}>
                        <img src={PolygonScan} className="arrow-icon" alt="polygonscan_logo" /></span>
                </div>
                <div className="transactions-details">
                    <Transactions filterType="" />
                </div>
                <center>
                    <span className="load-more-btn">Load More</span>
                </center>
            </div>
            <div className="dashboard-sidebar">
                <div className="transactions-graph-container">
                    <span className="sidebar-span">Transactions</span>
                    <TransactionGraph />
                </div>
                <div className="transactions-employee-container">
                    <span className="sidebar-span">Employee Data</span>

                    <Employee />

                </div>
            </div>
        </div>
    )
}

export default Dashboard;
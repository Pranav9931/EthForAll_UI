import React from 'react'
import "./sidebar.component.css"
import { DashboardIcon, EmployeesIcon, MilestoneIcon, PaymentsIcon, PolygonLogo, ProfileIcon, SettingsIcon } from "../assets/index";
import { useNavigate } from 'react-router-dom';
function Sidebar() {
    const navigate = useNavigate();
    function handleClick(url: string) {
        navigate(`../${url}`);
        // Do nothing.
    }
    return (
        <div className="sidebarContainer">
            <span className="logo-container">
                <img src={PolygonLogo} alt="ethforall-x-polygon-logo" />
            </span>
            <div className="list-items-container">
                <li onClick={() => handleClick("/")}><span>
                    <img src={DashboardIcon} alt="dashboard-icon" />
                </span>Dashboard</li>

                <li onClick={() => handleClick("/employee")}><span>
                    <img src={EmployeesIcon} alt="employee-icon" />
                </span>Employees</li>

                <li onClick={() => handleClick("/milestones")}><span>
                    <img src={MilestoneIcon} alt="milestones-icon" />
                </span>Milestones</li>

                <li onClick={() => handleClick("/transactions")}><span>
                    <img src={PaymentsIcon} alt="payments-icon" />
                </span>Transactions</li>

                <li onClick={() => handleClick("/profile")}><span>
                    <img src={ProfileIcon} alt="profile-icon" />
                </span>Profile</li>

                <li onClick={() => handleClick("/")}><span>
                    <img src={SettingsIcon} alt="settings-icon" />
                </span>Settings</li>


            </div>
        </div>
    )
}

export default Sidebar
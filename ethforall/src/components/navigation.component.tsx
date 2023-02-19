import React, { useEffect } from 'react'
import "./navigationbar.component.css"
import { useStateContext } from '../context'
import { SearchIcon, UserAvatar } from '../assets';


const NavigationBar = () => {
    const [navTitle, setNavTitle, address, contract, connect] = useStateContext();
    const [isClicked, setIsClicked] = React.useState(false);


    // console.log(navTitle);
    // const condensedAddress = `${address.slice(0, 3)}...${address.slice(-3,)}`;
    const ProfileArea = () => {
        return (
            (!address) ?
                <button className="btn-connect" onClick={() => connect()}>Connect</button>
                :
                <div className="profile-section">
                    <img src={UserAvatar} />
                    <div className="profile-desc">
                        <span style={{ fontWeight: 700 }}>ADDRESS</span>
                        {`${address.slice(0, 3)}...${address.slice(-3,)}`}
                    </div>
                </div>
        )
    }

    return (
        <div className="navigationbar-container">
            <span className="nav-title">
                {navTitle}
            </span>
            <div className="flex al-cnt gap-10">
                <form onSubmit={(e) => e.preventDefault} className="searchForm" autoComplete='off'>
                    <img src={SearchIcon} />
                    <input type="search" name="search" className="searchField" placeholder="search employee, transactions.." />
                </form>
                {ProfileArea()}

            </div>
        </div>
    )
}

export default NavigationBar
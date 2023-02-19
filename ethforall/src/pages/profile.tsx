import React, { useEffect, useState } from 'react'
import { PolygonLogo } from '../assets';
import { useDisconnect } from '@thirdweb-dev/react';

import "./profile.css";

import { useStateContext } from '../context'

interface DataType {
    personalInformation: {
        name: {
            first: string,
            last: string
        },
        address: {
            city: string,
            state: string,
            street: string,
            zipCode: string
        },
        age: number,
        email: string,
        phoneNumber: string,
        walletAddress: string
    },
    professionalInformation: {
        department: string,
        employeeId: number,
        hireDate: string,
        isAdmin: boolean,
        position: string,
        salary: string
    },
    emergencyContact: {
        email: string,
        name: {
            first: string,
            last: string
        },
        phoneNumber: string,
        relation: string
    }
}

const ProfilePage = () => {
    const [navTitle, setNavTitle, address, contract, connect] = useStateContext();
    const [isOwner, setIsOwner] = useState({} as any);
    const [ownerData, setOwnerData] = useState<DataType>(
        {
            personalInformation: {
                name: {
                    first: "",
                    last: ""
                },
                address: {
                    city: "",
                    state: "",
                    street: "",
                    zipCode: ""
                },
                age: 0,
                email: "",
                phoneNumber: "",
                walletAddress: ""
            },
            professionalInformation: {
                department: "",
                employeeId: 0,
                hireDate: "",
                isAdmin: false,
                position: "",
                salary: ""
            },
            emergencyContact: {
                email: "",
                name: {
                    first: "",
                    last: ""
                },
                phoneNumber: "",
                relation: ""
            }
        });

    useEffect(() => {
        document.title = "Profile | ETHForAll";
        setNavTitle("View Profile")
    }, [])
    const disconnect = useDisconnect();


    useEffect(() => {
        const getOwnerDetails = async () => {
            try {
                const data = await fetch("https://bafybeifvzmrqbr64fb5djfxli5rfaylkb2bj3dti3azr7mqr245lcg4sze.ipfs.w3s.link/new.json");
                const owner = await data.json();
                console.log(owner.personalInformation.walletAddress)
                setOwnerData(() => owner);
                console.log(ownerData);
            } catch (err) {
                console.log(err)
            }
        }
        getOwnerDetails();
    }, [])

    console.log(ownerData)

    return (
        <div className="profile-container">
            {
                address && ownerData.personalInformation.name.first.length > 0
                    ?
                    <div className='ProfileInfo'>
                        <div className="profile-section-owner">
                            <img src={PolygonLogo} />
                            <div className="profile-main-container">
                                <span className='page-title'>Owner Profile</span>
                                <div className='info-wrapper'>
                                    <div className='info-field'>
                                        <span style={{ fontWeight: 600 }}>
                                            First Name
                                        </span>
                                        <div className="detail-box">
                                            {ownerData.personalInformation.name.first}
                                        </div>
                                    </div>

                                    <div className='info-field'>
                                        <span style={{ fontWeight: 600 }}>
                                            Last Name
                                        </span>
                                        <div className="detail-box">
                                            {ownerData.personalInformation.name.last}
                                        </div>
                                    </div>

                                </div>

                                <div className='info-wrapper'>
                                    <div className='info-field'>
                                        <span style={{ fontWeight: 600 }}>
                                            Wallet Address
                                        </span>
                                        <div className="detail-box">
                                            {ownerData.personalInformation.walletAddress}
                                        </div>
                                    </div>

                                </div>

                                <div className='info-wrapper'>
                                    <div className='info-field'>
                                        <span style={{ fontWeight: 600 }}>
                                            Email
                                        </span>
                                        <div className="detail-box">
                                            {ownerData.personalInformation.email}
                                        </div>
                                    </div>
                                    <div className='info-field'>
                                        <span style={{ fontWeight: 600 }}>
                                            Phone
                                        </span>
                                        <div className="detail-box">
                                            {ownerData.personalInformation.phoneNumber}
                                        </div>
                                    </div>

                                </div>
                                <button className="btn-connect" onClick={() => disconnect()}>Disconnect</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="without-profile">
                        <img src={PolygonLogo} />
                        <span style={{ opacity: '0.3', fontSize: '12px' }}>You have not connected your wallet yet.</span>
                        <button className='btn-connect' onClick={() => connect()}>Connect</button>
                    </div>
            }
        </div>
    )
}

export default ProfilePage
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TransactionDecline } from '../assets'

const TransactionFailed = () => {
    const navigate = useNavigate()
    return (
        <div className="transaction-success-msg-container">
            <div className="msg-container">
                <img src={TransactionDecline} />
                <span style={{ padding: '10px', background: "#dc354510", color: '#dc3545', borderRadius: '5px' }}>Oops! Something Went Wrong!</span>
                <button className='btn-connect' onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </div>
    )
}

export default TransactionFailed
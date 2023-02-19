import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TransactionPlane } from '../assets'

const TransactionSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className="transaction-success-msg-container">
            <div className="msg-container">
                <img src={TransactionPlane} />
                <span style={{ padding: '10px', background: "#28a74510", color: '#28a745', borderRadius: '5px' }}>Congratulations! Your Transaction was successful!</span>
                <button className='btn-connect' onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </div>
    )
}

export default TransactionSuccess
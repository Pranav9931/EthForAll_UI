import React from 'react'

type obj = {
    background: string,
    title: string,
    amount: string,
    img: string
}

const Dashboardcard = ({ background, title, amount, img }: obj) => {
    return (
        <div className="department-content" style={{ background: background }}>
            <div className="flex gap-10 al-cnt">
                <span className='content-img'><img src={img} /></span>
                <span className="content-title">
                    {title}
                </span>
            </div>
            <span className="amount-balance">
                {amount}
                <span style={{ fontSize: '0.4em' }}> MATIC</span>
            </span>
        </div>
    )
}

export default Dashboardcard
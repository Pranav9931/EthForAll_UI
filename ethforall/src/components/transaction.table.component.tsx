import React, { useContext, useEffect, useState } from 'react'
import "./transaction.table.component.css";

import { useStateContext } from '../context';
import { Loader, ProfileIcon } from '../assets';

type typeOfProp = {
    filterType: string
}

const Transactions = ({ filterType }: typeOfProp) => {
    const [navTitle, setNavTitle, address, contract, connect, getTransactions] = useStateContext();
    const [transactions, setTransactions] = useState([] as any);
    const [isLoading, setIsLoading] = useState(false);
    const fetchTransactions = async () => {
        setIsLoading(true);
        let data = await getTransactions();
        if (filterType.length > 0) {
            data = data.filter((item: any) => item.type === filterType)
        }
        setTransactions(() => data.reverse());
        setIsLoading(false);
    }
    useEffect(() => {
        if (contract) fetchTransactions();
    }, [contract, address])

    return (
        <div className="transactions-table">
            {transactions.length < 1 ?
                <div className="loader-container">
                    <img src={Loader} />
                </div>
                :
                <table>
                    <thead className='tHead'>
                        <tr>
                            <th>Paid To</th>
                            <th>Paid From</th>
                            <th>Total Amount</th>
                            <th>Timestamp</th>
                            <th>Payment Type</th>
                        </tr>
                    </thead>
                    <tbody>

                        {transactions.map((item: any, idx = 0) => {
                            return (
                                <tr key={idx}>
                                    <td>{`${(item.to).slice(0, 4)}...${(item.to).slice(-3,)}`}</td>
                                    <td>{`${(item.from).slice(0, 4)}...${(item.from).slice(-3,)}`}</td>
                                    <td>{item.amount} MATIC</td>
                                    <td>{item.time}</td>
                                    <td>{item.type}</td>
                                </tr>
                            );
                            idx++;
                        })}

                    </tbody>
                </table>
            }

        </div>
    )
}

export default Transactions
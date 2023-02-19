import React, { createContext, ReactNode, useContext } from 'react';

import { useAddress, useContract, useContractRead, useMetamask, useBalance, useContractWrite } from "@thirdweb-dev/react";

import { ethers, utils } from 'ethers';

const StateContext = createContext({} as any);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
    // state logic here

    const { contract, error }: any = useContract("0x995e4619dc114687EB5B3259a0a373E06661217A");
    const address = useAddress();
    const connect = useMetamask();

    const [navTitle, setNavTitle] = React.useState("Overview");
    // Functions
    const getTransactions = async () => {
        let allTransaction = [];
        try {
            const transactions = await contract.call('getAllTransactions');
            allTransaction = transactions.map((i: any) => {
                const timestamp = new Date(i.time.toNumber() * 1000).toLocaleString();
                return (
                    {
                        to: i.to,
                        from: i.from,
                        time: timestamp,
                        amount: utils.formatEther(i.amount),
                        type: i.typeOfTransaction,
                        desc: i.description
                    }
                );
            });

        } catch (err) {
            console.error(err);
        }
        return allTransaction;
    }

    const getMilestones = async () => {
        let allMilestones = [];
        try {
            const milestones = await contract.call('allMilestone');
            allMilestones = milestones.map((i: any, _idx = 0) => {
                // const timestamp = new Date(i.time.toNumber() * 1000).toLocaleString();
                return (
                    {
                        creator: i[0],
                        amount: utils.formatEther(i[1]),
                        department: i[2],
                        desc: i[3],
                        mId: _idx
                    }
                );
            });
            allMilestones = allMilestones.filter((item: any) => item.creator != "0x0000000000000000000000000000000000000000");
        } catch (err) {
            console.error(err);
        }
        return allMilestones;
    }

    const getEmployees = async () => {
        let allEmployees = [];
        try {
            const employees = await contract.call('getAllEmployees');
            // console.log(employees);
            allEmployees = employees.map((emp: any, i: 0) => {
                // console.log(emp);
                return (
                    {
                        address: emp.employeeAddress,
                        name: emp.fName + " " + emp.lName,
                        salary: utils.formatEther(emp.salary),
                        vestingPeriod: emp.vestingPeriod.toNumber(),
                        employeeAvatar: emp.employeeAvatar,
                        isVested: emp.isVested,
                        startTime: new Date(emp.startTime.toNumber() * 1000).toLocaleString(),
                        actualStartTime: emp.startTime,
                        vestedAmount: utils.formatEther(emp.vestedAmount),
                        department: emp.department,
                        pid: i
                    }
                )
            })
        } catch (err) {
            console.error(err);
        }
        return allEmployees;
    }

    // const { mutateAsync: payroll, isLoading } = useContractWrite(contract, "payroll");

    const payrollEmployee = async (amount: any) => {
        try {
            const data = contract.call('payroll', {
                value: ethers.utils.parseEther(amount)
            });
            console.info("contract call successs", data);
            return data;
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const payEmployee = async (pId: number, amount: any) => {
        try {
            const data = contract.call('payEmployee', pId, {
                value: ethers.utils.parseEther(amount)
            });
            console.info("contract call successs", data);
            return data;
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const payMilestone = async (mId: number, amount: any) => {
        try {
            const data = contract.call('payMilestone', mId, {
                value: ethers.utils.parseEther(amount)
            });
            console.info("contract call successs", data);
            return data;
        } catch (err) {
            console.error("contract call failure", err);
        }
    }
    /*
        const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', pId, {
      value: ethers.utils.parseEther(amount)
    });

    return data;
  }
    */


    return (
        <StateContext.Provider value={
            [
                navTitle,
                setNavTitle,
                address,
                contract,
                connect,
                getTransactions,
                getEmployees,
                payrollEmployee,
                payEmployee,
                getMilestones,
                payMilestone
            ]}>
            {children}
        </StateContext.Provider>
    );
};


export const useStateContext = () => useContext(StateContext);
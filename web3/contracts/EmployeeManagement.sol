// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract EmployeeManagement {
    // Define the Transaction struct
    struct Transaction {
        address to;
        address from;
        uint256 time;
        uint256 amount;
        string typeOfTransaction;
        string description;
    }

    struct Milestone {
        address from;
        uint256 amount;
        string department;
        string reason;
    }

    // Define the Employee struct
    struct Employee {
        address employeeAddress;
        string fName;
        string lName;
        uint256 salary;
        uint256 vestingPeriod;
        string employeeAvatar;
        bool isVested;
        uint256 startTime;
        uint256 vestedAmount;
        string department;
        uint256[] performanceScore;
    }

    // Define global variables
    uint256 public numberOfEmployees = 0;
    uint256 public numberOfTransactions = 0;
    uint256 public numberOfMilestones = 0;
    uint256 public totalBalance;
    address public companyOwner;
    uint256 public itBudget;
    uint256 public marketingBudget;
    uint256 public businessDevBudget;
    uint256 public operationsBudget;

    // Mappings
    mapping(uint256 => Employee) public employee;
    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => Milestone) public milestones;

    // Define events
    event AddEmployee(
        address employeeAddress,
        string fName,
        string lName,
        uint256 salary,
        uint256 vestingPeriod,
        string employeeAvatar,
        bool isVested,
        uint256 startTime,
        string department,
        uint256[] performanceScore
    );
    event DelEmployee(address employeeAddress);
    event Payment(address employeeAddress, uint256 amount);
    event PerformanceScore(address employeeAddress, uint256 score);

    // Define the constructor
    constructor() {
        companyOwner = msg.sender;
        totalBalance = address(msg.sender).balance;
        itBudget = (totalBalance * 50) / 100;
        businessDevBudget = (totalBalance - itBudget) / 3;
        operationsBudget = (totalBalance - itBudget) / 3;
        marketingBudget = (totalBalance - itBudget) / 3;
    }

    function addEmployee(
        address _employeeAddress,
        string memory _fName,
        string memory _lName,
        uint256 _salary,
        uint256 _vestingPeriod,
        string memory _employeeAvatar,
        string memory _department,
        uint256 _performanceScore
    ) public returns (uint256) {
        require(
            _employeeAddress != companyOwner,
            "Owner can't be the employee"
        );

        Employee storage newEmployee = employee[numberOfEmployees];

        newEmployee.employeeAddress = _employeeAddress;
        newEmployee.fName = _fName;
        newEmployee.lName = _lName;
        newEmployee.salary = _salary;
        newEmployee.vestingPeriod = _vestingPeriod;
        newEmployee.employeeAvatar = _employeeAvatar;
        newEmployee.isVested = false;
        newEmployee.startTime = block.timestamp;
        newEmployee.department = _department;
        newEmployee.performanceScore.push(_performanceScore);

        numberOfEmployees++;

        // Store the addEmployee transaction into the logs
        emit AddEmployee(
            _employeeAddress,
            _fName,
            _lName,
            _salary,
            _vestingPeriod,
            _employeeAvatar,
            false,
            newEmployee.startTime,
            _department,
            newEmployee.performanceScore
        );

        return numberOfEmployees - 1;
    }

    function getAllEmployees() public view returns (Employee[] memory) {
        Employee[] memory allEmployees = new Employee[](numberOfEmployees);

        for (uint256 i = 0; i < numberOfEmployees; i++) {
            Employee storage item = employee[i];

            allEmployees[i] = item;
        }

        return allEmployees;
    }

    function payEmployee(uint256 _index) public payable {
        // Index the Employee
        Employee storage currentEmployee = employee[_index];

        // Calculate the currentTime
        uint256 currentTime = block.timestamp;
        require(msg.sender == companyOwner, "Only Owner can pay the employees");

        require(
            currentEmployee.employeeAddress != companyOwner,
            "Owner can't pay himself"
        );

        // Make sure that the employee's vestingPeriod is over and he/she should be paid anytime now
        require(
            currentTime - currentEmployee.startTime >=
                currentEmployee.vestingPeriod,
            "Employee's vesting period is not yet over"
        );

        // If the currentEmployee's vestingPeriod gets over
        currentEmployee.isVested = true;

        // Payment
        if (currentEmployee.isVested) {
            // address payable recipient = payable(currentEmployee.employeeAddress);

            // Check if money is there in the account or not?
            uint256 ownerBalance = companyOwner.balance;
            require(
                ownerBalance >= currentEmployee.salary,
                "Insufficient funds"
            );

            // Check if the payment is done.
            bool success;
            (success, ) = currentEmployee.employeeAddress.call{
                value: currentEmployee.salary
            }("");
            require(success, "Transfer failed.");

            currentEmployee.vestedAmount =
                currentEmployee.vestedAmount +
                currentEmployee.salary;

            // Set the payment Cycle.
            currentEmployee.startTime =
                currentEmployee.startTime +
                currentEmployee.vestingPeriod;

            // Update the Transactions log
            Transaction storage newTransaction = transactions[
                numberOfTransactions
            ];
            newTransaction.to = currentEmployee.employeeAddress;
            newTransaction.from = companyOwner;
            newTransaction.time = block.timestamp;
            newTransaction.amount = currentEmployee.salary;
            newTransaction.typeOfTransaction = "Salary";
            newTransaction
                .description = "Salary is paid to the employee post vesting period gets over";
            numberOfTransactions++;

            emit Payment(
                currentEmployee.employeeAddress,
                currentEmployee.salary
            );
            currentEmployee.isVested = false;
        } else {
            currentEmployee.isVested = false;
        }
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        Transaction[] memory allTransactions = new Transaction[](
            numberOfTransactions
        );

        for (uint256 i = 0; i < numberOfTransactions; i++) {
            Transaction storage item = transactions[i];

            allTransactions[i] = item;
        }

        return allTransactions;
    }

    function payroll() public payable {
        for (uint256 i = 0; i < numberOfEmployees; i++) {
            payEmployee(i);
        }
    }

    function updatePerformance(uint256 _idx, uint256 _score) public {
        Employee storage currEmployee = employee[_idx];
        currEmployee.performanceScore.push(_score);
    }

    function createMilestones(
        uint256 _idx,
        uint256 _amount,
        string memory _reason
    ) public returns (uint256) {
        Employee storage currEmployee = employee[_idx];

        Milestone storage newMilestone = milestones[numberOfMilestones];
        newMilestone.from = currEmployee.employeeAddress;
        newMilestone.amount = _amount;
        newMilestone.department = currEmployee.department;
        newMilestone.reason = _reason;

        numberOfMilestones++;

        return numberOfMilestones - 1;
    }

    function payMilestone(uint256 _idx) public payable {
        Milestone storage currMilestone = milestones[_idx];
        require(
            currMilestone.from != address(0),
            "The milestone doesn't exist."
        );
        // Check for the remaining balance
        uint256 ownerBalance = companyOwner.balance;
        require(ownerBalance >= currMilestone.amount, "Insufficient funds");

        bool sent;
        (sent, ) = currMilestone.from.call{value: currMilestone.amount}("");

        require(sent, "The milestone money couldn't be transferred.");

        // Update the Transactions log
        Transaction storage newTransaction = transactions[numberOfTransactions];
        newTransaction.to = currMilestone.from;
        newTransaction.from = companyOwner;
        newTransaction.time = block.timestamp;
        newTransaction.amount = currMilestone.amount;
        newTransaction.typeOfTransaction = "Milestone Payment";
        newTransaction.description = "Milestone payment is done.";
        numberOfTransactions++;

        emit Payment(currMilestone.from, currMilestone.amount);

        // Finally delete the milestone, once the payment is done.
        currMilestone.from = address(0);
    }

    function allMilestone() public view returns (Milestone[] memory) {
        Milestone[] memory allMilestones = new Milestone[](numberOfMilestones);

        for (uint256 i = 0; i < numberOfMilestones; i++) {
            Milestone storage item = milestones[i];

            allMilestones[i] = item;
        }

        return allMilestones;
    }
}

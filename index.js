import inquirer from "inquirer";
//bank account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        }
        else {
            console.log("Insufficent balance.");
        }
    }
    //Credit Money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fee charged if more then $100 is deposited
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }
    //check balance
    checkBalance() {
        console.log(`Current balance : $${this.balance}`);
    }
}
//customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//Create bank accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 5000),
    new BankAccount(1003, 2000),
];
// Create Customer
const Customers = [
    new Customer("Hamza", "Khan", "Male", 35, 3162245678, accounts[0]),
    new Customer("Hina", "Khan", "Female", 36, 3162244409, accounts[1]),
    new Customer("Rida", "Khan", "Female", 27, 3162248834, accounts[2]),
];
//Function to interact bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:",
        });
        const customer = Customers.find((customer) => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Wellcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
                },
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:",
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Deposit":
                    const WithdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:",
                    });
                    customer.account.deposit(WithdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program");
                    console.log("\n Thank you for using our bank services.");
                    return;
            }
        }
        else {
            console.log("Invalid account number . Please try again");
        }
    } while (true);
}
service();

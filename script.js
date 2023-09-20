document.addEventListener("DOMContentLoaded", () => {
    // Sample customer data
    const customers = [
        { id: 1, Name: "Manish",Email: "manish@gmail.com", Balance: 2000 },
        { id: 2, Name: "Shiva", Email: "shiva@gmail.com", Balance: 5900 },
        { id: 3, Name: "Ritesh",Email: "ritesh@gmail.com",  Balance: 4300 },
        { id: 4, Name: "Dheeraj",Email: "dheeraj@gmail.com",  Balance: 9000 },
        { id: 5, Name: "Nanda", Email: "nanda@gmail.com", Balance: 6000 },
        { id: 6, Name: "Amruth",Email: "amruth@gmail.com",  Balance: 8000 },
        { id: 7, Name: "Kishore", Email: "kishore@gmail.com", Balance: 3000 },
        { id: 8, Name: "Bhuvanesh", Email: "bhuvanesh@gmail.com", Balance: 7200 },
        { id: 9, Name: "Hemanth",Email: "hemanth@gmail.com",  Balance: 9330 },
        { id: 10, Name: "Arjun", Email: "arjun@gmail.com", Balance: 3970 },
    ];

    // Populate customer list
    const customerList = document.getElementById("customer-list");
    customers.forEach(customer => {
        const li = document.createElement("li");
        li.textContent = `${customer.Name} (Balance: $${customer.Balance})`;
        customerList.appendChild(li);

        // Add customers to transfer form
        const senderSelect = document.getElementById("sender");
        const receiverSelect = document.getElementById("receiver");
        senderSelect.innerHTML += `<option value="${customer.id}">${customer.Name}</option>`;
        receiverSelect.innerHTML += `<option value="${customer.id}">${customer.Name}</option>`;
    });

    // Handle transfer form submission
    const transferForm = document.getElementById("transfer-form");
    transferForm.addEventListener("submit", event => {
        event.preventDefault();
        const senderId = document.getElementById("sender").value;
        const receiverId = document.getElementById("receiver").value;
        const amount = parseFloat(document.getElementById("amount").value);

        // Validate and perform transfer (in a real app, you'd make an API request)
        if (amount <= 0 || isNaN(amount)) {
            alert("Invalid amount. Please enter a valid amount.");
            return;
        }

        // Update customer balances (in a real app, you'd update the database)
        const sender = customers.find(customer => customer.id === parseInt(senderId));
        const receiver = customers.find(customer => customer.id === parseInt(receiverId));

        if (sender.Balance < amount) {
            alert("Insufficient balance.");
            return;
        }

        sender.Balance -= amount;
        receiver.Balance += amount;

        // Display transfer in the history
        const transferHistory = document.getElementById("transfer-history");
        const li = document.createElement("li");
        li.textContent = `Transfer: $${amount} from ${sender.Name} to ${receiver.Name}`;
        transferHistory.appendChild(li);

        // Update customer list
        customerList.innerHTML = "";
        customers.forEach(customer => {
            const li = document.createElement("li");
            li.textContent = `${customer.Name} (Balance: $${customer.Balance})`;
            customerList.appendChild(li);
        });

        // Reset form
        transferForm.reset();
    });
});

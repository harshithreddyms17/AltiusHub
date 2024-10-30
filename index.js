const express = require('express');
const invoices = [];
const app = express();
const { v4: uuidv4 } = require('uuid');
const calculateAmount = require('./calculateAmount');
app.use(express.json());
const PORT  = 3001
//Create 
let invoiceCounter = 1; // to keep track of invoices
app.post('/invoices', (req, res) => {
    const { date, customerName, billingAddress, shippingAddress, GSTIN, items, billSundries } = req.body;
    const invoiceItems = items.map(item => ({
        ...item, id: uuidv4(), amount: item.quantity * item.price
    }));
    //incase the invoice doesnt exist
    if (invoiceItems.some(item => item.price <= 0 || item.quantity <= 0 || item.amount <= 0)) {
        return res.status(400).json({ error: "Invalid quantities or prices in items" });
    }
    const totalAmount = calculateAmount(invoiceItems, billSundries);
    const invoice = {
        id: uuidv4(), date, invoiceNumber: invoiceCounter++, customerName, billingAddress, shippingAddress, GSTIN, totalAmount, items: invoiceItems, 
        billSundries: billSundries.map(bs => ({ ...bs, id: uuidv4() }))
    };
    //pushing the invoice into the array
    invoices.push(invoice);
    //i used postman to run the check the output
    res.status(201).json(invoice);
});

//Retrieve
app.route("/invoices/:id")
    .get((req, res) => {
        const id = req.params.id;
        const invoice = invoices.find(inv => inv.id === id);
        if (!invoice) {
            return res.status(404).json({ error: "Invoice not found" });
        }
        res.json(invoice);
    })
    //Delete
    .delete((req, res) => {
        const index = invoices.findIndex(inv => inv.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: "Invoice not found" });
        }
        invoices.splice(index, 1);
        res.json({ message: "Invoice deleted successfully" });
    })
    // Update
    .put((req,res) => {
        const index = invoices.findIndex(inv => inv.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: "Invoice not found" });
        }
        const { date, customerName, billingAddress, shippingAddress, GSTIN, items, billSundries } = req.body;
        const invoiceItems = items.map(item => ({
            ...item,
            id: item.id || uuidv4(),
            amount: item.quantity * item.price
        }));
        if (invoiceItems.some(item => item.quantity <= 0 || item.price <= 0 || item.amount <= 0)) {
            return res.status(400).json({ error: "Invalid quantities or prices in items" });
        }
        const totalAmount = calculateAmount(invoiceItems, billSundries);
        const updatedInvoice = {
            ...invoices[index],
            date,customerName,billingAddress,shippingAddress,GSTIN,totalAmount,items: invoiceItems,
            billSundries: billSundries.map(bs => ({ ...bs, id: bs.id || uuidv4() }))
        };
        invoices[index] = updatedInvoice;
        res.json(updatedInvoice);
    });
//List
app.get('/invoices', (req, res) => {
    res.status(200).json(invoices.map(({ id, date, invoiceNumber, customerName, totalAmount }) => ({
        id,date,invoiceNumber,customerName,totalAmount
    })));
});

app.listen(PORT, () => {
    console.log(`The server is running on PORT: ${PORT}`);
});

Problem Statement:
Create an Invoice CRUD Endpoints. The structure of tables in the application is as follows:

Invoice Header
Id: UUID
Date: string (UTC)
InvoiceNumber: number
CustomerName: string
BillingAddress: string
ShippingAddress: string
GSTIN: string
TotalAmount: Decimal
Invoice Items
Id: UUID
itemName: string
Quantity: decimal
Price: decimal
Amount: decimal
Invoice BillSundry
Id: UUID
billSundryName: string
Amount: decimal

Create a CRUD endpoint for an invoice. It must follow the following rules:
1. Build 5 endpoints, create, update, delete, retrieve & list. Follow the REST principles.
2. Each endpoint must accept the entire Invoice in one JSON during CRUD operation.
That is, Each Invoice can have many InvoiceItems and InvoiceBillSundrys.
3. Validations for InvoiceItems:
a. Amount = Quantity x Price
b. Price, Quantity, and Amount must be greater than zero.
4. Validations for BillSundrys:
a. The amount can be negative or positive.
5. Validations for Invoice:
a. TotalAmount = Sum(InvoiceItems’s Amount) + Sum(InvoiceBillSundry’s
Amount)
b. InvoiceNumber should be autoincremental and hence should be unique.
6. Raise appropriate error messages if any validation fails.

Solution:
I used node.js and express for this task which takes cares of all the given points. 
While performing this task, I learnt to use uuid module.
To simulate this environment, I used postman to check and test all the routes.

testdata.json:
It contains test data that can be used

*To start the application use npm start* 

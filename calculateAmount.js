function calculateAmount(items, billSundries) {
    const total = items.reduce((sum,item)=>sum+item.quantity*item.price,0);
    const billSundryT = billSundries.reduce((sum,bs)=>sum+bs.amount,0);
    return total + billSundryT;
  }

module.exports=calculateAmount;
export type Data = {
  timestamp: string;
  sender: string;
  recipient: {
    name: string;
    mcc: string;
  };
  amount: string;
  currecy: string;
  amountInForeignCurrency: string;
  exchangeRate: string;
  reference: string;
  method: string;
  type: string;
}
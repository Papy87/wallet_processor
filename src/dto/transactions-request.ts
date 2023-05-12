import { Transaction } from './transaction-request';

export interface TransactionsRequest {
  transactions: Array<Transaction>;
}

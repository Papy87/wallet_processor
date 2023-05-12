/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRequest } from './dto/transactions-request';
import { Transaction } from './dto/transaction-request';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import mongoose from 'mongoose';
@Injectable()
export class AppService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: mongoose.Model<Customer>,
  ) { }
  async handleTransaction(data: TransactionsRequest) {
    const transactions: Transaction[] = data.transactions;
    try {
      for (const transaction of transactions) {
        await this.updateBalance(transaction.customerId, transaction.value)
      }
    } catch (e) {
      throw new Error('Something went wrong')
    }
  }

  async updateBalance(id: string, amount: number) {
    try {
      const customer = await this.customerModel.findById({ _id: id });
      if (!customer) {
        throw new Error('Customer not found.');
      }
      const balance = customer.balance;
      if (balance < amount) {
        console.log("The balance is insufficient.")
      } else {
        await this.customerModel.findOneAndUpdate({ _id: id }, {
          $inc: { balance: -amount }
        })
      }

    } catch (e) {
      throw new Error('Something went wrong')
    }
  }
}
import { ApolloError } from 'apollo-server-errors';

export class Errors extends ApolloError {
  constructor(message) {
    super(message, 'MY_ERROR_CODE');

    Object.defineProperty(this, 'name', { value: 'Please use the right account type' });
  }
}

throw new MyError('My error message')
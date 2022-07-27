// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Login } = initSchema(schema);

export {
  Login
};
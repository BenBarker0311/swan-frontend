import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type LoginMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Login {
  readonly id: string;
  readonly Email?: string | null;
  readonly Password?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Login, LoginMetaData>);
  static copyOf(source: Login, mutator: (draft: MutableModel<Login, LoginMetaData>) => MutableModel<Login, LoginMetaData> | void): Login;
}
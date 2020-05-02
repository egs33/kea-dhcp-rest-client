import { SharedNetwork } from './config';

export type Network = SharedNetwork;

export interface DeleteParam {
  name: string;
}

export interface GetParam {
  name: string;
}

export interface SubnetAddParam {
  id: number;
  name: string;
}

export interface SubnetDelParam {
  id: number;
  name: string;
}

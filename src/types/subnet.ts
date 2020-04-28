import { OptionData } from './config';

export interface Subnet4 {
  id?: number;
  pools?: {
    pool: string;
    'option-data'?: OptionData[];
    'client-class'?: string;
  }[];
  subnet: string;
  interface?: string;
}

export interface IdQuery {
  id: number;
}

export type GetParam = IdQuery | {
  subnet: string;
};

export type UpdateParam = Subnet4 & {
  id: number;
};

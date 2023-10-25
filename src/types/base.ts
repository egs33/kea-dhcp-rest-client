export type Response<T> = {
  arguments?: T;
  result: 0 | 1 | 2 | 3;
  text?: string;
}[];

export type NoArgResponse = Response<void>;

type Service = 'dhcp4' | 'dhcp6' | 'd2';

export type Services = Service[] | null;

export type Response<T> = {
  arguments?: T[];
  result: number;
  text?: string;
}[];

type service = 'dhcp4' | 'dhcp6' | 'd2';

export type Services = service[];

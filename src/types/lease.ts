export interface Lease4 {
  'ip-address': string;
  'hw-address': string;
  'subnet-id'?: number;
  'valid-lft'?: number;
  expire?: number;
  'fqdn-fwd'?: boolean;
  'fqdn-rev'?: boolean;
  hostname?: string;
  'client-id'?: string;
  state?: 0 | 1 | 2;
  'user-context'?: unknown;
}

export type Lease4Query = {
  'ip-address': string;
} | {
  identifier: string;
  'identifier-type': 'hw-address' | 'client-id';
  'subnet-id': number;
};

export interface Lease4UpdateParam {
  'ip-address': string;
  hostname?: string;
  'hw-address'?: string;
  'subnet-id'?: number;
  'force-create'?: boolean;
}

export type Lease4Result = Lease4 & {
  cltt: number;
};

export interface GetAllParam {
  subnets: number[];
}

export interface WipeParam {
  'subnet-id'?: number;
}

export interface ReclaimParam {
  remove: boolean;
}

export interface Lease4Results {
  leases: Lease4Result[];
}

export interface ClientIdQuery {
  'client-id': string;
}

export interface HostnameQuery {
  hostname: string;
}

export interface HwAddressQuery {
  'hw-address': string;
}

export interface IpAddressQuery {
  'ip-address': string;
}

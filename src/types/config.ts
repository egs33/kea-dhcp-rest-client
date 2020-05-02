export interface Logger {
  name: string;
  output_options?: {
    output?: string;
    maxver?: number;
    maxsize?: number;
    flush?: boolean;
    pattern?: string;
  }[];
  severity: 'NONE'|'FATAL'|'ERROR'|'WARN'|'INFO'|'DEBUG';
  debuglevel?: number;
}

export interface HookLibrary {
  library: string;
  parameters?: unknown;
}

export interface ControlSocket {
  comment?: string;
  'socket-type': 'unix';
  'socket-name'?: string;
  'user-context'?: {};
}

export interface ControlAgent {
  'control-sockets'?: {
    dhcp4?: ControlSocket;
    dhcp6?: ControlSocket;
    d2?: ControlSocket;
  };
  'hooks-libraries'?: HookLibrary[];
  'http-host'?: string;
  'http-port'?: number;
  loggers?: Logger[];
}

export interface OptionData {
  name?: string;
  space?: string;
  code?: number;
  'csv-format'?: boolean;
  data: string;
}

export interface OptionDef {
  name: string;
  code: number;
  type: string;
  array?: boolean;
  'record-types'?: string;
  space?: string;
  encapsulate?: string;
}

export interface ClientClass {
  name: string;
  test: string;
  'boot-file-name'?: string;
  'next-server'?: string;
  'option-data'?: OptionData[];
  'option-def'?: OptionDef[];
  'server-hostname'?: string;
  'only-if-required'?: boolean;
}

export interface Reservation {
  'ip-address': string;
  'hw-address'?: string;
  'client-id'?: string;
  hostname?: string;
  duid?: string;
  'option-data'?: OptionData[];
  'circuit-id'?: string;
  'next-server'?: string;
  'server-hostname'?: string;
  'boot-file-name'?: string;
  'flex-id'?: string;
}

interface Subnet4 {
  id?: number;
  pools?: {
    pool: string;
    'option-data'?: OptionData[];
    'client-class'?: string;
  }[];
  subnet: string;
  interface?: string;
  'reservation-mode'?: 'all' | 'out-of-pool';
  reservations?: Reservation[];
}

export interface SharedNetwork {
  name: string;
  interface?: string;
  'match-client-id'?: boolean;
  'option-data'?: OptionData[];
  'rebind-timer'?: number;
  'authoritative'?: boolean;
  'relay'?: {
    'ip-address': string;
  };
  'renew-timer'?: number;
  'reservation-mode'?: 'all' | 'out-of-pool';
  'subnet4'?: Subnet4[];
  'valid-lifetime'?: number;
}

export interface HostsDatabase {
  type: 'mysql' | 'postgres' | 'cql';
  name?: 'kea';
  user?: 'kea';
  password?: 'kea';
  host?: 'localhost';
  port?: 3306;
  'max-reconnect-tries'?: number;
  'reconnect-wait-time'?: number;
  'connect-timeout'?: number;
  'request-timeout'?: number;
  'tcp-keepalive'?: number;
  'tcp-nodelay'?: boolean;
  consistency?: CassandraConsistency;
  'serial-consistency'?: CassandraConsistency;
  readonly?: boolean;
}

type CassandraConsistency = 'any' | 'one' | 'two' | 'three' | 'quorum' | 'all' | 'local-quorum' | 'each-quorum' | 'serial' | 'local-serial' | 'local-one';

export interface Dhcp4Config {
  'boot-file-name'?: string;
  'client-classes'?: ClientClass[];
  'control-socket'?: ControlSocket;
  'ddns-generated-prefix'?: string;
  'ddns-override-client-update'?: boolean;
  'ddns-override-no-update'?: boolean;
  'ddns-qualifying-suffix'?: string;
  'ddns-replace-client-name'?: 'never' | 'always' | 'when-present' | 'when-not-present';
  'ddns-send-updates'?: boolean;
  'decline-probation-period'?: number;
  'dhcp-ddns'?: {
    'enable-updates'? : boolean;
    'server-ip'?: string;
    'server-port'? : number;
    'sender-ip'?: string;
    'sender-port'? : number;
    'max-queue-size'? : number;
    'ncr-protocol'? : 'UDP';
    'ncr-format'?: 'JSON';
  };
  'dhcp4o6-port'?: number;
  'echo-client-id'?: boolean;
  'expired-leases-processing'?: {
    'reclaim-timer-wait-time'?: number;
    'hold-reclaimed-time'?: number;
    'flush-reclaimed-timer-wait-time'?: number;
    'max-reclaim-leases'?: number;
    'max-reclaim-time'?: number;
    'unwarned-reclaim-cycles'?: number;
  };
  'hooks-libraries'?: HookLibrary[];
  'hosts-database'?: HostsDatabase;
  'hosts-databases'?: HostsDatabase[];
  'host-reservation-identifiers'?: ('hw-address' | 'duid' | 'circuit-id' | 'client-id' | 'flex-id')[];
  'interfaces-config'?: {
    'dhcp-socket-type'?: 'udp' | 'raw';
    interfaces?: string[];
    'outbound-interface'?: 'same-as-inbound' | 'use-routing';
    're-detect'?: boolean;
  };
  'lease-database'?: {
    type: 'memfile' | 'postgresql' | 'mysql' | 'cql';
    persist?: boolean;
    'lfc-interval'?: number;
    name?: string;
    host?: string;
    port?: number;
    user?: string;
    password?: string;
    'connect-timeout'?: number;
    keyspace?: string;
    'contact-points'?: string;
  };
  'match-client-id'?: boolean;
  'next-server'?: string;
  'option-data'?: OptionData[];
  'option-def'?: OptionDef[];
  'rebind-timer'?: number;
  'renew-timer'?: number;
  'store-extended-info'?: boolean;
  'statistic-default-sample-count'?: number;
  'statistic-default-sample-age'?: number;
  'multi-threading'?: {
    'enable-multi-threading'?: boolean;
    'thread-pool-size'?: number;
    'packet-queue-size'?: number;
  };
  'sanity-checks'?: {
    'lease-checks'?: 'none' | 'warn' | 'fix' | 'fix-del' | 'del';
  };
  'shared-networks'?: SharedNetwork[];
  'server-hostname'?: string;
  subnet4?: Subnet4[];

  'valid-lifetime'?: number;
  'min-valid-lifetime'?: number;
  'max-valid-lifetime'?: number;
  reservations?: Reservation[];
  'config-control'?: {
    'config-databases'?: {
      name: string;
      type: 'mysql' | 'postgresql' | 'cql';
    }[];
    'config-fetch-wait-time'?: number;
  };
  'server-tag'?: string;
  'dhcp-queue-control'?: {
    'enable-queue': boolean;
    'queue-type'?: string;
  };
  'reservation-mode'?: 'all';
  'calculate-tee-times'?: boolean;
  't1-percent'?: number;
  't2-percent'?: number;
  'hostname-char-replacement'?: string;
  'hostname-char-set'?: string;
  loggers?: Logger[];
}

export interface Dhcp6 { // TODO
  loggers?: Logger[];
}

export interface D2 {
  'ip-address'?: string;
  port?: number;
  'dns-server-timeout'?: number;
  'user-context'?: {};
  'control-socket'?: ControlSocket;
  'ncr-protocol'?: 'UDP';
  'ncr-format'?: 'JSON';
  'forward-ddns'?: {
    'ddns-domains': {
      comment?: string;
      name: string;
      'key-name'?: string;
      'dns-servers': {
        hostname?: string;
        'ip-address'?: string;
        port?: number;
      }[];
      'user-context'?: {};
    }[];
  };
  'reverse-ddns'?: {
    'ddns-domains': {
      comment?: string;
      name: string;
      'key-name'?: string;
      'dns-servers': {
        hostname?: string;
        'ip-address': string;
        port?: number;
      }[];
      'user-context'?: {};
    }[];
  };

  'tsig-keys'?: {
    name?: string;
    algorithm?: 'HMAC-MD5' | 'HMAC-SHA1' | 'HMAC-SHA224' | 'HMAC-SHA256' | 'HMAC-SHA384' | 'HMAC-SHA512';
    secret?: string;
    'digest-bits'?: number;
  }[];
  loggers?: Logger[];
}

export interface Config {
  'Control-agent'?: ControlAgent;
  Dhcp4?: Dhcp4Config;
  Dhcp6?: Dhcp6;
  DhcpDdns?: D2;
}

export interface ConfigWriteParam {
  filename: string;
}

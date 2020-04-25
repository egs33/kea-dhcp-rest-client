export interface Status {
  pid: number;
  uptime: number;
  reload: number;
  'ha-servers'?: {
    local: {
      role: string;
      scopes: string[];
      state: string;
    };
    remote?: {
      age: number;
      'in-touch': string;
      'last-scopes': string[];
      'last-state': string;
      role: string;
    };
  };
}

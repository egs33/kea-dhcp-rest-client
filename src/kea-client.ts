import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import type {
  NoArgResponse, Response, Services, Shutdown, Config, Status, Version, Lease, Subnet, Network,
} from './types';

interface ClientParams {
  scheme?: 'http' | 'https';
  domain: string;
  port?: number;
  path?: string;
}

const defaultParams: ClientParams = {
  scheme: 'http',
  domain: 'localhost',
  port: 8080,
  path: '/',
};

const composeBaseUrl = (param: string | ClientParams | undefined): string => {
  if (typeof param === 'string') {
    return `http://${param}/`;
  }
  const {
    scheme, domain, port, path,
  } = { ...defaultParams, ...param };
  return `${scheme}://${domain}:${port}${path}`;
};

export class KeaClient {
  private axiosClient: AxiosInstance;

  constructor();

  constructor(domain: string, axiosParams?: AxiosRequestConfig);

  constructor(params: ClientParams, axiosParams?: AxiosRequestConfig);

  constructor(param?: string | ClientParams, axiosParams?: AxiosRequestConfig) {
    this.axiosClient = axios.create({
      baseURL: composeBaseUrl(param),
      headers: {
        'Content-Type': 'application/json',
      },
      validateStatus: (status) => status < 600,
      ...axiosParams,
    });
  }

  public async request(command: string, args?: {}): Promise<Response<unknown>>;

  public async request(command: string, service?: Services, args?: {}): Promise<Response<unknown>>;

  public async request(command: string, service?: Services|{}, args?: {}):
  Promise<Response<unknown>> {
    const data = { command };
    if (Array.isArray(service)) {
      Object.assign(data, { service });
    } else if (typeof service === 'object') {
      Object.assign(data, { arguments: service });
    }
    if (args) {
      Object.assign(data, { arguments: args });
    }
    const response = await this.axiosClient.post('', data);
    return response.data as Response<unknown>;
  }

  public buildReport(service?: Services): Promise<NoArgResponse> {
    return this.request('build-report', service) as Promise<NoArgResponse>;
  }

  public configGet(service?: Services): Promise<Response<Config.Config>> {
    return this.request('config-get', service) as Promise<Response<Config.Config>>;
  }

  public configReload(service?: Services): Promise<NoArgResponse> {
    return this.request('config-reload', service) as Promise<NoArgResponse>;
  }

  public configSet(service: Services, configs: Config.Config): Promise<NoArgResponse> {
    return this.request('config-set', service, configs) as Promise<NoArgResponse>;
  }

  public configTest(service: Services, configs: Config.Config): Promise<NoArgResponse> {
    return this.request('config-set', service, configs) as Promise<NoArgResponse>;
  }

  public configWrite(service: Services, configs: Config.ConfigWriteParam): Promise<NoArgResponse> {
    return this.request('config-write', service, configs) as Promise<NoArgResponse>;
  }

  public listCommands(service: Services): Promise<NoArgResponse> {
    return this.request('list-commands', service) as Promise<NoArgResponse>;
  }

  public shutdown(service: Services, param?: Shutdown.ShutdownParam): Promise<NoArgResponse> {
    return this.request('shutdown', param) as Promise<NoArgResponse>;
  }

  public statusGet(service: Services): Promise<Response<Status.Status>> {
    return this.request('status-get', service) as Promise<Response<Status.Status>>;
  }

  public versionGet(service: Services): Promise<Response<Version.Version>> {
    return this.request('version-get', service) as Promise<Response<Version.Version>>;
  }

  public lease4Add(lease4: Lease.Lease4): Promise<NoArgResponse> {
    return this.request('lease4-add', ['dhcp4'], lease4) as Promise<NoArgResponse>;
  }

  public lease4Del(param: Lease.Lease4Query): Promise<NoArgResponse> {
    return this.request('lease4-del', ['dhcp4'], param) as Promise<NoArgResponse>;
  }

  public lease4Get(param: Lease.Lease4Query): Promise<Response<Lease.Lease4Result>> {
    return this.request('lease4-get', ['dhcp4'], param) as Promise<Response<Lease.Lease4Result>>;
  }

  public lease4GetAll(param?: Lease.Lease4Query): Promise<Response<Lease.Lease4Results>> {
    return this.request('lease4-get-all', ['dhcp4'], param) as Promise<Response<Lease.Lease4Results>>;
  }

  public lease4GetByClientId(param: Lease.ClientIdQuery): Promise<Response<Lease.Lease4Results>> {
    return this.request('lease4-get-by-client-id', ['dhcp4'], param) as Promise<Response<Lease.Lease4Results>>;
  }

  public lease4GetByHostname(param: Lease.HostnameQuery): Promise<Response<Lease.Lease4Results>> {
    return this.request('lease4-get-by-hostname', ['dhcp4'], param) as Promise<Response<Lease.Lease4Results>>;
  }

  public lease4GetByHwAddress(param: Lease.HwAddressQuery): Promise<Response<Lease.Lease4Results>> {
    return this.request('lease4-get-by-hw-address', ['dhcp4'], param) as Promise<Response<Lease.Lease4Results>>;
  }

  public lease4ResendDdns(param: Lease.IpAddressQuery): Promise<Response<Lease.Lease4Result>> {
    return this.request('lease4-resend-ddns', ['dhcp4'], param) as Promise<Response<Lease.Lease4Result>>;
  }

  public lease4Update(param: Lease.Lease4UpdateParam): Promise<NoArgResponse> {
    return this.request('lease4-update', ['dhcp4'], param) as Promise<NoArgResponse>;
  }

  public lease4Wipe(param: Lease.WipeParam): Promise<NoArgResponse> {
    return this.request('lease4-wipe', ['dhcp4'], param) as Promise<NoArgResponse>;
  }

  public leasesReclaim(services: Services, param: Lease.ReclaimParam): Promise<NoArgResponse> {
    return this.request('leases-reclaim', services, param) as Promise<NoArgResponse>;
  }

  public subnet4Add(param: Subnet.Subnet4): Promise<Response<Subnet.Subnet4>> {
    return this.request('subnet4-add', ['dhcp4'], param) as Promise<Response<Subnet.Subnet4>>;
  }

  public subnet4Del(param: Subnet.IdQuery): Promise<Response<Subnet.Subnet4>> {
    return this.request('subnet4-del', ['dhcp4'], param) as Promise<Response<Subnet.Subnet4>>;
  }

  public subnet4Get(param: Subnet.GetParam): Promise<Response<Subnet.Subnet4>> {
    return this.request('subnet4-get', ['dhcp4'], param) as Promise<Response<Subnet.Subnet4>>;
  }

  public subnet4List(): Promise<Response<Subnet.Subnet4>> {
    return this.request('subnet4-list', ['dhcp4']) as Promise<Response<Subnet.Subnet4>>;
  }

  public subnet4Update(param: Subnet.UpdateParam): Promise<Response<Subnet.Subnet4>> {
    return this.request('subnet4-update', ['dhcp4'], param) as Promise<Response<Subnet.Subnet4>>;
  }

  public network4Add(param: Network.Network): Promise<Response<Network.Network>> {
    return this.request('network4-add', ['dhcp4'], param) as Promise<Response<Network.Network>>;
  }

  public network4Del(param: Network.DeleteParam): Promise<Response<Network.Network>> {
    return this.request('network4-del', ['dhcp4'], param) as Promise<Response<Network.Network>>;
  }

  public network4Get(param: Network.GetParam): Promise<Response<Network.Network>> {
    return this.request('network4-get', ['dhcp4'], param) as Promise<Response<Network.Network>>;
  }

  public network4List(): Promise<Response<Network.Network>> {
    return this.request('network4-list', ['dhcp4']) as Promise<Response<Network.Network>>;
  }

  public network4SubnetAdd(param: Network.SubnetAddParam): Promise<NoArgResponse> {
    return this.request('network4-subnet-add', ['dhcp4'], param) as Promise<NoArgResponse>;
  }

  public network4SubnetDel(param: Network.SubnetDelParam): Promise<NoArgResponse> {
    return this.request('network4-subnet-add', ['dhcp4'], param) as Promise<NoArgResponse>;
  }
}

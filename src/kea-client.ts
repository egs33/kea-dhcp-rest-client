import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  NoArgResponse, Response, Services, ShutdownParam, Config, Status,
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

  public configGet(service?: Services): Promise<Response<Config.Config[]>> {
    return this.request('config-get', service) as Promise<Response<Config.Config[]>>;
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

  public shutdown(service: Services, param?: ShutdownParam): Promise<NoArgResponse> {
    return this.request('shutdown', param) as Promise<NoArgResponse>;
  }

  public statusGet(service: Services): Promise<Response<Status.Status>> {
    return this.request('status-get', service) as Promise<Response<Status.Status>>;
  }

  public versionGet(service: Services): Promise<NoArgResponse> {
    return this.request('version-get', service) as Promise<NoArgResponse>;
  }
}

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Response, Services } from './interfaces';

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
}

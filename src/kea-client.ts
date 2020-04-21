import axios, {AxiosInstance} from 'axios';

export class KeaClient {
  private axiosClient: AxiosInstance;

  constructor(domain: string) {
    this.axiosClient = axios.create({
      baseURL: `http://${domain}/`,
    });
  }
}

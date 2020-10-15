import axios from 'axios';

/**
 * @method Request
 * @param configs = {}
 *
 * @return {promise}
 */
type configs = {
    baseUrl: string;
    headers : any;
    data? : any;
    url? : string;
    path?: string;
    method?: any;
};

const Request = (configs : configs) => {
  const baseUrl = configs.baseUrl;
  const url = baseUrl + configs.path;
  const localDefaultHeaders = '{}';
  const defaultHeaders = JSON.parse(localDefaultHeaders);
  const headers = { ...configs.headers, ...defaultHeaders };
  configs = { ...configs, headers, url };
  console.log('request', configs)
  return axios(configs);
};


export const GET = (path, configs : configs) =>
  Request({ ...configs, path, method: 'GET' });

  
export default Request;
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

type RequestConfig = Omit<AxiosRequestConfig, 'method' | 'url' | 'data'>;

class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      withCredentials: true, // Send cookies with requests
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // You can add auth headers or other request modifications here
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Handle common errors here (e.g., 401, 403, 500, etc.)
        return Promise.reject(error);
      }
    );
  }

  private async request<T = any>(
    method: Method,
    url: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  }

  public get<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  public patch<T = any>(
    url: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> {
    return this.request<T>('PATCH', url, data, config);
  }

  public delete<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }

  // Add any additional methods or utilities as needed
  public setHeader(key: string, value: string): void {
    this.client.defaults.headers.common[key] = value;
  }

  public removeHeader(key: string): void {
    delete this.client.defaults.headers.common[key];
  }
}

// Create a singleton instance
export const createHttpClient = (baseURL: string) => new HttpClient(baseURL);

// Example usage:
export const apiClient = createHttpClient('http://localhost:8000/api');
/*

// GET request
const getUsers = async () => {
  try {
    const users = await api.get<User[]>('/users');
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// POST request
const createUser = async (userData: CreateUserDto) => {
  try {
    const newUser = await api.post<User>('/users', userData);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
*/

export default HttpClient;

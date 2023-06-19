import axios from 'axios';
import { QueryClient } from 'react-query';

const apiClient = axios.create({
  baseURL: 'https://56b3ptia99.execute-api.us-east-1.amazonaws.com',
});

const queryClient = new QueryClient();

export { apiClient, queryClient };

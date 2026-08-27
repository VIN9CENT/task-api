export interface Task {
  id: string;
  title: string;
  description?: string;
  completion_status?: boolean;
  created_at?: string;
}

export interface ErrorResponse {
  status: string;
  code: number;
  error: string;
  message: string;
}

export interface SuccessResponse {
  status: string;
  code: number;
  data: Task[];
  message: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  reporterId: string;
  assigneeId: string;
}
export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

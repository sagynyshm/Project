export interface User {
  id: number;
  username: string;
  email: string;
}

export interface TaskStatus {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  category: Category;
  user: User;
}

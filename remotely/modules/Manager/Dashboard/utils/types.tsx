export type ChecklistItem = {
  id: number; // Unique identifier for each item
  text: string;
  status: boolean; // true for checked, false for crossed
};

export type Task = {
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  uids: string[];
  checklist: ChecklistItem[];
};

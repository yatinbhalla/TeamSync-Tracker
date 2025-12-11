export enum ProjectStatus {
  NOT_STARTED = 'Not Started',
  IN_PROCESS = 'In Process',
  DONE = 'Done',
}

export interface Project {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  description: string;
  createdAt: string;
}

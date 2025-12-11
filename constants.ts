import { ProjectStatus } from './types';

export const STATUS_OPTIONS = [
  { value: ProjectStatus.NOT_STARTED, label: 'Not Started', color: 'bg-gray-100 text-gray-800' },
  { value: ProjectStatus.IN_PROCESS, label: 'In Process', color: 'bg-blue-100 text-blue-800' },
  { value: ProjectStatus.DONE, label: 'Done', color: 'bg-green-100 text-green-800' },
];

export const AI_MODEL_FLASH = 'gemini-2.5-flash';

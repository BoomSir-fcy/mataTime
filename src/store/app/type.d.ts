import { Language } from 'config/localization';

export interface systemCustom {
  isDark: boolean;
  notification: notification;
  autoTranslation: boolean;
}

export interface languange {
  id: number;
  label: string;
  value: Language;
}

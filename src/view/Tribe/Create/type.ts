export const actionTypes = {
  SAVE: 'save',
  EDIT: 'edit',
} as const;

export type ActionType = typeof actionTypes[keyof typeof actionTypes];

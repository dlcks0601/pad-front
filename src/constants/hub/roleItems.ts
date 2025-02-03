export const roleItems = {
  Programmer: 'PROGRAMMER',
  Artist: 'ARTIST',
  Designer: 'DESIGNER',
} as const;

export type RoleItemKeys = keyof typeof roleItems;
export type RoleItemValues = (typeof roleItems)[RoleItemKeys];

export const roleValueToKeyMap: Record<RoleItemValues, RoleItemKeys> = {
  PROGRAMMER: 'Programmer',
  ARTIST: 'Artist',
  DESIGNER: 'Designer',
};

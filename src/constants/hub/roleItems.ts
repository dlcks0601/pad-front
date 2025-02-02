export const roleItems = {
  Programmer: 'PROGRAMMER',
  Artist: 'ARTIST',
  Designer: 'DESIGNER',
} as const;

export type roleItemsKey = keyof typeof roleItems;
export type roleItemsValue = (typeof roleItems)[roleItemsKey];

export const roleValueToKeyMap: Record<roleItemsValue, roleItemsKey> = {
  PROGRAMMER: 'Programmer',
  ARTIST: 'Artist',
  DESIGNER: 'Designer',
};

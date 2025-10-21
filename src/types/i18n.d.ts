export type SimpleTFunction = (key: string, values?: Record<string, unknown>) => string;

type MessageMap = Record<string, any>;

export type DynamicMessageKey<Namespace extends keyof Messages> = Namespace extends string
    ? `${Namespace}.${string}`
    : never;

export type TStatuses = { done: string; pending: string; created: string };

export const statuses: Record<string, "Выполнен" | "Готовится" | "Создан"> = {
  done: "Выполнен",
  pending: "Готовится",
  created: "Создан",
};

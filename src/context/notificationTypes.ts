import { createContext } from "react";

export type NotificationType = "success" | "error" | "info";

export type NotifyFn = (message: string, type?: NotificationType) => void;

export const NotificationContext = createContext<NotifyFn | null>(null);
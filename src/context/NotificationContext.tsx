import { useCallback, useState, type ReactNode } from "react";
import { NotificationContext } from "./notificationTypes";
import type { NotificationType } from "./notificationTypes";

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

const DISMISS_DELAY = 3500;

const STYLE_MAP: Record<NotificationType, { bg: string; text: string; border: string }> = {
  success: {
    bg: "bg-green-50",
    text: "text-green-800",
    border: "border-green-300",
  },
  error: {
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-300",
  },
  info: {
    bg: "bg-blue-50",
    text: "text-blue-800",
    border: "border-blue-300",
  },
};

export default function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = useCallback(
    (message: string, type: NotificationType = "success") => {
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, DISMISS_DELAY);
    },
    [],
  );

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2">
        {notifications.map((n) => {
          const styles = STYLE_MAP[n.type];
          return (
            <div
              key={n.id}
              className={`
                px-5 py-3 rounded-lg text-sm font-medium max-w-xs
                border animate-slide-up
                ${styles.bg} ${styles.text} ${styles.border}
              `}
            >
              {n.message}
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
}
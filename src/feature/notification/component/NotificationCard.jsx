import React from "react";
import { getNotificationLabel } from "./NotificationLable";
import "./NotificationCard.css";

export default function NotificationCard({ notification, onMarkRead }) {
  return (
    <div
      className={`notification-card ${
        notification.read ? "read" : "unread"
      }`}
    >
      <div className="notification-header">
        <span className="notification-type">
          {getNotificationLabel(notification.type)}
        </span>

        <span className="notification-time">
          {new Date(notification.createdAt).toLocaleString()}
        </span>
      </div>

      <div className="notification-message">
        {notification.message}
      </div>
      {!notification.read && (
        <button
          className="mark-read-btn"
          onClick={() => onMarkRead(notification.notificationId)}
        >
          Mark as Read
        </button>
      )}
    </div>
  );
}
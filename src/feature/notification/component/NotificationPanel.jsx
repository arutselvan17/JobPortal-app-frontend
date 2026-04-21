import { useDispatch, useSelector } from "react-redux";
import NotificationCard from "./NotificationCard";
import { ReadNotification } from "../slice/NotificationSlice";
import "./NotificationPannel.css";

export default function NotificationPanel({ onClose }) {
  const dispatch = useDispatch();


  const { notifications, error, loading } = useSelector(
    (state) => state.notification
  );

  const markAsRead = (id) => {
    dispatch(ReadNotification(id));
  };

  return (
    <div className="notification-overlay" onClick={onClose}>

      <div className="notification-panel" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="notification-header">
          <h3>Notifications</h3>

          {/* CLOSE BUTTON */}
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* CONTENT */}
        {loading && <p>Loading...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {notifications && notifications.length > 0 ? (
          notifications.map((item) => (
            <NotificationCard
              key={item.notificationId}
              notification={item}
              onMarkRead={markAsRead}
            />
          ))
        ) : (
          !loading && <p>No notifications</p>
        )}

      </div>
    </div>
  );
}
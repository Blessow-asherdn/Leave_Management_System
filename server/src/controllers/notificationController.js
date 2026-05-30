import {
  getNotifications,
  markAsRead,
} from "../services/notificationService.js";

export const fetchNotifications =
  async (req, res) => {

    try {

      const notifications =
        await getNotifications(
          req.user.id
        );

      res.status(200).json(
        notifications
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

export const readNotification =
  async (req, res) => {

    try {

      const notification =
        await markAsRead(
          req.params.id
        );

      res.status(200).json(
        notification
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };
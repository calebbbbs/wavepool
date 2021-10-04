import { gql } from '@apollo/client';

const CREATE_NOTIFICAITON = gql`
  mutation CreateNotificationMutation($createNotificationData: CreateNotificationInput!) {
    createNotification(data: $createNotificationData) {
    # user_id
    # friend_id
    # action
    # message
    }
  }
  `;

export default CREATE_NOTIFICAITON;

import provider from './config';

export async function getLastNotification(params, token) {
  try {
    const response = await provider.get('/support/notification/list/', {
      params,
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    let notifications = response.data.filter(notification => {
      if (
        notification.title !==
          'Your jobs have been posted. Now just wait for the artists to accept the job' &&
        notification.title !==
          'You have been selected to participate in a job' &&
        notification.message !==
          'Your jobs have been posted. Now just wait for the artists to accept the job'
      ) {
        return notification;
      }
    });

    notifications = uniqSort(notifications);

    if (notifications.length > 0) {
      return notifications[0];
    } else {
      return null;
    }
  } catch (err) {
    throw Error(err);
  }
}

export async function getNotifications(params, token) {
  try {
    const response = await provider.get('/support/notification/list/', {
      params,
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if(params.page) {
      const { results, count } = response.data;

      let notifications = results.filter(notification => {
        if (
          notification.title !==
            'Your jobs have been posted. Now just wait for the artists to accept the job' &&
          notification.title !==
            'You have been selected to participate in a job' &&
          notification.message !==
            'Your jobs have been posted. Now just wait for the artists to accept the job'
        ) {
          return notification;
        }
      });

      notifications = uniqSort(notifications);
      const totalPages = Math.ceil(count / 10);

      return { notifications, totalPages }

    } else {
      let notifications = response.data.filter(notification => {
        if (
          notification.title !==
            'Your jobs have been posted. Now just wait for the artists to accept the job' &&
          notification.title !==
            'You have been selected to participate in a job' &&
          notification.message !==
            'Your jobs have been posted. Now just wait for the artists to accept the job'
        ) {
          return notification;
        }
      });
  
      notifications = uniqSort(notifications);
  
      return notifications;
    }

  } catch (err) {
    throw Error(err);
  }
}

export async function removeNotification(idNotification, token) {
  try {
    const response = await provider.patch(`/support/notification/${idNotification}/`, {
      visible: 0
    }, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    console.log('Atualizou notificação '+idNotification);
  } catch (error) {
    console.log(error);
  }
}

const uniqSort = (arr = []) => {
  const map = {};
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!map[arr[i].id]) {
      map[arr[i].id] = true;
      res.push(arr[i]);
    }
  }
  return res.sort(date_sort_desc);
};

const date_sort_desc = function (obj1, obj2) {
  const date1 = new Date(obj1.created_at);
  const date2 = new Date(obj2.created_at);
  if (date1 > date2) return -1;
  if (date1 < date2) return 1;
  return 0;
};

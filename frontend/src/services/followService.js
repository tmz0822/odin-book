const fetchSendFollowRequest = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/users/${userId}/following`,
      {
        credentials: 'include',
        method: 'post',
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const fetchUpdateFollowRequest = async (userId, followRequestId, status) => {
  const response = await fetch(
    `http://localhost:3000/users/${userId}/follow-requests/${followRequestId}`,
    {
      credentials: 'include',
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

const fetchFollow = async () => {};

const fetchUnfollow = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/users/${userId}/following`,
      {
        credentials: 'include',
        method: 'delete',
      }
    );

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const followService = {
  fetchSendFollowRequest,
  fetchUpdateFollowRequest,
  fetchFollow,
  fetchUnfollow,
};

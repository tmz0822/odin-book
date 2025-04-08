const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/users", {
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const userService = {
  fetchUsers,
};

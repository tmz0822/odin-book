const login = async (username, password) => {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to sign in');
    }

    return data;
  } catch (error) {
    console.error('Sign in error:', error.message);
    throw error;
  }
};

export const authService = { login };

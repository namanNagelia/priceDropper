const API_URL = "http://localhost:8080/api/auth";

export const checkAuth = async (): Promise<{
  isAuthenticated: boolean;
  user?: any;
}> => {
  try {
    const response = await fetch(`${API_URL}/protected`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return { isAuthenticated: true, user: data.user };
    }
    return { isAuthenticated: false };
  } catch (error) {
    console.error("Auth check error:", error);
    return { isAuthenticated: false };
  }
};

export const login = async (
  email: string,
  password: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return {
      success: response.ok,
      message: data.message,
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An error occurred during login" };
  }
};

// Register a new user
export const register = async (
  email: string,
  password: string,
  name: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();
    return {
      success: response.ok,
      message: data.message,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "An error occurred during registration" };
  }
};

// Logout the user
export const logout = async (): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    return { success: response.ok };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false };
  }
};

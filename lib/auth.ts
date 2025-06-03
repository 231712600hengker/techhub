import { cookies } from "next/headers";

interface User {
  username: string;
  role: 'admin' | 'user';
}

export const login = (username: string, password: string) => {
  const validCredentials = [
    { username: 'admin123', password: '12345', role: 'admin' },
    { username: 'user123', password: '12345', role: 'user' }
  ];

  const user = validCredentials.find(
    cred => cred.username === username && cred.password === password
  );

  if (user) {
    const cookieStore = cookies();
    cookieStore.set('user', JSON.stringify({
      username: user.username,
      role: user.role
    }), { 
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    }); 
    
    return { success: true, user };
  }

  return { success: false };
};

export const logout = () => {
  const cookieStore = cookies();
  cookieStore.delete('user');
};

export const getUser = (): User | null => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user');
  
  if (!userCookie) {
    return null;
  }
  
  try {
    return JSON.parse(userCookie.value);
  } catch (e) {
    return null;
  }
};

export const isAuthenticated = () => {
  return getUser() !== null;
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === 'admin';
};
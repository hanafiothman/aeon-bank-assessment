'use client';

import { redirect, usePathname } from 'next/navigation';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

interface AuthUser {
	username: string;
	token: string;
}

type AuthState = {
  authUser: AuthUser;
	isLoggedIn: boolean;
};

const AuthContext = createContext<AuthState>({
  authUser: {
    username: '',
		token: ''
  },
	isLoggedIn: false
});

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Please use AuthProvider in parent component');
  }

  return context;
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<AuthUser>({
		username: '',
		token: ''
	});

	const pathname = usePathname();

	useEffect(() => {
		const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);
			setAuthUser(user);
      setLoggedIn(Boolean(user.token));
    }
	}, []);

	if (pathname === '/login' && isLoggedIn) {
		return redirect('/transactions');
	}

  return (
    <AuthContext.Provider
      value={{
        authUser,
				isLoggedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

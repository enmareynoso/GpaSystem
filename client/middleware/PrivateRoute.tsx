import { useRouter } from 'next/router';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';


type ComponentType = React.ComponentType<any>;

export default function PrivateRoute(Component: ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const jwtToken = document.cookie
          .split(';')
          .map(cookie => cookie.trim())
          .find(cookie => cookie.startsWith('jwt='));

        if (!jwtToken) {
          // Redirect to login if JWT token is not present
          if (router.pathname !== '/login') {
            router.push('/login');
          }
          return;
        }

        const tokenPayload = jwtDecode<{ exp: number }>(jwtToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (tokenPayload.exp <= currentTime) {
          // Token has expired, redirect to login
          router.push('/login');
          return;
        }

        // If the user is authenticated, allow access to the component
      }
    }, [router]);

    return <Component {...props} />;
  };
}
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import cookies from 'js-cookie';

type ComponentType = React.ComponentType<any>;

export default function PrivateRoute(Component: ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const jwtToken = cookies.get('jwt');

    useEffect(() => {
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
    }, [jwtToken, router]);

    // Render the provided component
    return <Component {...props} />;
  };
}
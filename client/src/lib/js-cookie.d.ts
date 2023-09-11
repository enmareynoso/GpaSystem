declare module 'js-cookie' {
    interface Cookies {
      get(name: string): string | undefined;
      set(name: string, value: string, options?: object): void;
    }
  
    const cookies: Cookies;
    export = cookies;
  }
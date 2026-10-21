// Ambient type declarations for Supabase Edge Functions running on Deno runtime

declare namespace Deno {
  export interface ServeOptions {
    port?: number;
    hostname?: string;
    signal?: AbortSignal;
    onError?: (error: unknown) => Response | Promise<Response>;
    onListen?: (params: { hostname: string; port: number }) => void;
  }

  export const env: {
    get(key: string): string | undefined;
    set(key: string, value: string): void;
    delete(key: string): void;
    toObject(): Record<string, string>;
  };

  export function serve(
    handler: (req: Request) => Promise<Response> | Response,
    options?: ServeOptions,
  ): void;
}

// Support ESM URL imports
declare module 'https://esm.sh/@supabase/supabase-js@2' {
  export const createClient: any;
  export type SupabaseClient = any;
  const content: any;
  export default content;
}

declare module 'https://*' {
  export const createClient: any;
  const content: any;
  export default content;
}

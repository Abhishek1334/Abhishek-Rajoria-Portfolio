// Type declarations for Supabase Edge Functions
declare namespace Deno {
  namespace env {
    function get(key: string): string | undefined;
  }
}

declare module "https://deno.land/std@0.190.0/http/server.ts" {
  export function serve(handler: (req: Request) => Promise<Response>): void;
}

declare module "npm:resend@2.0.0" {
  export class Resend {
    constructor(apiKey: string);
    emails: {
      send(data: {
        from: string;
        to: string[];
        subject: string;
        html?: string;
        text?: string;
      }): Promise<{ id: string; }>;
    };
  }
}

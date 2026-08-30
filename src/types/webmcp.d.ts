export {};

declare global {
  interface ModelContextTool {
    name: string;
    title?: string;
    description: string;
    inputSchema: Record<string, unknown>;
    annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean };
    execute: (input: Record<string, unknown>, options?: { signal: AbortSignal }) => Promise<unknown>;
  }

  interface ModelContext {
    registerTool: (tool: ModelContextTool, options?: { exposedTo?: string[]; signal?: AbortSignal }) => Promise<void>;
    getTools?: (options?: { fromOrigins?: string[] }) => Promise<ModelContextTool[]>;
  }

  interface Document {
    modelContext?: ModelContext;
  }
}

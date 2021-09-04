import { message_event_type } from './interface';
export const load_worker = async (
  callback?: (events: (message_event_type | undefined)[]) => void,
  api_paths?: [string, RequestInit?][],
  get_worker_response?: 1
): Promise<void> => {
  const events = await Promise.all([
    ...(api_paths
      ? api_paths.map(
          (api_path: [string, (RequestInit | undefined)?]) =>
            new Promise((resolve: (value: message_event_type | undefined) => void) => {
              const worker = new Worker(`./assets/web-worker/fetch/worker.js`);
              worker.postMessage(JSON.stringify(api_path));
              if (get_worker_response) {
                const message_listener = (event: MessageEvent<string>) => {
                  worker.removeEventListener('message', message_listener);
                  (event as message_event_type).name = api_path[0];
                  resolve(event as message_event_type);
                  // onmessage(event, asc);
                };
                worker.addEventListener('message', message_listener);
              } else resolve(undefined);
            })
        )
      : [])
  ]);
  callback?.(events);
};

onmessage = async (event: MessageEvent<string>) => {
  try {
    const fetch_args: [string, RequestInit] = JSON.parse(event.data);
    const response_text = await (await fetch.apply(undefined, fetch_args)).text();
    // @ts-ignore
    postMessage(response_text);
  } catch (err) {
    console.error(err);
  } finally {
    close();
  }
};

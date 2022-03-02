export class Agent {
  private readonly baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get = async <T>(path: string): Promise<T> => {
    const res = await fetch(`${this.baseUrl}${path}`);
    return res.json() as Promise<T>;
  };
}

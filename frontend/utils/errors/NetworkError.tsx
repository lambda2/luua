
export default class NetworkError extends Error {
  body: any;

  constructor(message: string | undefined, body?: any) {

    if (body && body.sucess === false && body.message) {
      super(body.message);
    } else {
      super(message);
    }

    this.name = 'NetworkError';
    this.body = body;
  }
}
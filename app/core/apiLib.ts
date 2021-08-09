import { BlitzApiResponse } from '@blitzjs/core';

export function setUpRequest(res: BlitzApiResponse, message: any): BlitzApiResponse {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(message));
  return res;
}

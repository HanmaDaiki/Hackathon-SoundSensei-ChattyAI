import { APIResponseTypeGet } from '../interfaces/APIResponseTypeGet';
import { APIResponseTypePost } from '../interfaces/APIResponseTypePost';

const API_KEY_ID = 'rWfRbX6HsBLzPdQi';
const API_KEY_SECRET = 'TbYnMRWb2d7rLqgn';

type TranscriptionResultType = 1 | 2 | 3 | 4;

class ApiSpeechFlow {
  readonly baseURL: string = 'https://api.speechflow.io';
  readonly queryResultPath: string = '/asr/file/v1/query';
  readonly postPath = '/asr/file/v1/create';
  readonly apiKeyId: string;
  readonly apiKeySecret: string;

  constructor(apiKeyId: string, apiKeySecret: string) {
    this.apiKeyId = apiKeyId;
    this.apiKeySecret = apiKeySecret;
  }

  postTranscription(formData: FormData) {
    console.log(formData);
    return fetch(`${this.baseURL}${this.postPath}`, {
      method: 'POST',
      headers: {
        keyId: this.apiKeyId,
        keySecret: this.apiKeySecret,
        mode: 'no-cors',
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        return data as Promise<APIResponseTypePost>;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  queryTranscriptionResult(taskId: string, resultType: TranscriptionResultType) {
    return fetch(`${this.baseURL}${this.queryResultPath}/?taskId=${taskId}&resultType=${resultType}`, {
      method: 'GET',
      headers: {
        keyId: this.apiKeyId,
        keySecret: this.apiKeySecret,
        mode: 'no-cors',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data as Promise<APIResponseTypeGet>;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export const apiSpeechFlow = new ApiSpeechFlow(API_KEY_ID || "", API_KEY_SECRET || "");

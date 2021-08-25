import {
  TTweetv2Expansion,
  TTweetv2MediaField,
  TTweetv2TweetField,
  TTweetv2UserField,
  Tweetv2SearchParams,
} from 'twitter-api-v2';
import { TwitterMediaType } from '..';

export class TwitterParamsV2Support {
  buildParams(mediaType: TwitterMediaType): Partial<Tweetv2SearchParams> {
    let params = {
      'tweet.fields': this.tweetFileds(),
      expansions: this.expansions(mediaType),
      'user.fields': this.userFileds(),
    };

    if (mediaType !== TwitterMediaType.UNSPECIFED_TYPE) {
      params = Object.assign(params, { 'media.fields': this.mediaFileds() });
    }

    return params;
  }

  private expansions(mediaType: TwitterMediaType): TTweetv2Expansion[] {
    let data: TTweetv2Expansion[] = ['author_id', 'entities.mentions.username'];

    if (mediaType !== TwitterMediaType.UNSPECIFED_TYPE) {
      data = [...data, 'attachments.media_keys'];
    }

    return data;
  }

  private mediaFileds(): TTweetv2MediaField[] {
    return ['media_key', 'type', 'url'];
  }

  private tweetFileds(): TTweetv2TweetField[] {
    return ['entities', 'created_at', 'author_id'];
  }

  private userFileds(): TTweetv2UserField[] {
    return ['entities'];
  }
}

/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import web_webview from '@ohos.web.webview';

export interface Cookie {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  version?: string;
  expires?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

export interface Cookies {
  [key: string]: Cookie;
}

export class CookiesModule extends TurboModule {

 clearAll(useWebKit?: boolean): Promise<boolean> {
    try {
      if (useWebKit) {
        web_webview.WebCookieManager.clearAllCookies();
      } else {
        web_webview.WebCookieManager.clearAllCookiesSync();
      }
      return new Promise((resolve) => {
        resolve(true);
      });
    } catch (error) {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
  }

  async get(url: string, useWebKit?: boolean): Promise<Cookies> {
    if ((url === '') || (url === undefined) || (url === null)) {
      return new Promise((resolve) => {
        let cookies: Cookies = { 'cookies': {name: 'error', value: 'url有误'} };
        resolve(cookies);
      });
    }
    try {
      let result: string = '';
      if (useWebKit) {
        result = await web_webview.WebCookieManager.fetchCookie(url);
      } else {
        result =  web_webview.WebCookieManager.fetchCookieSync(url);
      }
      return new Promise((resolve) => {
        if (result === '') {
          let cookies: Cookies = { 'cookies': {name: 'error', value: '未查询到cookie'} };
          resolve(cookies);
        } else {
          let queryCookieArray: Array<string> = result.split(';');
          let cookies: Cookies = {};
          for (let i = 0 ; i < queryCookieArray.length; i++) {
            let name = queryCookieArray[i].split('=')[0];
            let value = queryCookieArray[i].split('=')[1];
            cookies[name] = { name: name, value: value } as Cookie;
          }
          resolve(cookies);
        }
      });
    } catch (error) {
      return new Promise((resolve) => {
        let cookies: Cookies = { 'cookie': {name: 'error', value: JSON.stringify(error)} }
        resolve(cookies);
      });
    }
  }

  async set(url: string, cookie: Cookie, useWebKit?: boolean): Promise<boolean>{
    try {
      if (useWebKit) {
        await web_webview.WebCookieManager.configCookie(url, cookie.name + '=' + cookie.value);
      } else {
        web_webview.WebCookieManager.configCookieSync(url, cookie.name + '=' + cookie.value);
      }
      return new Promise((resolve) => {
        resolve(true);
      });
    } catch(error) {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
  }

  async clearByName(url: string, name: string, useWebKit?: boolean): Promise<boolean>{
    if ((url === '') || (url === undefined) || (url === null)) {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
    try {
      let cookieExist = false;
      let cookieStr: string = '';
      let cookies: Array<string> = [];
      if (useWebKit) {
         cookieStr = await web_webview.WebCookieManager.fetchCookie(url);
      } else {
        cookieStr = web_webview.WebCookieManager.fetchCookieSync(url);
      }
      cookies = cookieStr.split(';');
      for (let i = 0 ; i < cookies.length; i++) {
        if (cookies[i].split('=')[0].trim() === name) {
          cookieExist = true;
          cookies.splice(i, 1);
        }
      }
      if (!cookieExist) {
        return new Promise((resolve) => {
          resolve(true);
        });
      }
      if (useWebKit) {
        await web_webview.WebCookieManager.clearAllCookies();
      } else {
        web_webview.WebCookieManager.clearAllCookiesSync();
      }
      cookies.forEach((item) => {
        web_webview.WebCookieManager.configCookie(url, item);
      })
      return new Promise((resolve) => {
        resolve(true);
      });
    } catch(error) {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
  }

  flushForHarmony(func: Function): Promise<boolean>{
    try {
      return new Promise((resolve) => {
        func();
        resolve(true);
      });
    } catch(error) {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
  }

  removeSessionCookies(): Promise<boolean>{
    try {
      web_webview.WebCookieManager.clearSessionCookieSync();
      return new Promise((resolve) => {
        resolve(true);
      });
    } catch(error) {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
  }
}

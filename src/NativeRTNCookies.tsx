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

import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry, NativeModules, Platform } from "react-native";

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

export interface Spec extends TurboModule {
  clearAll(useWebKit: boolean): Promise<boolean>;
  get(url: string, useWebKit?: boolean): Promise<Cookies>;
  set(url: string, cookie: Cookie, useWebKit?: boolean): Promise<boolean>;
  clearByName(url: string, name: string, useWebKit?: boolean): Promise<boolean>;
  flush(func: Function): Promise<boolean>;
  removeSessionCookies(): Promise<boolean>;
}

const RTNCookies = TurboModuleRegistry.getEnforcing<Spec>('RTNCookies');
export default RTNCookies;
// Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
// Use of this source code is governed by a Apache-2.0 license that can be
// found in the LICENSE file.

import { RNPackage, TurboModulesFactory } from '@rnoh/react-native-openharmony/ts';
import type { TurboModule, TurboModuleContext } from '@rnoh/react-native-openharmony/ts';
import { CookiesModule } from './CookiesModule';

class CookiesModulesFactory extends TurboModulesFactory {
  createTurboModule(name: string): TurboModule | null {
    if (name === 'RTNCookies') {
      return new CookiesModule(this.ctx)
    }
    return null;
  }

  hasTurboModule(name: string): boolean {
    return name === 'RTNCookies';
  }
}

export class CookiesPackage extends RNPackage {
  createTurboModulesFactory(ctx: TurboModuleContext): TurboModulesFactory {
    return new CookiesModulesFactory(ctx);
  }
}

/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.

 * Licensed under the The MIT License (MIT) (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * https://github.com/react-native-cookies/cookies/blob/master/LICENSE

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#pragma once
#include "RNOH/ArkTSTurboModule.h"

namespace rnoh {
    class JSI_EXPORT RTNCookiesTurboModule : public ArkTSTurboModule {
    public:
        RTNCookiesTurboModule(const ArkTSTurboModule::Context ctx, const std::string name);
    };
} // namespace rnoh

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

#include "CookiesTurboModule.h"
#include "RNOH/ArkTSTurboModule.h"

using namespace rnoh;
using namespace facebook;

static jsi::Value __hostFunction_RTNCookiesTurboModule_get(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                           const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "get", args, count);
}

static jsi::Value __hostFunction_RTNCookiesTurboModule_set(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                           const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "set", args, count);
}

static jsi::Value __hostFunction_RTNCookiesTurboModule_clearByName(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                   const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "clearByName", args, count);
}

static jsi::Value __hostFunction_RTNCookiesTurboModule_clearAll(jsi::Runtime &rt, react::TurboModule &turboModule,
                                                                const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "clearAll", args, count);
}

static jsi::Value __hostFunction_RTNCookiesTurboModule_removeSessionCookies(jsi::Runtime &rt,
                                                                            react::TurboModule &turboModule,
                                                                            const jsi::Value *args, size_t count) {
    return static_cast<ArkTSTurboModule &>(turboModule).callAsync(rt, "removeSessionCookies", args, count);
}


RTNCookiesTurboModule::RTNCookiesTurboModule(const ArkTSTurboModule::Context ctx, const std::string name)
    : ArkTSTurboModule(ctx, name) {
    methodMap_["get"] = MethodMetadata{2, __hostFunction_RTNCookiesTurboModule_get};
    methodMap_["set"] = MethodMetadata{3, __hostFunction_RTNCookiesTurboModule_set};
    methodMap_["clearByName"] = MethodMetadata{3, __hostFunction_RTNCookiesTurboModule_clearByName};
    methodMap_["clearAll"] = MethodMetadata{1, __hostFunction_RTNCookiesTurboModule_clearAll};
    methodMap_["removeSessionCookies"] = MethodMetadata{0, __hostFunction_RTNCookiesTurboModule_removeSessionCookies};
}

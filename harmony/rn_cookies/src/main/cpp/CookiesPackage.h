// Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
// Use of this source code is governed by a Apache-2.0 license that can be
// found in the LICENSE file.

#include "RNOH/Package.h"
#include "CookiesTurboModule.h"

using namespace rnoh;
using namespace facebook;
class NativeRTNCookiesFactoryDelegate : public TurboModuleFactoryDelegate {
public:
    SharedTurboModule createTurboModule(Context ctx, const std::string &name) const override {
        if (name == "RTNCookies") {
            return std::make_shared<RTNCookiesTurboModule>(ctx, name);
        }
        return nullptr;
    }
};

namespace rnoh {
    class CookiesPackage : public Package {
    public:
        CookiesPackage(Package::Context ctx) : Package(ctx) {}
        std::unique_ptr<TurboModuleFactoryDelegate> createTurboModuleFactoryDelegate() override {
            return std::make_unique<NativeRTNCookiesFactoryDelegate>();
        }
    };
} // namespace rnoh

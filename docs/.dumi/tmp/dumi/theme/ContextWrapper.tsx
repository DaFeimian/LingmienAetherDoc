// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React, { useState, useEffect, useRef } from 'react';
import { useOutlet, history } from 'dumi';
import { warning } from 'C:/Users/Administrator/LingmienAether/node_modules/rc-util';
import { SiteContext, type ISiteContext } from 'C:/Users/Administrator/LingmienAether/node_modules/dumi/dist/client/theme-api/context.js';
import { components } from '../meta/atoms';
import { locales } from '../locales/config';



const entryExports = {
};

// Static content
const pkg = {"name":"LingmienAether","description":"Minecraft China by Netease.","version":"0.0.2","license":"MIT","authors":["santsue@dafeimian.com"]};
const historyType = "browser";
const hostname = undefined;
const themeConfig = {"footer":"Lingmien Aether","prefersColor":{"default":"light","switch":true},"nprogress":true,"lastUpdated":true,"name":"灵免以太","logo":"/logo.png","showLineNum":true,"socialLinks":{"github":"https://github.com/DaFeimian"}};
const _2_level_nav_available = true;

export default function DumiContextWrapper() {
  const outlet = useOutlet();
  const [loading, setLoading] = useState(false);
  const prev = useRef(history.location.pathname);

  useEffect(() => {
    return history.listen((next) => {
      if (next.location.pathname !== prev.current) {
        prev.current = next.location.pathname;

        // scroll to top when route changed
        document.documentElement.scrollTo(0, 0);
      }
    });
  }, []);

  const context: ISiteContext = React.useMemo(() => {
    const ctx = {
      pkg,
      historyType,
      entryExports,
      demos: null,
      components,
      locales,
      loading,
      setLoading,
      hostname,
      themeConfig,
      _2_level_nav_available,
    };

    // Proxy do not warning since `Object.keys` will get nothing to loop
    Object.defineProperty(ctx, 'demos', {
      get: () => {
        warning(false, '`demos` return empty in latest version, please use `useDemo` instead.');
        return {};
      },
    });

    return ctx;
  }, [
    pkg,
    historyType,
    entryExports,
    components,
    locales,
    loading,
    setLoading,
    hostname,
    themeConfig,
    _2_level_nav_available,
  ]);

  return (
    <SiteContext.Provider value={context}>
      {outlet}
    </SiteContext.Provider>
  );
}

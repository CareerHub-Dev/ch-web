import { useEffect } from "react";

export function useOneSignal() {
  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: "2d563298-b878-4a25-8ac6-f7fd8b5c467d",
        notifyButton: {
          enable: true,
        },

        allowLocalhostAsSecureOrigin: true,
      });
    });

    return () => {
      window.OneSignal = undefined;
    };
  }, []); // <-- run this effect once on mount
}

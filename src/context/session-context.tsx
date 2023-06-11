import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { LocalGateway } from "@/lib/api/account";
import { SessionData } from "@/lib/schemas/SessionData";
import {
  createContext,
  ReactNode,
  useReducer,
//   useEffect,
//   useCallback,
} from "react";
import createAxiosInstance from "@/lib/axios/create-instance";
import axios, { AxiosInstance } from "axios";
// import { useBoolean } from "usehooks-ts";
// import OneSignal from "react-onesignal";

type SessionContextState =
  | { status: "unauthenticated"; data: null }
  | {
      status: "loading";
      data: null;
    }
  | {
      status: "authenticated";
      data: SessionData;
    };

type SessionContextAction =
  | { type: "UPDATE"; data: SessionData }
  | { type: "RESET" };

type SessionContextData = SessionContextState & {
  axios: AxiosInstance;
  logout: () => void;
  login: (session: SessionData) => void;
  refreshToken: () => void;
  refreshTokenAsync: () => Promise<SessionData>;
};

const sessionContextInitialState: SessionContextState = {
  status: "loading",
  data: null,
};

export const SessionContext = createContext<SessionContextData>({
  ...sessionContextInitialState,
  axios: axios.create(),
  logout: () => {},
  login: () => {},
  refreshToken: () => {},
  refreshTokenAsync: () => new Promise(() => {}),
});

function sessionStateReducer(
  state: SessionContextState,
  action: SessionContextAction
): SessionContextState {
  switch (action.type) {
    case "UPDATE":
      return {
        status: "authenticated",
        data: action.data,
      };
    case "RESET":
      return {
        status: "unauthenticated",
        data: null,
      };
    default:
      return { ...state };
  }
}

export function SessionContextProvider({ children }: { children: ReactNode }) {
  const { replace } = useRouter();
//   const oneSignalInitialized = useBoolean(false);
  const [state, dispatch] = useReducer(
    sessionStateReducer,
    sessionContextInitialState
  );

//   const initializeOneSignal = useCallback(async () => {
//     if (oneSignalInitialized.value) {
//       return;
//     }
//     await OneSignal.init({
//       appId: process.env.ONE_SIGNAL_APP_ID,
//       notifyButton: {
//         enable: true,
//       },
//       allowLocalhostAsSecureOrigin: true,
//     });
//     oneSignalInitialized.setTrue();
//   }, [oneSignalInitialized]);

  useQuery({
    queryKey: ["session"],
    queryFn: LocalGateway.getMe,
    onError() {
      dispatch({ type: "RESET" });
    },
    onSuccess(data) {
      dispatch({ type: "UPDATE", data });
    },
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: LocalGateway.logout,
    onSuccess() {
      dispatch({ type: "RESET" });
    },
  });

  const refreshTokenMutation = useMutation({
    mutationFn: LocalGateway.refreshToken,
    onSuccess(data) {
      dispatch({ type: "UPDATE", data });
    },
    onError() {
      dispatch({ type: "RESET" });
      replace("/auth/login");
    },
  });

  const logout = () => {
    logoutMutation.mutate();
    // oneSignalInitialized.setFalse();
    replace("/auth/login");
  };

  const refreshToken = () => {
    if (state.data?.refreshToken) {
      refreshTokenMutation.mutate(state.data.refreshToken);
    }
  };

  const refreshTokenAsync = () => {
    return refreshTokenMutation.mutateAsync(state.data?.refreshToken ?? "");
  };

  const login = (data: SessionData) => {
    dispatch({ type: "UPDATE", data });
    // initializeOneSignal();
  };

//   useEffect(() => {
//     if (state.status === "authenticated" && !oneSignalInitialized.value) {
//       initializeOneSignal();
//     }
//   }, [state.status, oneSignalInitialized.value, initializeOneSignal]);

  const instance = createAxiosInstance({
    data: state.data,
    refreshToken: refreshTokenAsync,
  });

  const contextValue: SessionContextData = {
    ...state,
    axios: instance,
    logout,
    login,
    refreshToken,
    refreshTokenAsync,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}

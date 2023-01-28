import React, { createContext, useCallback, useMemo, useState } from "react";
import tw from "twin.macro";
import { noop } from "../../components/utils";
import { Toast } from "../../components/atoms";
import { IToast } from "../../components/atoms/toast/Toast";
import { AnimatePresence } from "framer-motion";

interface IToastContext {
  show: (toastConfig: Pick<IToast, "id" | "message" | "type">) => void;
}

export const ToastContext = createContext<IToastContext>({
  show: noop,
});

export const ToastContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  //TODO: fix first element delete issue
  const close = (id: string) => {
    const newArr = [...toasts.filter((toast) => toast.id !== id)];
    setToasts(newArr);
  };

  const show = useCallback(
    (toastConfig: Pick<IToast, "id" | "message" | "type">) => {
      const isUnique =
        toasts.findIndex((toast) => toast.id === toastConfig.id) === -1;
      isUnique && setToasts([...toasts, { ...toastConfig, close }]);
    },
    [toasts]
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div tw="absolute right-4 top-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

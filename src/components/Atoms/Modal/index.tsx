"use client";

// icons
import { XMarkIcon } from "@heroicons/react/24/outline";

// types
import type { TModalProps } from "./types";

// radix: components
import * as Dialog from "@radix-ui/react-dialog";

// ::
const Modal = ({ children, modalTrigger, open, setModalOpen }: TModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={setModalOpen}>
      <Dialog.Trigger asChild>{modalTrigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="z-20 fixed inset-0 bg-slate-900/80 motion-safe:animate-blurIn" />
        <Dialog.Content className="z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-xl flex min-h-screen items-center justify-center text-black dark:text-white">
          <div className="relative min-h-[400px] w-full rounded-md bg-white p-4 shadow-xl motion-safe:animate-fadeIn dark:bg-black-piano-1 md:max-w-2xl">
            <Dialog.Close className="absolute top-5 right-5">
              <XMarkIcon className="h-5 w-5" />
            </Dialog.Close>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: ReactNode }) => {
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById("portal");
    if (element) {
      setPortal(element);
    }
  }, []);
  return portal && createPortal(children, portal);
};

export default Modal;


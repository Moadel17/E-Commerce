import { createContext, useEffect, useState } from "react";

export const Window = createContext(null);

export default function WindowContext({ children }) {
  const [isWindow, setIsWindow] = useState(window.innerWidth);

  useEffect(() => {
    function windowSize() {
      setIsWindow(window.innerWidth);
    }
    window.addEventListener("resize", windowSize);

    return () => {
      window.removeEventListener("resize", windowSize);
    };
  }, []);

  return <Window.Provider value={{ isWindow }}>{children}</Window.Provider>;
}

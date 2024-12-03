import { useEffect, useState } from "react";

export function Toast({ message, type, duration }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      if (duration) {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, duration);

        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [message, duration]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 right-0 m-5 p-5 text-white ${typeStyles[type]}`}
    >
      {message}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-0 right-0 p-2"
      >
        X
      </button>
    </div>
  );
}

const typeStyles = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
};

import { useEffect } from "react";

export function useKeyPress(keyPressed, functionToRun) {
  useEffect(
    function () {
      function callback(e) {
        console.log(e);
        // if the key pressed is the same as keyPressed
        if (e.code.toLowerCase() === keyPressed.toLowerCase()) {
          functionToRun(e);
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [functionToRun, keyPressed]
  );
}

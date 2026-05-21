import { useState } from "react";
import "./App.scss";
import Display from "./components/display/Display";
import Button from "./components/button/button";
import Sidebar from "./components/sidebar/Sidebar";

function Hero() {
  const [display, setDisplay] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [sidebarDisplay, setSidebarDisplay] = useState("");

  const buttons = [
    { id: "ce", value: "CE", type: "action" },
    { id: "c", value: "C", type: "action" },
    { id: "delete", value: "Del", type: "action" },
    { id: "division", value: "/", type: "operator" },

    { id: 7, value: "7", type: "number" },
    { id: 8, value: "8", type: "number" },
    { id: 9, value: "9", type: "number" },
    { id: "multiplication", value: "*", type: "operator" },

    { id: 4, value: "4", type: "number" },
    { id: 5, value: "5", type: "number" },
    { id: 6, value: "6", type: "number" },
    { id: "subtraction", value: "-", type: "operator" },

    { id: 1, value: "1", type: "number" },
    { id: 2, value: "2", type: "number" },
    { id: 3, value: "3", type: "number" },
    { id: "add", value: "+", type: "operator" },

    { id: "plus&minus", value: "+/-", type: "action" },
    { id: 0, value: "0", type: "number" },
    { id: "comma", value: ",", type: "action" },
    { id: "equal", value: "=", type: "action" },
  ];

  const HandleButton = (id) => {
    const button = buttons.find((btn) => btn.id === id);

    if (!button) return;

    const { value, type } = button;
    const lastChar = display.slice(-1);
    const operators = ["+", "-", "*", "/"];

    if (type === "number") {
      if (isFinished) {
        setDisplay(value);
        setIsFinished(false);
      } else {
        setDisplay((prev) => prev + value);
      }
    } else if (type === "operator") {
      setIsFinished(false);

      if (display === "" && value !== "-") return;

      if (operators.includes(lastChar)) {
        setDisplay((prev) => prev.slice(0, -1) + value);
      } else {
        setDisplay((prev) => prev + value);
      }
    } else if (type === "action") {
      if (id === "c" || id === "ce") {
        setDisplay("");
        setSidebarDisplay("");
        setIsFinished(false);
      } else if (id === "delete") {
        setDisplay((prev) => prev.slice(0, -1));
      } else if (id === "comma") {
        const parts = display.split(/[+\-*/]/);
        const lastNummer = parts[parts.length - 1];

        if (!lastNummer.includes(".")) {
          if (display === "" || isFinished) {
            setDisplay("0.");
            setIsFinished(false);
          } else {
            setDisplay((prev) => prev + ".");
          }
        }
      } else if (id === "plus&minus") {
        if (display === "" || display === "0") return;
        setDisplay((prev) =>
          prev.startsWith("-") ? prev.slice(1) : "-" + prev,
        );
      } else if (id === "equal") {
        if (display === "" || operators.includes(lastChar)) return;

        try {
          const result = eval(display);
          const formattedResult = Number(result.toFixed(8)).toString();

          const entry = `${display} = ${formattedResult}`;

          setSidebarDisplay((prev) => [entry, ...prev]);

          setDisplay(formattedResult);
          setIsFinished(true);
        } catch (error) {
          setDisplay("Fehler");
          setIsFinished(true);
        }
      }
    }
  };

  return (
    <div className="render">
      <div className="render__items">
        <Display value={display} />

        <div className="render__button">
          {buttons.map((btn) => (
            <Button
              key={btn.id}
              value={btn.value}
              type={btn.type}
              onClick={() => HandleButton(btn.id)}
            />
          ))}
        </div>
      </div>

      <div className="render__siderbar">
        <Sidebar history={sidebarDisplay} />
      </div>
    </div>
  );
}

export default Hero;

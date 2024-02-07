import { useState } from "react";
import "./index";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordian data={faqs} />;
    </div>
  );
}

function Accordian({ data }) {
  const [currOpen, setIsOpen] = useState(null);
  return (
    <div className="accordion">
      {data.map((datas, i) => (
        <AccordianItem
          key={datas.title}
          num={i}
          currOpen={currOpen}
          onOpen={setIsOpen}
          title={datas.title}
        >
          {datas.text}
        </AccordianItem>
      ))}
    </div>
  );
}

function AccordianItem({ num, title, currOpen, onOpen, children }) {
  const isOpen = num === currOpen;
  function handleToggle() {
    if (isOpen) onOpen(null);
    else onOpen(num);
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

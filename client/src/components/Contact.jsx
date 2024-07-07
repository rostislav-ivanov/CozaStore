import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    console.log("On mount or update");

    return () => {
      console.log("On unmount");
    };
  }, []);

  return (
    <div>
      <h1>Contact</h1>
      <h1>Contact</h1>
      <h1>Contact</h1>
      <h1>Contact</h1>
    </div>
  );
}

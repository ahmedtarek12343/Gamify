import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);
const AuthLoading = () => {
  useGSAP(() => {
    let split = new SplitText(".text-6xl", { type: "chars", mask: "chars" });
    gsap.from(split.chars, {
      y: 30,
      opacity: 0,
      stagger: 0.04,
    });
  });
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-6xl font-bold">Gamify</p>
    </div>
  );
};

export default AuthLoading;

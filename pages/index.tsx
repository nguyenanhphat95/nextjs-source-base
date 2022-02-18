import React from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  const _redirect = (step: string) => {
    router.push({
      query: {
        step,
      },
    });
  };
  return (
    <div>
      <div onClick={() => _redirect("step1")}>Step 1</div>
      <div onClick={() => _redirect("step2")}>Step 2</div>
      <div onClick={() => _redirect("step3")}>Step 3</div>
    </div>
  );
};
export default Home;

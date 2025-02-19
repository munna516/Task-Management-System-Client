import { FadeLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] mt-14">
      <div className="">
        <FadeLoader color="#1652c0" height={20} radius={2} width={6} />
      </div>
      <div></div>
    </div>
  );
};

export default Loading;

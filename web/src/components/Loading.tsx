import { PacmanLoader } from "react-spinners"

interface LoadingProps {
  size?: number;
  load: boolean;
}

export const Loading = ({ size, load }: LoadingProps) => {
  return (
    <div className={load ? `hidden` : `flex justify-center items-center w-full h-full`}>
      <PacmanLoader size={size} color="#ffe737"/>
    </div>
  )
}

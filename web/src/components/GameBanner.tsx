import { Link } from "react-router-dom";

interface GameBannerProps {
  gameId: string;
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <Link to={`/games/${props.gameId}/ads`} className="relative">
      <img src={props.bannerUrl} alt={`Banner of ${props.title}`} />

      <div className="w-72 pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0">
        <strong className="font-bold text-white block">{props.title}</strong>
        <span className="text-zinc-300 text-sm block">
          {props.adsCount} anúncios
        </span>
      </div>
    </Link>
  );
}

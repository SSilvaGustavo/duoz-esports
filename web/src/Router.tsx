import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { GameAd } from "./pages/GameAd";
import { NotFound } from "./pages/404";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games/:gameId/ads" element={<GameAd />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

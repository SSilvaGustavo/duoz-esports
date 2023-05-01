import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { GameAd } from "./pages/GameAd";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/games/:gameId/ads" element={<GameAd />}/>
    </Routes>
  )
}

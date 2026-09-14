import { Routes, Route } from "react-router-dom";
import StoryDetails from "./pages/StoryDetails";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateStory from "./pages/CreateStory";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";

import Navbar from "./components/Navbar";
import CursorGlow from "./components/CursorGlow";
import SkyEngine from "./components/SkyEngine";
import ShootingStars from "./components/ShootingStars";
import StarField from "./components/StarField";
import Glitter from "./components/Glitter";
import Parallax from "./components/Parallax";

function App() {
  return (
    <>
      <SkyEngine />
      <CursorGlow />
      <ShootingStars />
      <StarField />
      <Glitter />
      <Parallax />

      <Navbar />

      <Routes>
        <Route
path="/dashboard"
element={<Dashboard />}
/>

<Route
path="/create-story"
element={<CreateStory />}
/>

<Route
path="/stories"
element={<Feed />}
/>

<Route
path="/profile"
element={<Profile />}
/>

<Route
path="/leaderboard"
element={<Leaderboard />}
/>

<Route

path="/"
element={<Home />}
/>

<Route
path="/login"
element={<Login />}
/>

<Route
    path="/story/:id"
    element={<StoryDetails />}
/>

<Route
path="/register"
element={<Register />}
/>

<Route
  path="/feed"
  element={<Feed />}
/>

<Route
    path="/story/:id"
    element={<StoryDetails />}
/>

</Routes>
    </>
  );
}

export default App;
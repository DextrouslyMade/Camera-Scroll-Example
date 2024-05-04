import Image from "next/image";
import WallOfText from "../components/WallOfText";
import VideoShowcase from "../components/VideoShowcase";
export default function Home() {
  return (
    <main>
      <WallOfText />
      <VideoShowcase />
      <WallOfText />
    </main>
  );
}

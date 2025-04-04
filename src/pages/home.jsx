// pages/Home.jsx
import TopSection from "../component/Home/Topsection";
import AISection from "../component/Home/MiddleSection";
import BottomSection from "../component/Home/BottomSection";
import EdgeComet from "../component/Home/Nimbus";
const Home = () => {
  return (
    <main className="w-full overflow-x-hidden">
      <TopSection />
      <AISection />
      <BottomSection />

    </main>
  );
};

export default Home;
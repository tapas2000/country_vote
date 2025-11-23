import VoteLayout from "./layouts/vote";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />

      {/* Main Content */}
      <div className="px-[37px] py-8">
        <VoteLayout />
      </div>
    </div>
  );
};

export default App;

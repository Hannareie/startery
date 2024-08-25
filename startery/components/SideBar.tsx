import { Button } from "./ui/button";

type NavProps = {
  currentStepIndex: number;
  goTo: (index: number) => void;
};

const navPath = [
  { name: "Personal information", nav: 0, step: "Step 1" },
  { name: "Education", nav: 1, step: "Step 2" },
  { name: "Experience", nav: 2, step: "Step 3" },
  { name: "Professional interests", nav: 3, step: "Step 4" },
  { name: "Miscellaneous", nav: 4, step: "Step 5" },
];

const SideBar = ({ currentStepIndex, goTo }: NavProps) => {
  return (
    <div className="absolute top-20 left-0 w-full md:w-[25%] md:relative md:top-0 md:left-0 h-full">
      <nav className="py-5 h-full md:p-5 w-64 bg-gradient-to-b from-sidebar2 to-sidebar1">
        <div className=" text-xl text-white mb-5 mt-8">{`Step ${currentStepIndex + 1}`}</div>
        <ul className="flex justify-center gap-2 md:flex-col">
          {navPath.map((item, index) => (
            <li key={index} className="flex flex-col items-start font-medium">
              <Button
                variant="ghost"
                tabIndex={0}
                onClick={() => goTo(item.nav)}
                className={`text-sm ${
                  currentStepIndex === item.nav ? "text-white" : "text-white/25"
                } md:text-base`}
              >
                {item.name}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;

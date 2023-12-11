import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import LoadingPage from "./views/ui/LoadingPage";
import PopupsPage from "./views/ui/Popups"
import { useState } from "react";
import ToastMessage from "./views/ui/ToastMessage";

const App = () => {
  const isLoadFunc = (isBool) => {
    setIsLoading(isBool)
  }
  const isToastOpenFunc = (openDto) => {
    setOpen(openDto)
  }
  const isPopups = (pops) => {
    setPops(pops)
  }
  
  const routing = useRoutes(ThemeRoutes(isLoadFunc, isToastOpenFunc, isPopups));
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState({
    isOpen: false,
    key: 0,
  });
  const [pops, setPops] = useState({
    isShow: false,
    soakData: []
  })

  return (
    <>
      <ToastMessage data={open}/>
      <LoadingPage isLoad={isLoading}/>
      <PopupsPage isPopup={pops} />
      <div className="dark">
        {routing}
      </div>
    </>
  )
};

export default App;

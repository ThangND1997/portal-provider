import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import LoadingPage from "./views/ui/LoadingPage";
import { useState } from "react";
import ToastMessage from "./views/ui/ToastMessage";

const App = () => {
  const isLoadFunc = (isBool) => {
    setIsLoading(isBool)
  }
  const isToastOpenFunc = (openDto) => {
    setOpen(openDto)
  }
  const routing = useRoutes(ThemeRoutes(isLoadFunc, isToastOpenFunc));
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState({
    isOpen: false,
    key: 0,
  });

  return (
    <>
      <ToastMessage data={open}/>
      <LoadingPage isLoad={isLoading}/>
      <div className="dark">{routing}</div>
    </>
  )
};

export default App;

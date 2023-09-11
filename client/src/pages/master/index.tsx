import { useEffect } from "react";
import Clock from "../../component/master-components/left-clock";
import Event from "../../component/master-components/right-event";
import './styleMaster.css'

export default function Master() {

  useEffect(() => {
    disableBackButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const disableBackButton = () => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', () => {
      window.history.pushState(null, document.title, window.location.href);
    });
  };
  return (
      <div className="container-master">
        <Clock />
        <Event />
      </div>
  )
}
import loadingGif from "../../assets/loading.gif";
import "./loading-box.styles.css";

export default function LoadingBox({show}) {
  if(!show) {
    return null
  }
  return (
    <div className="loading-container">
      <img src={loadingGif} alt="loading gif" />
    </div>
  );
}

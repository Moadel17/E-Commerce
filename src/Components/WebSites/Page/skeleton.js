import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeleTon(props) {
  const skeletonShow = Array.from({ length: props.length }).map((_, key) => (
    <div style={{ gap: "20px" }}>
      <div className={props.classes}>
        <Skeleton
          length={props.length}
          height={props.height}
          width={props.width}
        />
      </div>
    </div>
  ));
  return skeletonShow;
}

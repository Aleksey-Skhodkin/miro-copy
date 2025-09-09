import { ROUTES } from "@/shared/model/routes";
import { href, Link } from "react-router-dom";

export function BoardsListPage() {
  return (
    <div>
      Boards List
      <Link to={href(ROUTES.BOARD, { board: "1" })}>Board 1</Link>
      {/* <Link to={ROUTES.BOARD}></Link> */}
    </div>
  );
}

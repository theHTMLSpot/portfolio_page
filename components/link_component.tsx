import { Link as Link_type } from "@/types/ui_types";
import Link from "next/link";

export default function LinkComponent({ ...props }: Readonly<Link_type>) {
  return (
    <Link href={props.href} target={props.target} className={`hover:underline ${props.className}`}>
      {props.children}
    </Link>
  );
}

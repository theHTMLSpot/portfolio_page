import { Container } from "@/types/ui_types";

export default function ContainerComponent({ ...props }: Readonly<Container>) {
  return <div className={props.className}>{props.children}</div>;
}

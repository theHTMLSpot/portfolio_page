import { Container, Paragraph, Link } from "./components";
import { project } from "@/types/project";
import Image from "next/image";

export default function ProjectListing({ project }: { project: project }) {
  return (
    <Container className="m-0 flex w-full flex-col items-start justify-center p-0">
      <Container className="w-full">
        <Image
          src={project.image}
          alt="Decorative Background"
          className="w-full object-cover"
          width={1920}
          height={1080}
          priority
        />
      </Container>

      <Container className="w-full px-6">
        <div className="my-5 flex flex-col justify-between">
          <h3 className="min-h-[3.5rem] text-3xl leading-tight font-bold">
            {project.title}
          </h3>
        </div>

        <Paragraph className="text-foreground mb-10 text-sm">
          {project.description}
        </Paragraph>
        <Link
          href={project.link}
          className="text-foreground underline"
          target="_blank"
        >
          {project.inProgress ? "View Source Code" : "View Live Project"}
        </Link>
      </Container>
    </Container>
  );
}

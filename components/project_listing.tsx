import { Container, Paragraph, Link } from "./components";
import { project } from "@/types/project";
import Image from "next/image";
import BorderColorTitle from "./motion/border-colour";

import { motion } from "framer-motion";

export default function ProjectListing({ project }: { project: project }) {
  return (
    <Container className="m-0 flex w-full flex-col items-start justify-between rounded-xl border border-gray-500 p-10">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-h-sm grid h-1/5 w-full place-items-center transition-all duration-300 ease-in-out hover:scale-102"
      >
        <Image
          src={project.image}
          alt="Decorative Background"
          className="h-auto max-h-full w-full object-cover hover:shadow-lg hover:shadow-teal-600"
          width={1920}
          height={1080}
          priority
        />
      </motion.div>

      <Container className="mt-40 h-1/2 w-full">
        <div className="mb-5 flex h-1/3 flex-col justify-between">
          <BorderColorTitle text={project.title} />
        </div>

        <Paragraph className="text-foreground mb-10 h-1/6 text-sm">
          {project.description}
        </Paragraph>
        <div className="h-12 w-fit overflow-hidden">
          <motion.div
            initial={{ translateY: 200 }}
            animate={{ translateY: 0 }}
            transition={{ duration: 0.1, delay: 1 }}
          >
            <Link
              href={project.link}
              className="text-foreground transition-all duration-300 ease-in-out hover:text-blue-400"
              target="_blank"
            >
              {project.inProgress ? "View Source Code" : "View Live Project"}
            </Link>
          </motion.div>
        </div>
      </Container>
    </Container>
  );
}

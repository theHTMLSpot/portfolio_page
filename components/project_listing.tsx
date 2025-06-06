import { Container, Paragraph, Link } from "./components";
import { project } from "@/types/project";
import Image from "next/image";
import BorderColorTitle from "./motion/border-colour";

import { motion } from "framer-motion";

export default function ProjectListing({ project }: { project: project }) {
  return (
    <Container className="m-0 flex w-full flex-col items-start justify-between border-gray-500 rounded-xl p-10 border">
      <motion.div initial={{scale: 0.8}} animate={{scale:1}} transition={{duration: 0.5, delay: 0.1}} className=" 
      h-1/5  xl:h-1/2 w-full grid place-items-center max-h-sm transition-all duration-300 ease-in-out hover:scale-102">
        <Image
          src={project.image}
          alt="Decorative Background"
          className="w-full h-auto max-h-full object-cover hover:shadow-teal-600 hover:shadow-lg "
          width={1920}
          height={1080}
          priority
        />
      </motion.div>

      <Container className="h-1/2 w-full mt-40 ">
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

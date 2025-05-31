import Image from "next/image";
import { Container, Title } from "@/components/components";

const frontendTechnologies: Record<string, string> = {
  "React": "/react.svg",
  "Next.js": "/next.svg",
  "Tailwind CSS": "/tailwind-css.svg",
  "HTML": "/html.svg",
  "CSS": "/css.svg",
  "JavaScript": "/javascript.svg"
};

const backendTechnologies: Record<string, string> = {
  "Node.js": "/nodejs.svg",
  "FastAPI": "/fastapi-1.svg",
  "Flask": "/flask.svg",
  "Django": "/django.svg",
  "SQLite": "/sqlite.svg",
  "SQLAlchemy": "/sqlalchemy.svg"
};

export default function TechnologiesSection() {
  return (
    <Container className="flex flex-col items-center justify-center w-full h-full p-20 gap-16">
      <Title level={1} className="text-4xl font-bold">Technologies</Title>

      {/* Frontend */}
      <Container className="flex flex-col items-center justify-center w-full gap-6">
        <Title level={2} className="text-2xl font-semibold">Frontend</Title>
        <Container className="flex flex-wrap justify-center gap-10">
          {Object.entries(frontendTechnologies).map(([name, src]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <Image src={src} alt={name} width={60} height={60} />
              <span className="text-foreground text-sm">{name}</span>
            </div>
          ))}
        </Container>
      </Container>

      {/* Backend */}
      <Container className="flex flex-col items-center justify-center w-full gap-6">
        <Title level={2} className="text-2xl font-semibold">Backend</Title>
        <Container className="flex flex-wrap justify-center gap-10">
          {Object.entries(backendTechnologies).map(([name, src]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <Image src={src} alt={name} width={60} height={60} />
              <span className="text-foreground text-sm">{name}</span>
            </div>
          ))}
        </Container>
      </Container>
    </Container>
  );
}

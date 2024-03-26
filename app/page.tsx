import Image from "next/image";
import { ques } from "@/_assets";
import { Button, Container } from "@/_components";
import Link from "next/link";

export const metadata = {
  title: "App Router",
};

export default function Home() {
  return (
    <Container className="pt-[2rem] md:pt-0">
      <div className="w-full h-full min-h-[90vh] center md:flex-row flex-col">
        <section className="center flex-col w-full md:w-1/2">
          <h1 className="text-left text-3xl md:text-5xl font-[500] uppercase mb-5 slide-up" style={{animationDelay: "1s"}}>
            Create your quiz to ask an audience
          </h1>
          <p className="mb-7 text-left text-lg slide-up" style={{animationDelay: "1.5s"}}>
            Create interactive queustions designed for a dynamic group of
            audience, no matter the subject you want to test for knowledge, run
            a quiz with to get useful insight, or help your project.
          </p>
          <Link href={"/view"} className="w-full start slide-up" style={{animationDelay: "2s"}}>
            <Button>Get Started, its free to use!</Button>
          </Link>
        </section>
        <section className="w-full md:w-1/2 center">
          <div className="relative flex items-center justify-center w-[30rem] h-[30rem] slide-up" style={{animationDelay: "2s"}}>
            <Image
              className="absolute object-contain"
              fill
              src={ques}
              alt="A visual prompt for the quiz"
              sizes="(max-width: 768px) 70vw, (max-width: 1200px) 40vw, 33vw"
              quality={50}
            />
          </div>
        </section>
      </div>
    </Container>
  );
}

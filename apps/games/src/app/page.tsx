import Link from "next/link";

import { Card, Heading, Interface } from "~/app/_components/ui";
import Nav from "./_components/nav";

export const runtime = "edge";

export default function HomePage() {
  const games = [
    {
      name: "Exercice de vocabulaire",
      description: "L'orthographe des mots",
      category: "Francais",
      level: "Primaire 2-6",
      link: "/word-spelling",
    },
  ];

  return (
    <>
      <Nav></Nav>

      <main className="flex h-full flex-col items-center ">
        <div className="container mt-4 flex flex-col justify-center px-8 py-8 md:px-0">
          <Heading as="h1" className="my-4">
            Jeux
          </Heading>

          {games.map((game) => (
            <Link href="/word-spelling" key={game.description}>
              <Card className="flex h-80 w-80 cursor-pointer flex-col gap-4 bg-primary-light">
                <div className="my-auto p-2">
                  <Heading as="h4">{game.name}</Heading>
                  <Interface weight="bold">{game.description}</Interface>
                </div>

                <div className="flex justify-between border-t border-dark bg-primary p-2">
                  <Interface>{game.category}</Interface>
                  <Interface>{game.level}</Interface>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

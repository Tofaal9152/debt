"use client";

import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function WeightLossChallenge() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endDate = new Date("2025-04-25T00:00:00");
      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100">
      <header className="bg-blue-600 text-white py-8 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">
          The Great Weight Loss Challenge! 🏋️‍♂️🔥
        </h1>
        <p className="text-xl">
          Will Tofaal reach his goal and claim the kala vuna prize?
        </p>
        <Image
          src="/banner.webp"
          alt="Motivational banner"
          width={800}
          height={200}
          className="mt-4 w-[40rem] h-[20rem] rounded-lg shadow-lg mx-auto"
        />
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Weight</h2>
          <div className="flex justify-between mb-2">
            <span>Current: 75.7 kg</span>
            <span>Goal: 68 kg</span>
          </div>
          <Progress value={50} className="h-4 mb-4" />
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Countdown to April 25, 2025
          </h2>

          <div className="flex flex-wrap gap-4  justify-center mt-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="bg-blue-100 items-center justify-center flex flex-col p-4 flex-1 rounded-lg"
              >
                <div className="text-4xl font-bold text-blue-600">{value}</div>
                <div className="text-sm text-blue-800">{unit}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Challenge Details</h2>
          <p className="mb-4">
            If Tofaal reduces his weight to 68 kg by April 25, he wins kala vuna
            from Naiem and Masum. 🍛
          </p>
          <p className="mb-4">
            If he fails, Tofaal treats Naiem and Masum to a meal worth 1000 BDT.
            🍲
          </p>
          <blockquote className="border-l-4 border-blue-500 pl-4 italic">
            {"No excuses, no shortcuts—just determination!"}
          </blockquote>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">The Prize</h2>
          <div className="flex justify-around items-center">
            <div className="text-center">
              <Image
                src="/naiemMasum.jpg"
                alt="Kala Vuna"
                width={100}
                height={100}
                className="mx-auto mb-2"
              />
              <p>Win Kala Vuna!</p>
            </div>
            <div className="text-4xl font-bold">VS</div>
            <div className="text-center">
              <Image
                src="/tofaal.jpg"
                alt="Meal"
                width={100}
                height={100}
                className="mx-auto mb-2"
              />
              <p>Pay for a meal</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-600 text-white py-8 px-4 text-center">
        <p className="mb-2">Issued Date: January 25, 2025</p>
        <p className="mb-4">Result Date: April 25, 2025</p>
      </footer>
    </div>
  );
}

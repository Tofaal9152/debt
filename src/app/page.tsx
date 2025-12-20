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

  const [penaltyInfo, setPenaltyInfo] = useState({
    isExpired: false,
    currentDebt: 1000,
    monthsPassed: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endDate = new Date("2025-09-15T00:00:00"); // Deadline
      const difference = endDate.getTime() - now.getTime();

      // --- Countdown Logic ---
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setPenaltyInfo((prev) => ({ ...prev, isExpired: false }));
      } 
      // --- Debt / Penalty Logic (Deadline Passed) ---
      else {
        // Calculate months passed since deadline
        const diffTime = Math.abs(difference);
        // Approx 30.44 days per month for calculation
        const monthsPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44)); 
        
        // Compound Interest Formula: A = P(1 + r/100)^n
        // P = 1000, r = 12% (Monthly Interest), n = monthsPassed
        const principal = 1000;
        const rate = 12; // UPDATED: 12% monthly interest rate
        
        const compoundedAmount = principal * Math.pow((1 + rate / 100), monthsPassed);

        setPenaltyInfo({
          isExpired: true,
          currentDebt: Math.floor(compoundedAmount), // Rounding to whole number
          monthsPassed: monthsPassed,
        });
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
          Will Tafseer reach his goal and claim the 5000 tk prize?
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
          <h2 className="text-2xl font-bold mb-4">Weight Progress</h2>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Current: 77.8 kg</span>
            <span className="font-semibold">Goal: 66 kg</span>
          </div>
          <Progress value={50} className="h-4 mb-4" />
        </section>

        {/* Conditional Rendering: Show Countdown OR Debt Alert */}
        {!penaltyInfo.isExpired ? (
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Countdown to September 15, 2025
            </h2>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div
                  key={unit}
                  className="bg-blue-100 items-center justify-center flex flex-col p-4 w-24 rounded-lg shadow-md"
                >
                  <div className="text-4xl font-bold text-blue-600">{value}</div>
                  <div className="text-sm text-blue-800 capitalize">{unit}</div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="bg-red-50 border-2 border-red-500 rounded-lg shadow-xl p-6 mb-8 animate-pulse">
            <h2 className="text-3xl font-bold mb-2 text-red-600 text-center">
              ⚠️ DEADLINE EXPIRED! ⚠️
            </h2>
            <p className="text-center text-gray-700 mb-6">
              Tafseer has lost the challenge timeframe. The penalty is now active!
            </p>
            
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl border border-red-200">
                <p className="text-lg text-gray-600">Initial Penalty: <span className="line-through">1000 tk</span></p>
                <div className="my-2 text-center">
                    <p className="text-sm text-gray-500">Duration Overdue: {penaltyInfo.monthsPassed} Months</p>
                    <p className="text-sm text-red-600 font-bold">Interest Rate: 12% (Compound/Month)</p>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-xl font-semibold text-gray-800">Current Payable Debt:</p>
                    <p className="text-6xl font-extrabold text-red-600 mt-2">
                        ৳{penaltyInfo.currentDebt}
                    </p>
                </div>
                <p className="mt-4 text-xs text-red-400 italic">
                    *Debt increases automatically every month! Pay immediately!
                </p>
            </div>
          </section>
        )}

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Challenge Details</h2>
          <p className="mb-4">
            If Tafseer reduces his weight to 66 kg by September 15, he wins{" "}
            <strong>5000 tk</strong> from Tofaal.
          </p>
          <p className="mb-4">
            If he fails, Tafseer will have to pay <strong>1000 tk</strong> to
            Tofaal. 🍲
          </p>
          
          <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-500 mb-4 text-sm">
             <strong>New Clause:</strong> If the deadline is missed, the 1000 tk penalty will increase via 
             <strong> 12% Compound Interest</strong> (Chokro Briddi Har) every month! 📈
          </div>

          <blockquote className="border-l-4 border-blue-500 pl-4 italic">
            {"No excuses, no shortcuts—just determination!"}
          </blockquote>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">The Prize</h2>
          <div className="flex justify-around items-center">
            <div className="text-center">
              <Image
                src="/Tafseer.jpg"
                alt="Tafseer"
                width={100}
                height={100}
                className="mx-auto mb-2 object-cover rounded-full border-2 border-blue-600"
              />
              <p className="font-semibold text-lg">Win 5000 tk</p>
            </div>
            <div className="text-4xl font-bold">VS</div>
            <div className="text-center">
              <Image
                src="/tofaal.jpg"
                alt="Tofaal"
                width={100}
                height={100}
                className="mx-auto object-cover rounded-full border-2 border-blue-600"
              />
              <p className="font-semibold text-lg">Pay 1000+ tk</p>
            </div>
          </div>
        </section>
        <div className="flex flex-col items-center mt-8">
          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
            <Image
              src="/sign.jpg"
              alt="Signature"
              width={200}
              height={100}
              className="w-48 h-auto object-contain"
            />
          </div>
          <p className="text-gray-600 mt-2 text-sm italic">Signed by Tofaal</p>
        </div>
      </main>

      <footer className="bg-blue-600 text-white py-8 px-4 text-center">
        <p className="mb-2">Issued Date: March 15, 2025</p>
        <p className="mb-4">Result Date: September 15, 2025</p>
      </footer>
    </div>
  );
}
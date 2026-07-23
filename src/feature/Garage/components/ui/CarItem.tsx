import type { UseMutationResult } from "@tanstack/react-query";
import type { Car } from "../../types/car.types";
import { useAppStore } from "../../../../store/useAppStore";
import { useRef } from "react";
import { driveCar, toggleEngine } from "../../api/garage.api";
import { ENGINE_STATUS } from "../../../../utils/constants";
import { saveWinnerResult } from "../../../winners/api/winners.api";

type CarItemProps = {
  car: Car;
  deleteMutation: UseMutationResult<void, Error, number, unknown>;
};

const CarItem = ({ car, deleteMutation }: CarItemProps) => {
  const { setSelectedCarId, setUpdateCarName, setUpdateCarColor } = useAppStore();

  const handleSelect = () => {
    setSelectedCarId(car.id);
    setUpdateCarName(car.name);
    setUpdateCarColor(car.color);
  };

  const { movingCars, setMovingCar } = useAppStore();
  const carRef = useRef<HTMLDivElement>(null); // მანქანის DOM ელემენტის რეფი
  const animationRef = useRef<Animation | null>(null); // ანიმაციის კონტროლისთვის

  const isMoving = movingCars[car.id] || false;

  const handleStart = async () => {
    try {
      setMovingCar(car.id, true); // ვთიშავთ Start ღილაკს

      // 1. ვრთავთ ძრავს და ვითვლით დროს
      const { velocity, distance } = await toggleEngine(car.id, ENGINE_STATUS.STARTED);
      const timeMs = Math.round(distance / velocity);

      // 2. ვიწყებთ ანიმაციას Web Animations API-ით
      if (carRef.current) {
        animationRef.current = carRef.current.animate(
          [
            { transform: "translateX(0px)" },
            { transform: `translateX(calc(100vw - 200px))` }, // ფინიშის ხაზი
          ],
          { duration: timeMs, fill: "forwards" },
        );
      }

      // 3. ვაგზავნით Drive რექვესთს პარალელურად
      await driveCar(car.id);

      const timeSeconds = timeMs / 1000;
      await saveWinnerResult(car.id, timeSeconds);

      // თუ Drive წარმატებით დასრულდა და პირველი მივიდა, აქ ემატება Winners ლოგიკა
    } catch (error) {
      console.warn("Engine failed:", error);
      // 4. თუ ძრავი გაფუჭდა (500), ვაჩერებთ ანიმაციას ადგილზე
      if (animationRef.current) {
        animationRef.current.pause();
      }
    }
  };

  const handleStop = async () => {
    try {
      // 1. ვაჩერებთ API-ს
      await toggleEngine(car.id, ENGINE_STATUS.STOPPED);

      // 2. ვანულებთ ანიმაციას და ვაბრუნებთ საწყის პოზიციაზე
      if (animationRef.current) {
        animationRef.current.cancel();
      }

      // 3. ვრთავთ Start ღილაკს
      setMovingCar(car.id, false);
    } catch (error) {
      console.warn("Stop failed:", error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 py-2 justify-between">
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: car.color }} />

        <p>{car.name} </p>

        <button
          onClick={() => deleteMutation.mutate(car.id)}
          className="text-white bg-red-500 cursor-pointer rounded-sm ml-10"
        >
          Delete
        </button>

        <button
          className="cursor-pointer text-white bg-green-700 rounded-sm"
          onClick={handleSelect}
        >
          SELECT
        </button>
      </div>

      <div className="track ">
        <div className="controls space-x-1 ">
          <button className="cursor-pointer" onClick={handleStart} disabled={isMoving}>
            START
          </button>
          <button className="cursor-pointer" onClick={handleStop} disabled={!isMoving}>
            STOP
          </button>
        </div>

        <div className="car-wrapper">
          {/* მანქანის იკონი რეფით */}
          <div ref={carRef} className="car-icon">
            🚗 {car.name}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarItem;

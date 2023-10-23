import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Clock from "./clock";
import Weather from "./weather";

const ClockAndWeather = () => {
  return (
    <Card className="border-0 shadow-none w-full">
      <CardHeader className="space-y-0">
        <CardTitle className="mx-auto">
          <Clock />
        </CardTitle>
        <CardDescription className="mx-auto">
          <Weather />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ClockAndWeather;

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import GlobeIcon from "./components/globlesvg";
import LocationIcon from "./components/locationsvg";
import SunCloudIcon from "./components/daysvg";
import MoonFastWindIcon from "./components/nightsvg";
import FastWindIcon from "./components/windsvg";
import CalendarIcon from "./components/calendarsvg";
import QuarterPassIcon from "./components/timesvg";
import GithubIcon from "./components/githubsvg";
export default function Home() {
  const [city, setCity] = useState("Lahore");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isloading, setisloading] = useState();
  const [filler, setfiller] = useState("");
  useEffect(() => {
    const clearState = async () => {
      setWeather(null);
      setError(null);
      // await something else if needed
    };

    if (isloading) {
      clearState();
    }
  }, [isloading]);

  // Helper to convert "06:15 AM" to Date object using local date
  const parseTime = (timeStr, localDateStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const [year, month, day] = localDateStr.split(" ")[0].split("-");
    return new Date(year, month - 1, day, hours, minutes);
  };

  const getWeather = async () => {
    setisloading(true);
    try {
      const res = await axios.get(`/api/weather?city=${city}&days=1`);
      const data = res.data;

      // Extract sunrise/sunset/localtime
      const sunrise = data.forecast.forecastday[0].astro.sunrise;
      const sunset = data.forecast.forecastday[0].astro.sunset;
      const localtime = data.location.localtime;

      // Convert times to Date objects
      const sunriseDate = parseTime(sunrise, localtime);
      const sunsetDate = parseTime(sunset, localtime);
      const localDate = new Date(localtime);

      // Custom day/night check
      const isDay = localDate >= sunriseDate && localDate < sunsetDate;
      data.current.is_day = isDay ? 1 : 0;

      setWeather(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError(`There is no " ${city} " in weather's data`);
      setWeather(null);
    } finally {
      setisloading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);
  const fillColor = (temp) => {
    if (temp <= 10) return "#3b82f6"; // Cold - deep blue
    if (temp > 10 && temp <= 20) return "#60a5fa"; // Cool - lighter blue
    if (temp > 20 && temp <= 30) return "#fbbf24"; // Warm - warm yellow/orange
    if (temp > 30 && temp <= 50) return "#f87171"; // Hot - light red
    if (temp > 50) return "#ef4444"; // Very hot - dark red
    return "#ccc"; // fallback gray
  };

  useEffect(() => {
    if (weather && weather.current) {
      setfiller(fillColor(weather.current.temp_c));
    }
  }, [weather]);

  return (
    <>
    <div className="github fixed h-13 w-13 rounded-full flex items-center border-2 cursor-pointer active:scale-[0.96] border-purple-700 justify-center bg-amber-100 bottom-3 z-50 md:top-1.5 right-1.5"><GithubIcon className="w-8 h-8" /></div>
      <div className="heading bg-white/1 rounded-3xl my-3 gap-2 flex items-center justify-center font-bold text-white text-3xl border-white/30 border h-[10%] w-full md:w-[60%] text-shadow-sm text-shadow-purple-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className="w-15 h-15 injected-svg"
          role="img"
          color="#9013fe"
        >
          <path
            opacity="0.4"
            d="M10.25 18.3333C10.25 16.7393 11.3596 15.4236 12.8382 15.0341C13.2519 13.4214 14.7483 12.25 16.5 12.25C18.4264 12.25 20.0468 13.6691 20.2529 15.531C21.6707 15.8517 22.75 17.0887 22.75 18.6C22.75 20.3613 21.2842 21.75 19.525 21.75H13.75C11.8389 21.75 10.25 20.2419 10.25 18.3333Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.25 12C1.25 7.16751 5.16751 3.25 10 3.25C14.3385 3.25 17.9395 6.40754 18.6304 10.5499C18.6784 10.8375 18.7023 10.9813 18.6184 11.0547C18.5344 11.1281 18.3817 11.0811 18.0762 10.9869C17.5757 10.8326 17.0456 10.75 16.5 10.75C16.2134 10.75 15.9227 10.7806 15.6325 10.8376C15.0949 8.21922 12.7774 6.25 10 6.25C6.82436 6.25 4.25 8.82436 4.25 12V15.75H2C1.58579 15.75 1.25 15.4142 1.25 15V12ZM5.75 15.75H8C8.41421 15.75 8.75 15.4142 8.75 15V12C8.75 11.3096 9.30964 10.75 10 10.75C10.6904 10.75 11.25 11.3096 11.25 12V12.278C11.25 12.9833 11.25 13.3359 11.3722 13.3875C11.4944 13.4391 11.7682 13.1728 12.316 12.64L12.316 12.64C12.8453 12.1251 13.4962 11.6641 14.1969 11.3263C13.874 9.29923 12.1179 7.75 10 7.75C7.65279 7.75 5.75 9.65279 5.75 12V15.75Z"
            fill="#9013fe"
          />
        </svg>
        <p>Weather</p>{" "}
        <p className="text-[#9013fe] text-shadow-purple-50 font-extrabold">
          App
        </p>
      </div>
      <div className="bg-white/1 border-1 my-3 py-4 md:py-6 w-full md:w-[60%] h-[88%] md:h-[73%] backdrop-blur-md rounded-4xl border-white/30 shadow-lg px-1 md:px-6  mx-auto text-white">
        <p className="text-center text-[14px] md:text-xl flex flex-wrap items-center justify-center gap-1.5">
          Find the <b>Weather</b> and <b>Day & Dates</b> of any where
          <b className="font-extrabold text-[#9013fe] text-shadow-2xs text-shadow-purple-400">
            City
          </b>
          in this world <GlobeIcon />
        </p>
        <div className="my-2 flex flex-col items-center gap-2 justify-center px-8 md:px-18">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getWeather();
              }
            }}
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="border-2 border-purple-500 focus:border-purple-700 focus:outline-0  rounded-2xl w-full"
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <button
            onClick={getWeather}
            className="bg-purple-500 w-full px-4 py-2 rounded-2xl border-2 border-white cursor-pointer active:scale-[0.96] transition-all hover:bg-white hover:text-purple-500 font-bold"
          >
            Get Weather
          </button>
        </div>
        {error && (
          <p
            className="text-center flex items-center justify-around flex-col text-xl"
            style={{ color: "red" }}
          >
            {error}
            <GlobeIcon size={100} color="#FF00006C" />
          </p>
        )}

        {weather && (
          <div className="all h-[68%] border-2 flex justify-around flex-col border-purple-700 w-full rounded-2xl py-3 md:px-6 px-2">
            <div className="place flex gap-2 items-center justify-between">
              <div className="flex gap-2 items-center">
                <div className="">
                  {" "}
                  <LocationIcon size={30} color="#ffffff" />
                </div>
                <div>
                  <div className="city  ">
                    <p className="text-[23px] font-bold text-shadow-xs text-shadow-purple-700">
                      {weather.location.name}
                    </p>
                    <p className="text-[11px]">{weather.location.country}</p>
                  </div>
                  {/* <div className="country text-[12px]"></div> */}
                </div>
              </div>
              <div className="flex items-center border-2 border-purple-600  bg-purple-500/30  px-4 justify-center rounded-2xl">
                <div className="max-w-1/2">
                  <img
                    src={weather.current.condition.icon}
                    className="w-20 h-20"
                    alt="weather icon"
                  />
                </div>
                <div className="md:text-2xl text-1xl w-[60%] font-bold text-shadow-2xs text-shadow-purple-700">
                  {weather.current.condition.text}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="temperature text-4xl font-bold border-2 border-purple-600 py-3 px-2 bg-purple-500/30  items-center justify-center gap-2 flex flex-col rounded-2xl my-1 min-w-1/2 md:w-[30%] ">
                <div>
                  {weather.current.temp_c} <b className="text-purple-600">°C</b>
                </div>
                <div className="seekbar h-2 w-full rounded-3xl bg-amber-50">
                  <div
                    style={{
                      width: `${weather.current.temp_c}%`,
                      backgroundColor: filler,
                    }}
                    className="filler h-full rounded-2xl"
                  ></div>
                </div>
              </div>
              <div className="font-bold border-2 border-purple-600 py-2 px-2 rounded-2xl  bg-purple-500/30">
                {weather.current.is_day ? (
                  <div className="flex items-center">
                    <SunCloudIcon size={50} color="gold" />
                    <p>Day time</p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <MoonFastWindIcon
                      size={50}
                      color="#050558C0
"
                    />
                    <p>Night time</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-2 md:grid-rows-1 md:grid-cols-4 ">
              <div className="wind flex flex-col bg-purple-600/30 py-2 px-2 border-2 border-purple-600 rounded-2xl">
                <b>Wind</b>
                <div className="flex ">
                  <FastWindIcon size={30} color="purple" />{" "}
                  {weather.current.wind_kph} kph
                </div>
              </div>
              <div className="date bg-purple-600/30 py-2 px-2 border-2 border-purple-600 rounded-2xl">
                {" "}
                <b>Day</b>
                <div className="text-purple-700">
                  {new Date(weather.location.localtime).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                    }
                  )}
                </div>
              </div>
              <div className="time text-purple-700 bg-purple-600/30 py-2 px-2 border-2 border-purple-600 rounded-2xl">
                {" "}
                <QuarterPassIcon size={30} />
                <div>
                  Time:{" "}
                  {new Date(weather.location.localtime).toLocaleString(
                    "en-US",
                    {
                      hour: "numeric", // 5
                      minute: "2-digit", // 05
                      hour12: true,
                    }
                  )}
                </div>
              </div>
              <div className="date text-purple-700 bg-purple-600/30 py-2 px-2 border-2 border-purple-600 rounded-2xl">
                {" "}
                <CalendarIcon size={30} />
                {new Date(weather.location.localtime).toLocaleString("en-US", {
                  year: "numeric", // 2025
                  month: "long", // September
                  day: "numeric", // 15
                })}
              </div>
            </div>
          </div>
        )}
        {isloading && !weather && (
          <div className="flex items-center justify-center border-2 border-purple-700 rounded-2xl h-[68%] w-full">
            <div className="relative flex space-x-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

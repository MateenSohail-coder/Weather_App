import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "Lahore";
  const days = searchParams.get("days") || "1";
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    console.error("Missing WEATHER_API_KEY in environment variables.");
    return new Response(
      JSON.stringify({ error: "API key not configured." }),
      { status: 500 }
    );
  }

  try {
    const response = await axios.get(
      "https://api.weatherapi.com/v1/forecast.json",
      {
        params: {
          key: apiKey,
          q: city,
          days,
          aqi: "yes",
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Weather API error:", error.response?.data || error.message);
    return new Response(
      JSON.stringify({ error: "Failed to fetch weather data" }),
      { status: 500 }
    );
  }
}

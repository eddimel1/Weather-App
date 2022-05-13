export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        WEATHER_API_KEY : string
        UNSPLASH_APP_KEY : string
    }
  }
}
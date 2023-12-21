import { configureStore } from "@reduxjs/toolkit";
import modelRoutes from "./routes/modelRoutes";

export const model = configureStore({
    reducer: modelRoutes
})
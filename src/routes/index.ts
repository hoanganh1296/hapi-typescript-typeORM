import { userRouter } from "./users.routes";
import {authRouter} from "./auth.routes";   

const routes = [...userRouter,...authRouter]

export default routes

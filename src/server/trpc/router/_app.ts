import { router } from "../trpc";
import { diseaseTypeRouter } from "./diseaseType";
import { countryRouter } from "./country";
import { diseaseRouter } from "./disease";
import { discoverRouter } from "./discover";
import { userRouter } from "./user";
import { doctorRouter } from "./doctor";
import { specializeRouter } from './specialize';
import { publicServantRouter } from "./publicServant";
import { recordRouter } from "./record";

export const appRouter = router({
  diseaseType: diseaseTypeRouter,
  country: countryRouter,
  disease: diseaseRouter,
  discover: discoverRouter,
  user: userRouter,
  doctor: doctorRouter,
  specialize: specializeRouter,
  publicServant: publicServantRouter,
  record: recordRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

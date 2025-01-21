import { UserSessionType } from "@/schema/auth";
import { LoginUserType } from "./schema";
import { ActionState } from "@/lib/createSafeAction";

export type InputType = LoginUserType;
export type ReturnType = ActionState<InputType, UserSessionType>;

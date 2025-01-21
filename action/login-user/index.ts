"user server";

import { ActionState } from "@/lib/createSafeAction";
import { InputType, ReturnType } from "./type";

export async function handler(
  input: InputType,
): Promise<ActionState<InputType, ReturnType>> {}

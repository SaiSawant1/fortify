import { ActionState, FieldErrors } from "@/lib/createSafeAction";
import { useCallback, useState } from "react";

type Action<TInput, TOutput> = (
  data: TInput,
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOption<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useSafeAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options?: UseActionOption<TOutput>,
) => {
  const [fieldErros, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >();
  const [data, setData] = useState<TOutput | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        const result = await action(input);
        if (!result) {
          return;
        }
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        if (result.error) {
          options?.onError?.(result.error);
          setError(result.error);
        }
        if (result.data) {
          setData(result.data);
          options?.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options?.onComplete?.();
      }
    },
    [action, options],
  );

  return { data, fieldErros, isLoading, error, execute };
};

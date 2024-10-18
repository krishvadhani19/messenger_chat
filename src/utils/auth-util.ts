import toast from "react-hot-toast";
import { z } from "zod";
import axios from "axios";

const APIRequestSchema = z.object({
  method: z.enum(["POST", "GET", "DELETE", "PATCH"]),
  url: z.string(),
  data: z.any().optional(),
  headers: z.record(z.string()).optional(),
  errorMessage: z.string().optional(),
  onSuccess: z.function().args(z.any()).optional(),
});

type APIRequestSchemaType = z.infer<typeof APIRequestSchema>;

export const APIRequest = async (params: APIRequestSchemaType) => {
  try {
    const validatedParams = APIRequestSchema.parse(params);
    const method = validatedParams.method.toLowerCase();

    const config: any = {
      method,
      url: validatedParams.url,
      headers: {
        "Content-Type": "application/json",
        ...validatedParams.headers,
      },
    };

    if (validatedParams.data && (method === "post" || "patch")) {
      config.data = validatedParams.data;
    }

    const response = await axios(config);

    // Call onSuccess callback (if provided)
    if (validatedParams.onSuccess) {
      validatedParams.onSuccess(response.data);
    }

    return response?.data;
  } catch (error) {
    console.log({ error });

    // Display custom error message if provided, otherwise default message
    const errorMessage = params.errorMessage || "Something went wrong!";
    toast.error(errorMessage);
  }
};

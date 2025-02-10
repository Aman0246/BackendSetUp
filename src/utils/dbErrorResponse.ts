import { ApiResponse } from '../types/types';

export const dbErrorResponse = (
    message: string,
    error?: unknown
): ApiResponse<null> => {
    return {
        success: false,
        message,
        error: error instanceof Error ? error.message : String(error),
    };
};

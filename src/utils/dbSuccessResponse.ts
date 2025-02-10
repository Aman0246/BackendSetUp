import { ApiResponse } from '../types/types';

export const dbSuccessResponse = <T>(
    message: string,
    data: T
): ApiResponse<T> => {
    return {
        success: true,
        message,
        data,
    };
};

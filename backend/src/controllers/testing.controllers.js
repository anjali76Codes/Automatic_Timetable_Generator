import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const testing_logic = asyncHandler(
    async (req, res) => {
        return res
            .status(200)
            .json(new ApiResponse(200, "OK", "Testing Successful"))
    }
);

export { testing_logic };
import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const mediaSchema = {
  title: {
    in: ["body"],
    isString: {
      errorMassage: "Title is a mandatory field and needs to be a string!"
    }
  },
  year: {
    in: ["body"],
    isNumeric: {
      errorMassage: "Year is a mandatory field and needs to be a number!"
    }
  },
  type: {
    in: ["body"],
    isString: {
      errorMassage: "Type is a mandatory field and needs to be a string!"
    }
  }
};

export const checkMediaSchema = checkSchema(mediaSchema);

export const triggerBadRequest = (req, res, next) => {
  const errors = validationResult(req);
  console.log("errors:-", errors.array());
  if (!errors.isEmpty()) {
    next(
      createHttpError(400, "Errors during media validation", {
        errorsList: errors.array()
      })
    );
  } else {
    next();
  }
};

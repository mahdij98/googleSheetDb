import React, { useReducer, useState } from "react";

const reducer = (curVals: any, newVals: any) => {
  const key: any = Object.keys(newVals)[0];
  let validatedVals: any;
  let validated: any = newVals[key];
  switch (key) {
    case "amount":
      validated = validated
        .toString()
        .replace(/[^0-9]/g, "")
        .replace(/^0+/, "");
  }
  validatedVals = { [key]: validated };
  return {
    ...curVals,
    ...validatedVals,
  };
};

const Logic = () => {
  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
  };
  const [formValues, setFormValues] = useReducer(reducer, initialValues);
  const [formErrors, setFormErrors] = useState<any>({});
  const formValidator = (values: any) => {
    let errors: any = {};
    if (!values.amount) {
      errors.amount = "مبلغ نمی‌تواند خالی باشد";
    }
    return errors;
  };

  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({ [name]: value } as any);
    setFormErrors((pre: any) => {
      if (name) {
        const newState = { ...pre };
        delete newState[name];
        return newState;
      }
    });
  };

  const handelModalSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const errors: any = formValidator(formValues);
    const keys = Object.keys(errors).filter((key) => {
      return key === "every" || key === "each";
    });

    const isValid = keys.length === 0;
    if (isValid) {
      console.log(formValues);

      await fetch(
        "https://script.google.com/macros/s/AKfycbwKXEyXEuAOCZ9YWrBgi8Esz7MVP5bdDTj6i6cKafz7iwi8Mc_QuyEHj5rhzlldLPQD/exec",
        {
          method: "POST",
          body: JSON.stringify(formValues),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
    }
  };
  return {
    setFormValues,
    formValues,
    formErrors,
    setFormErrors,
    handelModalSubmit,
    handleFormChange,
  };
};

export default Logic;

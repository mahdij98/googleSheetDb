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
        "https://script.google.com/macros/s/AKfycbxbQXpo1eo72xBOH1EgoXLuYHVVGc1Odd7Dr0-n591P7zmviSfv-cmsV9TTK9LZagff/exec",
        {
          redirect: "follow",
          method: "POST",
          body: JSON.stringify(formValues),
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
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

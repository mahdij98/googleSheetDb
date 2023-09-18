import Logic from "./logic";

const UserForm = () => {
  const { formErrors, formValues, handelModalSubmit, handleFormChange } =
    Logic();

  return (
    <form className="w-full max-w-xl mx-auto mt-44  flex flex-col justify-center items-center gap-12">
      <div className="w-full flex justify-between">
        <label className="text-sm">Name</label>
        <input
          className="rounded-lg border-2 border-t-cyan-900"
          name="name"
          type="text"
          onChange={handleFormChange}
          value={formValues?.name}
        />
        {formErrors.Name ? (
          <span className="w-[95%] text-sm text-[#FF0000]">
            {formErrors.Name}
          </span>
        ) : null}
      </div>
      <div className="w-full flex justify-between items-center">
        <label className="text-sm">Email</label>
        <input
          className="rounded-lg border-2 border-t-cyan-900"
          name="email"
          type="email"
          onChange={handleFormChange}
          value={formValues?.email}
        />
        {formErrors.Email ? (
          <span className="w-[95%] text-sm text-[#FF0000]">
            {formErrors.Email}
          </span>
        ) : null}
      </div>
      <div className="w-full flex justify-between">
        <label className="text-sm">Phone number</label>
        <input
          className="rounded-lg border-2 border-t-cyan-900"
          name="phoneNumber"
          type="text"
          onChange={handleFormChange}
          value={formValues?.phoneNumber}
        />
        {formErrors.phoneNumber ? (
          <span className="w-[95%] text-sm text-[#FF0000]">
            {formErrors.phoneNumber}
          </span>
        ) : null}
      </div>
      <button onClick={handelModalSubmit}>Submit</button>
    </form>
  );
};

export default UserForm;

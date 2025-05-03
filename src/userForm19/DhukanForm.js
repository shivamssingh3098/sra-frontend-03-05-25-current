const BhukhandForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mb-4 w-full">
      <label className="font-medium block mb-2 text-sm md:text-base">
        भुखंड प्रकार आणि क्रमांक <span className="text-red-500">*</span>
      </label>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-3">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="bhukhandType"
            value="न.भू, क्र"
            checked={formData.bhukhandType === "न.भू, क्र"}
            onChange={handleChange}
          />
          न.भू, क्र
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="bhukhandType"
            value="सर्व्हे न."
            checked={formData.bhukhandType === "सर्व्हे न."}
            onChange={handleChange}
          />
          सर्व्हे न.
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="bhukhandType"
            value="अं.भू.क्र"
            checked={formData.bhukhandType === "अं.भू.क्र"}
            onChange={handleChange}
          />
          अं.भू.क्र
        </label>
      </div>

      <input
        type="text"
        name="bhukhandNo"
        value={formData.bhukhandNo}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 text-sm md:text-base"
        placeholder="भुखंड क्रमांक टाका"
        required
      />
    </div>
  );
};

export default BhukhandForm;

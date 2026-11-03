function InputMedida({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-1 block text-gray-700">
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 p-3"
      />
    </div>
  );
}

export default InputMedida;
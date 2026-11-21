// Works with react-hook-form's register(): <FormField {...register("x")} />
// (React 19 passes `ref` as a normal prop, so the spread just works.)
const FormField = ({ as: Tag = "input", error, ...props }) => (
    <div className="mb-5">
        <Tag
            {...props}
            className={`w-full text-3xl p-2 border-b outline-0 ${
                error ? "border-red-400" : ""
            }`}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
);

export default FormField;

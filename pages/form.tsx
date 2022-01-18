import { Checkbox } from "@mui/material";
import {
  ButtonCustom,
  CheckboxCustom,
  InputCustom,
  SelectCustom,
} from "components/commons";
import React, { useEffect } from "react";
import { useForm, SubmitHandler, Resolver, Controller } from "react-hook-form";

type FormValues = {
  example: string;
  exampleRequired: string;
  checkbox: boolean;
};

const resolver: Resolver<FormValues> = async (values) => {
  let errors = {};
  if (!values.example) {
    errors = {
      ...errors,
      example: {
        type: "required",
        message: "This is required.",
      },
    };
  }
  // if (!values.exampleRequired) {
  //   errors = {
  //     ...errors,
  //     exampleRequired: {
  //       type: "required",
  //       message: "This is required.",
  //     },
  //   };
  // }
  return {
    values,
    errors,
  };
};

const FormPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      example: "",
      checkbox: true,
      exampleRequired: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="example"
        control={control}
        render={({ field }) => (
          <InputCustom errorMsg={errors?.example?.message} {...field} />
        )}
      />
      <Controller
        name="exampleRequired"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <SelectCustom
            placeholder="Chọn TKTT"
            options={[
              { id: "1", value: "test1" },
              { id: "2", value: "test2" },
            ]}
            fullWidth
            {...field}
          />
        )}
      />
      <Controller
        name="checkbox"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <CheckboxCustom
              onBlur={onBlur}
              checked={value}
              onChange={onChange}
              ref={ref}
            />
          );
        }}
      />

      {/* <InputCustom
        errorMsg={errors?.example?.message}
        {...register("example", { required: true })}
      /> */}
      {/* <SelectCustom
        errorMsg={errors?.exampleRequired?.message}
        placeholder="Chọn TKTT"
        options={[
          { id: "test1", value: "label1" },
          { id: "test2", value: "label2" },
        ]}
        fullWidth
        {...register("exampleRequired")}
      /> */}

      {/* <CheckboxCustom {...register("isAccept")} /> */}
      <div>
        <ButtonCustom type="submit">Submit</ButtonCustom>
      </div>
    </form>
  );
};
export default FormPage;

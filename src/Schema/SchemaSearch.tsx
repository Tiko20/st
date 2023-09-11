import * as yup from "yup"

export const schema = yup.object({
    name: yup.string(),
    status: yup.string(),
    startDate: yup.date().nullable(),
    endDate: yup.date().nullable()
})
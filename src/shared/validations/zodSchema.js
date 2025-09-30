import z from "zod";

export const loginSchema = z.object({
    email: z.email("올바르지 않은 이메일 형식입니다").min(1, "이메일을 입력하세요"),
    password: z.string().min(1, "비밀번호를 입력하세요"),
});

export const signupSchema = z
    .object({
        email: z.email("올바르지 않은 이메일 형식입니다"),
        verification_code: z.string().min(1, "메일로 받은 인증 코드를 입력해주세요"),
        password: z
            .string()
            .min(8, "8자 이상을 입력해주세요")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/,
                "대문자, 소문자, 특수문자가 하나 이상 씩 필요합니다",
            ),
        passwordConfirm: z.string().min(1, "비밀번호를 한 번 더 입력하세요"),
        nickname: z.string().min(2, "2자 이상을 입력해주세요"),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "비밀번호가 일치하지 않습니다",
        path: ["passwordConfirm"],
    });

export const passwordChangeSchema = z.object({
    oldPassword: z.string().min(1, "기존 비밀번호를 입력하세요"),
    password: z
        .string()
        .min(8, "8자 이상을 입력해주세요")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/,
            "대문자, 소문자, 특수문자가 하나 이상 씩 필요합니다",
        ),
    passwordConfirm: z.string().min(1, "비밀번호를 한 번 더 입력하세요"),
});

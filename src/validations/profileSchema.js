import * as Yup from "yup";
import { DEGREE_LEVELS, DEGREE_PROGRAMS, PAK_UNIVERSITIES } from "@/components/constants/educationData";

const DEGREE_LEVEL_VALUES = DEGREE_LEVELS.map((x) => x.value);

const urlOptional = Yup.string()
    .transform((v) => (typeof v === "string" ? v.trim() : v))
    .test("url-or-empty", "Invalid URL", (value) => {
        if (!value) return true;
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    });

export const profileSchema = Yup.object({
    fullName: Yup.string()
        .trim()
        .min(2, "Min 2 chars")
        .required("Full name is required"),

    username: Yup.string()
        .trim()
        .lowercase()
        .matches(/^[a-z0-9_]{3,20}$/, "3-20 chars, lowercase letters/numbers/underscore only")
        .required("Username is required"),

    educationStatus: Yup.mixed()
        .oneOf(["CURRENT", "GRADUATED"])
        .required(),

    degreeLevel: Yup.string()
        .oneOf(["", ...DEGREE_LEVEL_VALUES])
        .default(""),

    degreeProgram: Yup.string()
        .oneOf(["", ...DEGREE_PROGRAMS])
        .default(""),

    startYear: Yup.number()
        .transform((v, o) => (o === "" || o == null ? undefined : Number(o)))
        .integer()
        .min(1900)
        .max(2100)
        .nullable()
        .optional(),

    endYear: Yup.number()
        .transform((v, o) => (o === "" || o == null ? undefined : Number(o)))
        .integer()
        .min(1900)
        .max(2100)
        .nullable()
        .optional(),

    semester: Yup.number()
        .transform((v, o) => (o === "" || o == null ? undefined : Number(o)))
        .integer()
        .min(1)
        .max(20)
        .nullable()
        .optional(),

    section: Yup.string().trim().max(20).nullable(true).default(""),

    // Unique+sparse: keep empty if not set
    studentId: Yup.string()
        .transform((v) => (typeof v === "string" ? v.trim() : v))
        .max(50)
        .nullable(true)
        .default(""),

    universityName: Yup.string()
        .oneOf(["", ...PAK_UNIVERSITIES])
        .nullable(true)
        .default(""),

    campus: Yup.string().trim().max(100).nullable(true).default(""),
    department: Yup.string().trim().max(120).nullable(true).default(""),

    phone: Yup.string()
        .transform((v) => (typeof v === "string" ? v.trim() : v))
        .matches(/^03\d{9}$/, "Must be 11 digits and start with 03")
        .nullable(true)
        .default("").optional(),

    whatsappNumber: Yup.string()
        .transform((v) => (typeof v === "string" ? v.trim() : v))
        .matches(/^03\d{9}$/, "Must be 11 digits and start with 03")
        .nullable(true)
        .default("").optional(),


    bio: Yup.string().trim().max(300).nullable(true).default(""),
    skills: Yup.string().trim().max(300).nullable(true).default(""),
    interests: Yup.string().trim().max(300).nullable(true).default(""),

    profileImageUrl: urlOptional.nullable(true).default(""),
    linkedinUrl: urlOptional.nullable(true).default(""),
    githubUrl: urlOptional.nullable(true).default(""),
    instagramUrl: urlOptional.nullable(true).default(""),

    profileVisibility: Yup.mixed()
        .oneOf(["PUBLIC", "UNIVERSITY_ONLY", "PRIVATE"])
        .required(),

    showEmailToSocietyAdmins: Yup.boolean().required(),
});

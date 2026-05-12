import * as yup from "yup";

// Shared Enums from your backend
export const EventType = [
    "SEMINAR",
    "WORKSHOP",
    "HACKATHON",
    "WEBINAR",
    "OTHER",
];

export const EventMode = [
    "ONLINE",
    "IN_PERSON",
    "HYBRID",
];

export const EventStatus = [
    "DRAFT",
    "PUBLISHED",
    "CANCELLED",
    "COMPLETED",
];

export const eventSchema = yup
    .object({
        title: yup
            .string()
            .required("Title is required")
            .min(5, "Title must be at least 5 characters")
            .max(150, "Title cannot exceed 150 characters"),

        description: yup
            .string()
            .required("Description is required")
            .min(20, "Description must be at least 20 characters")
            .max(5000, "Description is too long"),

        eventType: yup
            .string()
            .oneOf(EventType, "Please select a valid event type")
            .required("Event type is required"),

        mode: yup
            .string()
            .oneOf(EventMode, "Please select a valid event mode")
            .required("Event mode is required"),

        startDateTime: yup
            .string()
            .required("Start date and time is required")
            .test(
                "is-valid-date",
                "Invalid start date and time",
                (value) => {
                    if (!value) return false;

                    return !Number.isNaN(Date.parse(value));
                }
            ),

        endDateTime: yup
            .string()
            .required("End date and time is required")
            .test(
                "is-valid-date",
                "Invalid end date and time",
                (value) => {
                    if (!value) return false;

                    return !Number.isNaN(Date.parse(value));
                }
            ),

        venue: yup
            .string()
            .max(300, "Venue cannot exceed 300 characters")
            .nullable()
            .optional(),

        bannerUrl: yup
            .string()
            .url("Invalid image URL")
            .nullable()
            .optional(),

        registrationLink: yup
            .string()
            .url("Invalid registration URL")
            .nullable()
            .optional(),

        tags: yup
            .array()
            .of(yup.string())
            .default([]),
    })
    .test(
        "is-end-after-start",
        "End time must be after the start time",
        (values) => {
            if (!values?.startDateTime || !values?.endDateTime) {
                return true;
            }

            return (
                new Date(values.endDateTime) >
                new Date(values.startDateTime)
            );
        }
    );
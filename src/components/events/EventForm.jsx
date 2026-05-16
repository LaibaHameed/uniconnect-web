import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventSchema, EventType, EventMode } from '@/validations/event.validation';
import { FormField } from './FormField';
import { TagInput } from './TagInput';

const inputCls = (hasError) =>
    [
        'w-full bg-white border rounded-lg px-4 py-2.5 text-sm transition-colors outline-none',
        hasError
            ? 'border-red-400 focus:ring-2 focus:ring-red-100'
            : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-50',
    ].join(' ');

const Spinner = () => (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
    </svg>
);

export const EventForm = ({
    initialData,
    onSubmit,
    isLoading,
    onCancel,
}) => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(eventSchema),
        defaultValues: initialData || {
            mode: 'IN_PERSON',
            tags: [],
            isRegistrationRequired: false,
        },
    });

    const mode = watch('mode');
    const isRegistrationRequired = watch('isRegistrationRequired');

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">

                <FormField
                    label="Event Title"
                    required
                    error={errors.title?.message}
                >
                    <input
                        {...register('title')}
                        className={inputCls(!!errors.title)}
                        placeholder="e.g. Annual Tech Symposium 2026"
                    />
                </FormField>

                <FormField
                    label="Description"
                    required
                    error={errors.description?.message}
                    hint="Provide a clear agenda so attendees know what to expect."
                >
                    <textarea
                        {...register('description')}
                        rows={5}
                        className={`${inputCls(!!errors.description)} resize-none`}
                        placeholder="Describe what's happening..."
                    />
                </FormField>

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        label="Category"
                        required
                        error={errors.eventType?.message}
                    >
                        <select
                            {...register('eventType')}
                            className={inputCls(!!errors.eventType)}
                        >
                            <option value="">Select Category</option>

                            {EventType.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </FormField>

                    <FormField
                        label="Event Mode"
                        required
                        error={errors.mode?.message}
                    >
                        <select
                            {...register('mode')}
                            className={inputCls(!!errors.mode)}
                        >
                            {EventMode.map((m) => (
                                <option key={m} value={m}>
                                    {m.replace('_', ' ')}
                                </option>
                            ))}
                        </select>
                    </FormField>
                </div>

                {mode !== 'ONLINE' && (
                    <FormField
                        label="Venue"
                        required
                        error={errors.venue?.message}
                    >
                        <input
                            {...register('venue')}
                            className={inputCls(!!errors.venue)}
                            placeholder="e.g. Main Auditorium, Block C"
                        />
                    </FormField>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        label="Start Date & Time"
                        required
                        error={errors.startDateTime?.message}
                    >
                        <input
                            type="datetime-local"
                            {...register('startDateTime')}
                            className={inputCls(!!errors.startDateTime)}
                        />
                    </FormField>

                    <FormField
                        label="End Date & Time"
                        required
                        error={errors.endDateTime?.message}
                    >
                        <input
                            type="datetime-local"
                            {...register('endDateTime')}
                            className={inputCls(!!errors.endDateTime)}
                        />
                    </FormField>
                </div>

                {/* Contact Information */}

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        label="WhatsApp Number"
                        error={errors.whatsappNumber?.message}
                    >
                        <input
                            {...register('whatsappNumber')}
                            className={inputCls(!!errors.whatsappNumber)}
                            placeholder="+923001234567"
                        />
                    </FormField>

                    <FormField
                        label="Contact Email"
                        error={errors.contactEmail?.message}
                    >
                        <input
                            type="email"
                            {...register('contactEmail')}
                            className={inputCls(!!errors.contactEmail)}
                            placeholder="society@example.com"
                        />
                    </FormField>
                </div>

                <FormField
                    label="Instagram Handle"
                    error={errors.instagramHandle?.message}
                >
                    <input
                        {...register('instagramHandle')}
                        className={inputCls(!!errors.instagramHandle)}
                        placeholder="@techsociety"
                    />
                </FormField>

                {/* Registration Section */}

                <div className="space-y-4 border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isRegistrationRequired"
                            {...register('isRegistrationRequired')}
                            className="h-4 w-4"
                        />

                        <label
                            htmlFor="isRegistrationRequired"
                            className="text-sm font-medium text-gray-700"
                        >
                            Registration Required
                        </label>
                    </div>

                    {isRegistrationRequired ? (
                        <FormField
                            label="Registration Link"
                            required
                            error={errors.registrationLink?.message}
                        >
                            <input
                                {...register('registrationLink')}
                                className={inputCls(!!errors.registrationLink)}
                                placeholder="https://forms.gle/..."
                            />
                        </FormField>
                    ) : (
                        <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                            This event is open for everyone.
                        </div>
                    )}
                </div>

                <FormField label="Tags">
                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                            <TagInput {...field} />
                        )}
                    />
                </FormField>
            </div>

            <div className="flex gap-3 pt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all shadow-sm cursor-pointer"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <Spinner />
                            Creating...
                        </span>
                    ) : (
                        'Create Event'
                    )}
                </button>
            </div>
        </form>
    );
};
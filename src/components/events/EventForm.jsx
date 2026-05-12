import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventSchema, EventType, EventMode } from '@/validations/event.validation';
import { FormField } from './FormField';
import { TagInput } from './TagInput';

const inputCls = (hasError) => `
  w-full bg-white border rounded-xl px-4 py-3 text-sm transition-all outline-none
  ${hasError 
    ? 'border-red-500 focus:ring-4 focus:ring-red-100' 
    : 'border-zinc-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50'}
`;

export const EventForm = ({ initialData, onSubmit, isLoading, onCancel }) => {
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
        resolver: yupResolver(eventSchema),
        defaultValues: initialData || { mode: 'IN_PERSON', tags: [] }
    });

    const mode = watch('mode');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm flex flex-col gap-6">
                <FormField label="Event Title" required error={errors.title?.message}>
                    <input {...register('title')} className={inputCls(!!errors.title)} placeholder="e.g. Annual Tech Symposium 2026" />
                </FormField>

                <FormField label="Description" required error={errors.description?.message} hint="Provide a clear agenda for the event.">
                    <textarea {...register('description')} rows={5} className={`${inputCls(!!errors.description)} resize-none`} placeholder="Describe what's happening..." />
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Category" required error={errors.eventType?.message}>
                        <select {...register('eventType')} className={inputCls(!!errors.eventType)}>
                            <option value="">Select Category</option>
                            {EventType.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </FormField>
                    <FormField label="Event Mode" required error={errors.mode?.message}>
                        <select {...register('mode')} className={inputCls(!!errors.mode)}>
                            {EventMode.map(m => <option key={m} value={m}>{m.replace('_', ' ')}</option>)}
                        </select>
                    </FormField>
                </div>

                {mode !== 'ONLINE' && (
                    <FormField label="Venue" required error={errors.venue?.message}>
                        <input {...register('venue')} className={inputCls(!!errors.venue)} placeholder="e.g. Main Auditorium" />
                    </FormField>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Start Date & Time" required error={errors.startDateTime?.message}>
                        <input type="datetime-local" {...register('startDateTime')} className={inputCls(!!errors.startDateTime)} />
                    </FormField>
                    <FormField label="End Date & Time" required error={errors.endDateTime?.message}>
                        <input type="datetime-local" {...register('endDateTime')} className={inputCls(!!errors.endDateTime)} />
                    </FormField>
                </div>

                <FormField label="Tags">
                    <Controller name="tags" control={control} render={({ field }) => <TagInput {...field} />} />
                </FormField>
            </div>

            <div className="flex items-center justify-end gap-4">
                <button 
                    type="button" 
                    onClick={onCancel} 
                    className="px-6 py-3 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 transition"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    disabled={isLoading} 
                    className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md disabled:opacity-50 transition-all active:scale-95"
                >
                    {isLoading ? 'Creating...' : 'Create Event'}
                </button>
            </div>
        </form>
    );
};
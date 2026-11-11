import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { addDays, format, isSunday, parseISO } from 'date-fns'

/**
 * "Book Your CNG Conversion" — books a paid pre-conversion inspection through the
 * Electra dashboard API, then sends the customer straight to pay the inspection fee.
 * The payment link is also emailed to them.
 */

const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '')

// The dashboard only accepts days at least this far out; it re-checks on submit.
const MIN_NOTICE_DAYS = 3

// Workshop hours: Mon–Fri 8:00am–5:00pm, Sat 9:00am–4:00pm, closed Sunday.
const WEEKDAY_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
const SATURDAY_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']

const VEHICLE_TYPES = [
    { value: 'private', label: 'Private' },
    { value: 'commercial', label: 'Commercial' },
]

const FUEL_TYPES = [
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
]

const EMPTY_FORM = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    vehicle_make: '',
    vehicle_model: '',
    plate_number: '',
    vehicle_type: '',
    fuel_type: '',
    preferred_date: '',
    preferred_time: '',
    notes: '',
}

const REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'phone', 'vehicle_make', 'vehicle_model', 'plate_number', 'preferred_date', 'preferred_time']

const inputClasses = (hasError) =>
    `w-full rounded-md p-3 font-normal border ${hasError ? 'border-red-500' : 'border-black/50'}`

const slotsFor = (date) => (date && parseISO(date).getDay() === 6 ? SATURDAY_SLOTS : WEEKDAY_SLOTS)

const formatTime = (time) => format(parseISO(`2000-01-01T${time}`), 'h:mm a')

const formatNaira = (amount) => `₦${Number(amount).toLocaleString('en-NG')}`

// The dashboard stores the day and time exactly as the customer picked them, so show
// that wall-clock time as-is rather than shifting it into the browser's timezone.
const formatPreferredAt = (isoDateTime) => format(parseISO(isoDateTime.slice(0, 19)), "EEE, d MMM yyyy 'at' h:mm a")

const Field = ({ id, label, optional = false, error, children }) => (
    <div className='flex flex-col gap-2 w-full'>
        <label htmlFor={id} className='text-[18px] md:text-[24px] font-semibold'>
            {label}
            {optional && <span className='ml-2 text-black/50 text-[12px] md:text-[16px] font-normal'>optional</span>}
        </label>
        {children}
        {error && <p className='text-[14px] text-red-600'>{error}</p>}
    </div>
)

const BookNow = () => {
    const [form, setForm] = useState(EMPTY_FORM)
    const [agreed, setAgreed] = useState(false)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [formError, setFormError] = useState('')
    const [booking, setBooking] = useState(null)

    const earliestDate = useMemo(() => format(addDays(new Date(), MIN_NOTICE_DAYS), 'yyyy-MM-dd'), [])

    const update = (field) => (event) => {
        const value = event.target.value

        setForm((current) => {
            const next = { ...current, [field]: value }

            // Saturdays close earlier — drop a time the new day doesn't offer.
            if (field === 'preferred_date' && !slotsFor(value).includes(next.preferred_time)) {
                next.preferred_time = ''
            }

            return next
        })
        setErrors((current) => ({ ...current, [field]: undefined }))
    }

    const validate = () => {
        const found = {}

        REQUIRED_FIELDS
            .filter((field) => form[field].trim() === '')
            .forEach((field) => { found[field] = 'This field is required.' })

        if (form.preferred_date && form.preferred_date < earliestDate) {
            found.preferred_date = `Choose a date on or after ${format(parseISO(earliestDate), 'EEE, d MMM yyyy')}.`
        } else if (form.preferred_date && isSunday(parseISO(form.preferred_date))) {
            found.preferred_date = 'We are closed on Sundays — please choose another day.'
        }

        if (!agreed) {
            found.agreed = 'Please accept the Terms and Conditions to continue.'
        }

        return found
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setFormError('')

        const found = validate()
        setErrors(found)

        if (Object.keys(found).length > 0) {
            return
        }

        setSubmitting(true)

        try {
            const payload = Object.fromEntries(
                Object.entries(form).map(([key, value]) => [key, value.trim() === '' ? null : value.trim()]),
            )

            const response = await fetch(`${API_URL}/api/v1/inspections`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(payload),
            })

            const body = await response.json().catch(() => ({}))

            if (response.status === 422) {
                setErrors(Object.fromEntries(Object.entries(body.errors ?? {}).map(([field, messages]) => [field, messages[0]])))
                setFormError('Please check the highlighted fields.')
                return
            }

            if (response.status === 429) {
                setFormError('Too many attempts. Please wait a minute and try again.')
                return
            }

            if (!response.ok) {
                throw new Error(`Unexpected response ${response.status}`)
            }

            setBooking(body.data)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } catch {
            setFormError('We could not submit your booking right now. Please try again, or call us on +234 814 5362 548.')
        } finally {
            setSubmitting(false)
        }
    }

    if (booking) {
        return (
            <div className='py-[30px] md:py-[50px] px-[20px] md:px-[30px] xl:px-[100px]'>
                <div className='py-[30px] md:py-[50px] md:px-[30px] xl:px-[200px]'>
                    <div className='bg-[#002748] rounded-t-2xl px-5 py-10'>
                        <h1 className='text-[28px] text-white text-center font-semibold md:text-[48px] leading-tight'>
                            One last step
                        </h1>
                        <p className='text-[15px] md:text-[24px] font-medium text-center text-white pt-3 md:pt-6'>
                            Pay the inspection fee to confirm your booking
                        </p>
                    </div>
                    <div className='rounded-b-2xl px-5 py-10 shadow-lg space-y-6'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-[16px] md:text-[18px]'>
                            <div>
                                <p className='text-black/50'>Request No.</p>
                                <p className='font-semibold'>{booking.number}</p>
                            </div>
                            <div>
                                <p className='text-black/50'>Vehicle</p>
                                <p className='font-semibold'>{booking.vehicle.make} {booking.vehicle.model} · {booking.vehicle.plate_number}</p>
                            </div>
                            <div>
                                <p className='text-black/50'>Preferred Day</p>
                                <p className='font-semibold'>{formatPreferredAt(booking.preferred_at)}</p>
                            </div>
                            <div>
                                <p className='text-black/50'>Inspection Fee</p>
                                <p className='font-semibold'>{formatNaira(booking.fee)}</p>
                            </div>
                        </div>

                        <p className='text-[15px] md:text-[18px]'>
                            Once your payment is received, our team will call you to confirm your inspection day.
                            We’ve also emailed the payment link to <span className='font-semibold'>{booking.customer.email}</span>.
                        </p>

                        <a href={booking.payment_url}
                            className='block text-[18px] text-white font-semibold bg-[#002748] w-full rounded-lg cursor-pointer px-6 py-4 text-center
                            hover:shadow-lg transition-transform duration-500 hover:scale-101 hover:bg-[#2FEAE4] hover:border-[3px]
                            hover:border-[#002748] hover:text-[#13202b]'>
                            Pay {formatNaira(booking.fee)} Now
                        </a>
                        <p className='text-center text-[13px] md:text-[15px] text-black/50'>The inspection fee is non-refundable.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='py-[30px] md:py-[50px] px-[20px] md:px-[30px] xl:px-[100px]'>
            <div className='py-[30px] md:py-[50px] md:px-[30px] xl:px-[200px]'>
                <div className='bg-[#002748] rounded-t-2xl px-5 py-10'>
                    <h1 className='text-[28px] text-white text-center font-semibold md:text-[48px] leading-tight'>
                        Book Your CNG Conversion
                    </h1>
                    <p className='text-[15px] md:text-[24px] font-medium text-center text-white pt-3 md:pt-6'>
                        Start with a vehicle inspection: provide the details below
                    </p>
                </div>
                <div className='rounded-b-2xl px-5 py-10 shadow-lg'>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className='space-y-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <Field id='first_name' label='First Name' error={errors.first_name}>
                                    <input id='first_name' type='text' placeholder='John' autoComplete='given-name'
                                        value={form.first_name} onChange={update('first_name')} className={inputClasses(errors.first_name)} />
                                </Field>
                                <Field id='last_name' label='Last Name' error={errors.last_name}>
                                    <input id='last_name' type='text' placeholder='Doe' autoComplete='family-name'
                                        value={form.last_name} onChange={update('last_name')} className={inputClasses(errors.last_name)} />
                                </Field>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <Field id='email' label='Email Address' error={errors.email}>
                                    <input id='email' type='email' placeholder='youremail@example.com' autoComplete='email'
                                        value={form.email} onChange={update('email')} className={inputClasses(errors.email)} />
                                </Field>
                                <Field id='phone' label='Phone Number' error={errors.phone}>
                                    <input id='phone' type='tel' placeholder='0803 123 4567' autoComplete='tel'
                                        value={form.phone} onChange={update('phone')} className={inputClasses(errors.phone)} />
                                </Field>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <Field id='vehicle_make' label='Vehicle Make' error={errors.vehicle_make}>
                                    <input id='vehicle_make' type='text' placeholder='Toyota'
                                        value={form.vehicle_make} onChange={update('vehicle_make')} className={inputClasses(errors.vehicle_make)} />
                                </Field>
                                <Field id='vehicle_model' label='Vehicle Model' error={errors.vehicle_model}>
                                    <input id='vehicle_model' type='text' placeholder='Corolla'
                                        value={form.vehicle_model} onChange={update('vehicle_model')} className={inputClasses(errors.vehicle_model)} />
                                </Field>
                                <Field id='plate_number' label='Plate Number' error={errors.plate_number}>
                                    <input id='plate_number' type='text' placeholder='GGE 123 ZY'
                                        value={form.plate_number} onChange={update('plate_number')} className={inputClasses(errors.plate_number)} />
                                </Field>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <Field id='vehicle_type' label='Vehicle Use' optional error={errors.vehicle_type}>
                                    <select id='vehicle_type' value={form.vehicle_type} onChange={update('vehicle_type')} className={inputClasses(errors.vehicle_type)}>
                                        <option value=''>Select…</option>
                                        {VEHICLE_TYPES.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
                                    </select>
                                </Field>
                                <Field id='fuel_type' label='Current Fuel' optional error={errors.fuel_type}>
                                    <select id='fuel_type' value={form.fuel_type} onChange={update('fuel_type')} className={inputClasses(errors.fuel_type)}>
                                        <option value=''>Select…</option>
                                        {FUEL_TYPES.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
                                    </select>
                                </Field>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <Field id='preferred_date' label='Preferred Date' error={errors.preferred_date}>
                                    <input id='preferred_date' type='date' min={earliestDate}
                                        value={form.preferred_date} onChange={update('preferred_date')} className={inputClasses(errors.preferred_date)} />
                                </Field>
                                <Field id='preferred_time' label='Preferred Time' error={errors.preferred_time}>
                                    <select id='preferred_time' value={form.preferred_time} onChange={update('preferred_time')} className={inputClasses(errors.preferred_time)}>
                                        <option value=''>Select a time…</option>
                                        {slotsFor(form.preferred_date).map((slot) => <option key={slot} value={slot}>{formatTime(slot)}</option>)}
                                    </select>
                                </Field>
                            </div>
                            <p className='text-[14px] md:text-[16px] text-black/60'>
                                Choose a day at least {MIN_NOTICE_DAYS} days from today (Monday – Saturday). We’ll call you to confirm the exact day and time.
                            </p>

                            <Field id='notes' label='Notes' optional error={errors.notes}>
                                <textarea id='notes' rows='4' placeholder='Anything we should know — e.g. what you’d like done, or questions about your vehicle'
                                    value={form.notes} onChange={update('notes')} className={`${inputClasses(errors.notes)} resize-none`} />
                            </Field>
                        </div>

                        <div className='pt-4'>
                            <label className='flex items-center gap-3 cursor-pointer'>
                                <input type='checkbox' checked={agreed}
                                    onChange={(event) => { setAgreed(event.target.checked); setErrors((current) => ({ ...current, agreed: undefined })) }}
                                    className='w-[20px] h-[20px] cursor-pointer' />
                                <p className='text-[14px] md:text-[18px] font-semibold m-0'>
                                    I agree to the Company's <Link to='/terms-policy'><span className='italic font-light'>Terms and Conditions.</span></Link>
                                </p>
                            </label>
                            {errors.agreed && <p className='text-[14px] text-red-600 pt-2'>{errors.agreed}</p>}
                        </div>

                        {formError && (
                            <p role='alert' className='mt-4 rounded-md bg-red-50 px-4 py-3 text-[15px] text-red-700'>{formError}</p>
                        )}

                        <button type='submit' disabled={submitting}
                            className='text-[18px] text-white font-semibold bg-[#002748] w-full rounded-lg cursor-pointer px-6 py-4 text-center
                            mt-[15px] hover:shadow-lg transition-transform duration-500 hover:scale-101 hover:bg-[#2FEAE4] hover:border-[3px]
                            hover:border-[#002748] hover:text-[#13202b] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100'>
                            {submitting ? 'Booking…' : 'Book Now'}
                        </button>
                        <p className='text-center text-[13px] md:text-[15px] text-black/50 pt-3'>
                            You’ll pay the inspection fee on the next step. The fee is non-refundable.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookNow

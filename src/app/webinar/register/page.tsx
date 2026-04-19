"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Globe, 
  Lock, 
  Mail, 
  MapPin, 
  Phone, 
  User, 
  Briefcase,
  Building2,
  ChevronRight,
  Loader2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { MultiSelect } from "@/components/ui/multi-select"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { 
  webinarRegistrationSchema, 
  type WebinarRegistrationInput,
  industries,
  hearAboutUsOptions,
  interestTopics
} from "@/lib/validations/webinar"

const countries = [
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "GB" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Nigeria", value: "NG" },
  { label: "India", value: "IN" },
  { label: "South Africa", value: "ZA" },
  { label: "Brazil", value: "BR" },
]

const statesByCountry: Record<string, { label: string; value: string }[]> = {
  US: [
    { label: "California", value: "CA" },
    { label: "New York", value: "NY" },
    { label: "Texas", value: "TX" },
    { label: "Florida", value: "FL" },
    { label: "Washington", value: "WA" },
  ],
  NG: [
    { label: "Lagos", value: "LA" },
    { label: "Abuja", value: "AB" },
    { label: "Rivers", value: "RI" },
    { label: "Oyo", value: "OY" },
  ],
  GB: [
    { label: "London", value: "LDN" },
    { label: "Manchester", value: "MAN" },
    { label: "Birmingham", value: "BIR" },
  ],
  CA: [
    { label: "Ontario", value: "ON" },
    { label: "Quebec", value: "QC" },
    { label: "British Columbia", value: "BC" },
  ]
}

const timezones = Intl.supportedValuesOf?.('timeZone').map(tz => ({ label: tz, value: tz })) || [
  { label: "UTC", value: "UTC" },
  { label: "America/New_York", value: "America/New_York" },
  { label: "Europe/London", value: "Europe/London" },
  { label: "Africa/Lagos", value: "Africa/Lagos" },
]

export default function WebinarRegistrationPage() {
  const [activeWebinar, setActiveWebinar] = React.useState<{ id: string; title: string; description: string; scheduledAt: string; meetingLink: string } | null>(null)
  const [isLoadingWebinar, setIsLoadingWebinar] = React.useState(true)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [calendarLinks, setCalendarLinks] = React.useState<{ google: string, outlook: string } | null>(null)

  React.useEffect(() => {
    const fetchActiveWebinar = async () => {
      try {
        const res = await fetch('/api/webinar/active')
        if (res.ok) {
          const data = await res.json()
          setActiveWebinar(data.webinar)
        }
      } catch (error) {
        console.error('Error fetching active webinar:', error)
      } finally {
        setIsLoadingWebinar(false)
      }
    }
    fetchActiveWebinar()
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<WebinarRegistrationInput>({
    resolver: zodResolver(webinarRegistrationSchema),
    defaultValues: {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      topicsOfInterest: [],
      subscribeUpdates: false,
    },
  })

  const selectedCountry = watch("country")
  const selectedTopics = watch("topicsOfInterest")

  const onSubmit = async (data: WebinarRegistrationInput) => {
    if (!activeWebinar) {
      toast.error("No active webinar found. Please try again later.")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/webinar/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          webinarId: activeWebinar.id
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success("Registration successful!")
        setIsSuccess(true)
        setCalendarLinks(result.calendarLinks)
      } else {
        toast.error(result.error || "Something went wrong")
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center p-6 pt-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">You&apos;re Registered!</h1>
            <p className="text-slate-600 mb-8">
              We&apos;ve sent a confirmation email to your inbox. We can&apos;t wait to see you there!
            </p>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">Add to your calendar:</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button asChild variant="outline" className="w-full">
                  <a href={calendarLinks?.google} target="_blank" rel="noopener noreferrer">
                    Google
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href={calendarLinks?.outlook} target="_blank" rel="noopener noreferrer">
                    Outlook
                  </a>
                </Button>
              </div>
            </div>
            
            <Button 
              className="mt-8 w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:opacity-90"
              onClick={() => window.location.href = "/"}
            >
              Back to Home
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isLoadingWebinar ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : activeWebinar ? (
                <>
                  <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4 inline-block">
                    Upcoming Webinar
                  </span>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                    {activeWebinar.title}
                  </h1>
                  {activeWebinar.description && (
                    <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                      {activeWebinar.description}
                    </p>
                  )}
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto flex items-center justify-center gap-4">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>{new Date(activeWebinar.scheduledAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="text-slate-300">|</span>
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span>{new Date(activeWebinar.scheduledAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                  </p>
                </>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900">No upcoming webinars scheduled</h2>
                  <p className="text-gray-600 mt-2">Check back later for new dates!</p>
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 ${(!activeWebinar && !isLoadingWebinar) ? 'opacity-50 pointer-events-none grayscale' : ''}`}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-10">
              {/* Personal Information */}
              <section>
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" {...register("firstName")} placeholder="John" className={errors.firstName ? "border-red-500" : ""} />
                    {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" {...register("lastName")} placeholder="Doe" className={errors.lastName ? "border-red-500" : ""} />
                    {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input id="email" type="email" {...register("email")} placeholder="john@company.com" className={`pl-10 ${errors.email ? "border-red-500" : ""}`} />
                    </div>
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input id="phone" {...register("phone")} placeholder="+1 (555) 000-0000" className="pl-10" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Company Information */}
              <section>
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">Professional Details</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input id="jobTitle" {...register("jobTitle")} placeholder="Marketing Director" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input id="companyName" {...register("companyName")} placeholder="Acme Inc." className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Industry *</Label>
                    <SearchableSelect 
                      options={industries.map(i => ({ label: i, value: i }))} 
                      value={watch("industry")}
                      onValueChange={(val) => setValue("industry", val)}
                      placeholder="Select Industry"
                      className={errors.industry ? "border-red-500" : ""}
                    />
                    {errors.industry && <p className="text-xs text-red-500">{errors.industry.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>How did you hear about us?</Label>
                    <SearchableSelect 
                      options={hearAboutUsOptions.map(o => ({ label: o, value: o }))} 
                      value={watch("howDidYouHear")}
                      onValueChange={(val) => setValue("howDidYouHear", val)}
                      placeholder="Select Option"
                    />
                  </div>
                </div>
              </section>

              {/* Location */}
              <section>
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">Location & Timezone</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Country *</Label>
                    <SearchableSelect 
                      options={countries} 
                      value={watch("country")}
                      onValueChange={(val) => {
                        setValue("country", val)
                        setValue("state", "") // Reset state on country change
                      }}
                      placeholder="Select Country"
                      className={errors.country ? "border-red-500" : ""}
                    />
                    {errors.country && <p className="text-xs text-red-500">{errors.country.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>State / Province</Label>
                    <SearchableSelect 
                      options={statesByCountry[selectedCountry] || []} 
                      value={watch("state")}
                      onValueChange={(val) => setValue("state", val)}
                      placeholder={selectedCountry ? "Select State" : "Select Country First"}
                      className={!selectedCountry ? "opacity-50 pointer-events-none" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...register("city")} placeholder="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone *</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 z-10" />
                      <SearchableSelect 
                        options={timezones} 
                        value={watch("timezone")}
                        onValueChange={(val) => setValue("timezone", val)}
                        placeholder="Select Timezone"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Topics of Interest */}
              <section>
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">Topics of Interest *</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-slate-500">Pick at least one topic you&apos;re interested in learning about:</p>
                  <MultiSelect 
                    options={interestTopics.map(t => ({ label: t, value: t }))}
                    value={selectedTopics}
                    onValueChange={(val) => setValue("topicsOfInterest", val)}
                    className={errors.topicsOfInterest ? "border-red-500 p-2 rounded-md border" : ""}
                  />
                  {errors.topicsOfInterest && <p className="text-xs text-red-500">{errors.topicsOfInterest.message}</p>}
                </div>
              </section>

              {/* Consent */}
              <section className="bg-slate-50 p-6 rounded-2xl space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="agreeToTerms" 
                    onCheckedChange={(checked) => setValue("agreeToTerms", checked === true)} 
                    className="mt-1"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="agreeToTerms" className="text-sm font-medium">
                      I agree to the Terms of Service and Privacy Policy *
                    </Label>
                    <p className="text-xs text-slate-500">
                      You&apos;ll receive emails related to this webinar and our services.
                    </p>
                    {errors.agreeToTerms && <p className="text-xs text-red-500">{errors.agreeToTerms.message}</p>}
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="subscribeUpdates" 
                    onCheckedChange={(checked) => setValue("subscribeUpdates", checked === true)} 
                    className="mt-1"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="subscribeUpdates" className="text-sm font-medium">
                      Keep me updated with future webinars and newsletters (Optional)
                    </Label>
                  </div>
                </div>
              </section>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-orange-500 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transform transition-all active:scale-95 disabled:opacity-70 group"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      Register Now
                      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <Lock className="w-3 h-3" />
                  <span>Secure SSL Encryption</span>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

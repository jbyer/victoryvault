"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  ArrowRight,
  Save,
  Eye,
  Upload,
  Calendar,
  DollarSign,
  Users,
  Target,
  Gift,
  HandHeart,
  HelpCircle,
  Plus,
  Trash2,
} from "lucide-react"
import Link from "next/link"

interface FormData {
  // Campaign Basics
  campaignName: string
  campaignType: string
  shortDescription: string
  fullDescription: string
  category: string
  tags: string[]

  // Financial Details
  fundingGoal: string
  minimumDonation: string
  maximumDonation: string
  currency: string
  fecCompliant: boolean

  // Campaign Content
  heroImage: File | null
  additionalImages: File[]
  videoUrl: string
  websiteUrl: string
  socialMediaLinks: {
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
  }

  // Recipient & Settings
  recipientType: string
  recipientName: string
  recipientEmail: string
  recipientPhone: string
  recipientAddress: string
  campaignDuration: string
  startDate: string
  endDate: string
  visibility: string
  allowAnonymous: boolean

  // Legal & Compliance
  legalName: string
  taxId: string
  registeredAddress: string
  bankingInfo: {
    accountName: string
    routingNumber: string
    accountNumber: string
  }
  complianceAgreement: boolean
  termsAccepted: boolean

  // Advanced Features
  teamMembers: Array<{
    email: string
    role: string
    permissions: string[]
  }>
  milestones: Array<{
    percentage: number
    title: string
    description: string
  }>
  rewardTiers: Array<{
    minAmount: number
    title: string
    description: string
    estimatedDelivery: string
  }>
  matchingDonors: Array<{
    donorName: string
    matchAmount: number
    matchRatio: string
    conditions: string
  }>
  customQuestions: Array<{
    question: string
    type: string
    required: boolean
    options?: string[]
  }>
}

const initialFormData: FormData = {
  campaignName: "",
  campaignType: "",
  shortDescription: "",
  fullDescription: "",
  category: "",
  tags: [],
  fundingGoal: "",
  minimumDonation: "",
  maximumDonation: "",
  currency: "USD",
  fecCompliant: false,
  heroImage: null,
  additionalImages: [],
  videoUrl: "",
  websiteUrl: "",
  socialMediaLinks: {
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  },
  recipientType: "",
  recipientName: "",
  recipientEmail: "",
  recipientPhone: "",
  recipientAddress: "",
  campaignDuration: "",
  startDate: "",
  endDate: "",
  visibility: "",
  allowAnonymous: false,
  legalName: "",
  taxId: "",
  registeredAddress: "",
  bankingInfo: {
    accountName: "",
    routingNumber: "",
    accountNumber: "",
  },
  complianceAgreement: false,
  termsAccepted: false,
  teamMembers: [],
  milestones: [],
  rewardTiers: [],
  matchingDonors: [],
  customQuestions: [],
}

export default function CreateCampaignPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isDraft, setIsDraft] = useState(false)

  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  const stepTitles = [
    "Campaign Basics",
    "Financial Details",
    "Campaign Content",
    "Recipient & Settings",
    "Legal & Compliance",
    "Advanced Features",
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof FormData] as any),
        [field]: value,
      },
    }))
  }

  const addArrayItem = (field: keyof FormData, item: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as any[]), item],
    }))
  }

  const removeArrayItem = (field: keyof FormData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index),
    }))
  }

  const updateArrayItem = (field: keyof FormData, index: number, updatedItem: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as any[]).map((item, i) => (i === index ? updatedItem : item)),
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const saveDraft = () => {
    setIsDraft(true)
    // Here you would save to your backend
    console.log("Saving draft:", formData)
  }

  const submitCampaign = () => {
    // Here you would submit to your backend
    console.log("Submitting campaign:", formData)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-blue-600 mb-4">
              <Target className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Campaign Basics</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="campaignName">Campaign Name *</Label>
                <Input
                  id="campaignName"
                  placeholder="Enter your campaign name"
                  value={formData.campaignName}
                  onChange={(e) => handleInputChange("campaignName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaignType">Campaign Type *</Label>
                <Select
                  value={formData.campaignType}
                  onValueChange={(value) => handleInputChange("campaignType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candidate">Candidate Campaign</SelectItem>
                    <SelectItem value="pac">Political Action Committee</SelectItem>
                    <SelectItem value="cause">Issue-Based Cause</SelectItem>
                    <SelectItem value="ballot">Ballot Initiative</SelectItem>
                    <SelectItem value="party">Party Committee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description *</Label>
              <Textarea
                id="shortDescription"
                placeholder="Brief description (max 200 characters)"
                maxLength={200}
                value={formData.shortDescription}
                onChange={(e) => handleInputChange("shortDescription", e.target.value)}
              />
              <p className="text-sm text-gray-500">{formData.shortDescription.length}/200 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullDescription">Full Description *</Label>
              <Textarea
                id="fullDescription"
                placeholder="Detailed description of your campaign goals, values, and why people should support you"
                rows={6}
                value={formData.fullDescription}
                onChange={(e) => handleInputChange("fullDescription", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="federal">Federal Election</SelectItem>
                    <SelectItem value="state">State Election</SelectItem>
                    <SelectItem value="local">Local Election</SelectItem>
                    <SelectItem value="conservative">Conservative Causes</SelectItem>
                    <SelectItem value="constitutional">Constitutional Rights</SelectItem>
                    <SelectItem value="economic">Economic Policy</SelectItem>
                    <SelectItem value="security">National Security</SelectItem>
                    <SelectItem value="family">Family Values</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Enter tags separated by commas"
                  onChange={(e) =>
                    handleInputChange(
                      "tags",
                      e.target.value.split(",").map((tag) => tag.trim()),
                    )
                  }
                />
                <p className="text-sm text-gray-500">Help people find your campaign with relevant keywords</p>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-600 mb-4">
              <DollarSign className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Financial Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fundingGoal">Funding Goal *</Label>
                <Input
                  id="fundingGoal"
                  type="number"
                  placeholder="0"
                  value={formData.fundingGoal}
                  onChange={(e) => handleInputChange("fundingGoal", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minimumDonation">Minimum Donation</Label>
                <Input
                  id="minimumDonation"
                  type="number"
                  placeholder="5"
                  value={formData.minimumDonation}
                  onChange={(e) => handleInputChange("minimumDonation", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maximumDonation">Maximum Donation</Label>
                <Input
                  id="maximumDonation"
                  type="number"
                  placeholder="2900"
                  value={formData.maximumDonation}
                  onChange={(e) => handleInputChange("maximumDonation", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-8">
                <Checkbox
                  id="fecCompliant"
                  checked={formData.fecCompliant}
                  onCheckedChange={(checked) => handleInputChange("fecCompliant", checked)}
                />
                <Label htmlFor="fecCompliant">This campaign must comply with FEC regulations</Label>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">FEC Compliance Information</h4>
              <p className="text-sm text-blue-800">
                Federal campaigns have strict contribution limits and reporting requirements. Individual contributions
                are limited to $2,900 per election cycle for federal candidates.
              </p>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-purple-600 mb-4">
              <Upload className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Campaign Content</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroImage">Hero Image *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Label htmlFor="heroImage" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Upload your main campaign image
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">PNG, JPG, GIF up to 10MB</span>
                    </Label>
                    <Input
                      id="heroImage"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleInputChange("heroImage", e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalImages">Additional Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="mt-2">
                    <Label htmlFor="additionalImages" className="cursor-pointer">
                      <span className="text-sm font-medium text-gray-900">Upload additional images</span>
                      <span className="block text-sm text-gray-500">Multiple files allowed</span>
                    </Label>
                    <Input
                      id="additionalImages"
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleInputChange("additionalImages", Array.from(e.target.files || []))}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Campaign Video URL</Label>
                <Input
                  id="videoUrl"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.videoUrl}
                  onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="websiteUrl">Campaign Website</Label>
                <Input
                  id="websiteUrl"
                  placeholder="https://yourwebsite.com"
                  value={formData.websiteUrl}
                  onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Social Media Links</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    placeholder="https://facebook.com/yourpage"
                    value={formData.socialMediaLinks.facebook}
                    onChange={(e) => handleNestedInputChange("socialMediaLinks", "facebook", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter/X</Label>
                  <Input
                    id="twitter"
                    placeholder="https://twitter.com/youraccount"
                    value={formData.socialMediaLinks.twitter}
                    onChange={(e) => handleNestedInputChange("socialMediaLinks", "twitter", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="https://instagram.com/youraccount"
                    value={formData.socialMediaLinks.instagram}
                    onChange={(e) => handleNestedInputChange("socialMediaLinks", "instagram", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.socialMediaLinks.linkedin}
                    onChange={(e) => handleNestedInputChange("socialMediaLinks", "linkedin", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-orange-600 mb-4">
              <Users className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Recipient & Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Recipient Type *</Label>
                <RadioGroup
                  value={formData.recipientType}
                  onValueChange={(value) => handleInputChange("recipientType", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">Individual Candidate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="organization" id="organization" />
                    <Label htmlFor="organization">Organization/PAC</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cause" id="cause" />
                    <Label htmlFor="cause">Cause/Initiative</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name *</Label>
                <Input
                  id="recipientName"
                  placeholder="Full name or organization name"
                  value={formData.recipientName}
                  onChange={(e) => handleInputChange("recipientName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientEmail">Contact Email *</Label>
                <Input
                  id="recipientEmail"
                  type="email"
                  placeholder="contact@example.com"
                  value={formData.recipientEmail}
                  onChange={(e) => handleInputChange("recipientEmail", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="recipientPhone">Phone Number</Label>
                <Input
                  id="recipientPhone"
                  placeholder="(555) 123-4567"
                  value={formData.recipientPhone}
                  onChange={(e) => handleInputChange("recipientPhone", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaignDuration">Campaign Duration</Label>
                <Select
                  value={formData.campaignDuration}
                  onValueChange={(value) => handleInputChange("campaignDuration", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="custom">Custom dates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientAddress">Address</Label>
              <Textarea
                id="recipientAddress"
                placeholder="Full address including city, state, and ZIP code"
                value={formData.recipientAddress}
                onChange={(e) => handleInputChange("recipientAddress", e.target.value)}
              />
            </div>

            {formData.campaignDuration === "custom" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Campaign Visibility</Label>
                <RadioGroup
                  value={formData.visibility}
                  onValueChange={(value) => handleInputChange("visibility", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public">Public - Anyone can find and donate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unlisted" id="unlisted" />
                    <Label htmlFor="unlisted">Unlisted - Only people with the link can donate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private">Private - Invitation only</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowAnonymous"
                  checked={formData.allowAnonymous}
                  onCheckedChange={(checked) => handleInputChange("allowAnonymous", checked)}
                />
                <Label htmlFor="allowAnonymous">Allow anonymous donations</Label>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-red-600 mb-4">
              <Calendar className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Legal & Compliance</h3>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-yellow-900 mb-2">Important Legal Information</h4>
              <p className="text-sm text-yellow-800">
                All political campaigns must comply with federal, state, and local election laws. Please ensure all
                information is accurate and complete.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="legalName">Legal Name *</Label>
                <Input
                  id="legalName"
                  placeholder="Official legal name"
                  value={formData.legalName}
                  onChange={(e) => handleInputChange("legalName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID / EIN</Label>
                <Input
                  id="taxId"
                  placeholder="XX-XXXXXXX"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="registeredAddress">Registered Address *</Label>
              <Textarea
                id="registeredAddress"
                placeholder="Official registered address for legal correspondence"
                value={formData.registeredAddress}
                onChange={(e) => handleInputChange("registeredAddress", e.target.value)}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Banking Information</h4>
              <p className="text-sm text-gray-600">Required for receiving donations</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Name *</Label>
                  <Input
                    id="accountName"
                    placeholder="Name on bank account"
                    value={formData.bankingInfo.accountName}
                    onChange={(e) => handleNestedInputChange("bankingInfo", "accountName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="routingNumber">Routing Number *</Label>
                  <Input
                    id="routingNumber"
                    placeholder="9-digit routing number"
                    value={formData.bankingInfo.routingNumber}
                    onChange={(e) => handleNestedInputChange("bankingInfo", "routingNumber", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  type="password"
                  placeholder="Bank account number"
                  value={formData.bankingInfo.accountNumber}
                  onChange={(e) => handleNestedInputChange("bankingInfo", "accountNumber", e.target.value)}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="complianceAgreement"
                  checked={formData.complianceAgreement}
                  onCheckedChange={(checked) => handleInputChange("complianceAgreement", checked)}
                />
                <Label htmlFor="complianceAgreement" className="text-sm">
                  I agree to comply with all applicable federal, state, and local election laws and regulations *
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleInputChange("termsAccepted", checked)}
                />
                <Label htmlFor="termsAccepted" className="text-sm">
                  I accept the Terms of Service and Privacy Policy *
                </Label>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-8">
            <div className="flex items-center space-x-2 text-indigo-600 mb-4">
              <Plus className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Advanced Features</h3>
            </div>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <CardTitle>Team Members / Co-Organizers</CardTitle>
                </div>
                <CardDescription>Invite collaborators to help manage your campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Email address"
                        value={member.email}
                        onChange={(e) => updateArrayItem("teamMembers", index, { ...member, email: e.target.value })}
                      />
                      <Select
                        value={member.role}
                        onValueChange={(value) => updateArrayItem("teamMembers", index, { ...member, role: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="co-organizer">Co-Organizer</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => removeArrayItem("teamMembers", index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addArrayItem("teamMembers", { email: "", role: "", permissions: [] })}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Team Member
                </Button>
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <CardTitle>Milestones</CardTitle>
                </div>
                <CardDescription>Break your goal into phases (e.g., 25%, 50%, 75%)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.milestones.map((milestone, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-20">
                          <Input
                            type="number"
                            placeholder="25"
                            min="1"
                            max="100"
                            value={milestone.percentage}
                            onChange={(e) =>
                              updateArrayItem("milestones", index, {
                                ...milestone,
                                percentage: Number.parseInt(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => removeArrayItem("milestones", index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Milestone title"
                      value={milestone.title}
                      onChange={(e) => updateArrayItem("milestones", index, { ...milestone, title: e.target.value })}
                    />
                    <Textarea
                      placeholder="Milestone description"
                      value={milestone.description}
                      onChange={(e) =>
                        updateArrayItem("milestones", index, { ...milestone, description: e.target.value })
                      }
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addArrayItem("milestones", { percentage: 0, title: "", description: "" })}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Milestone
                </Button>
              </CardContent>
            </Card>

            {/* Reward Tiers */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Gift className="h-5 w-5 text-purple-600" />
                  <CardTitle>Reward Tiers</CardTitle>
                </div>
                <CardDescription>Set thank-you gifts for different donation levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.rewardTiers.map((tier, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">$</span>
                        <Input
                          type="number"
                          placeholder="100"
                          className="w-24"
                          value={tier.minAmount}
                          onChange={(e) =>
                            updateArrayItem("rewardTiers", index, {
                              ...tier,
                              minAmount: Number.parseInt(e.target.value) || 0,
                            })
                          }
                        />
                        <span className="text-sm text-gray-500">minimum</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => removeArrayItem("rewardTiers", index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Reward title"
                      value={tier.title}
                      onChange={(e) => updateArrayItem("rewardTiers", index, { ...tier, title: e.target.value })}
                    />
                    <Textarea
                      placeholder="Reward description"
                      value={tier.description}
                      onChange={(e) => updateArrayItem("rewardTiers", index, { ...tier, description: e.target.value })}
                    />
                    <Input
                      type="date"
                      placeholder="Estimated delivery"
                      value={tier.estimatedDelivery}
                      onChange={(e) =>
                        updateArrayItem("rewardTiers", index, { ...tier, estimatedDelivery: e.target.value })
                      }
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    addArrayItem("rewardTiers", { minAmount: 0, title: "", description: "", estimatedDelivery: "" })
                  }
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Reward Tier
                </Button>
              </CardContent>
            </Card>

            {/* Matching Donors */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <HandHeart className="h-5 w-5 text-orange-600" />
                  <CardTitle>Matching Donors</CardTitle>
                </div>
                <CardDescription>Define corporate or individual matching contributions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.matchingDonors.map((donor, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Matching Donor #{index + 1}</h4>
                      <Button variant="outline" size="sm" onClick={() => removeArrayItem("matchingDonors", index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Donor name or organization"
                        value={donor.donorName}
                        onChange={(e) =>
                          updateArrayItem("matchingDonors", index, { ...donor, donorName: e.target.value })
                        }
                      />
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">$</span>
                        <Input
                          type="number"
                          placeholder="5000"
                          value={donor.matchAmount}
                          onChange={(e) =>
                            updateArrayItem("matchingDonors", index, {
                              ...donor,
                              matchAmount: Number.parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                    </div>
                    <Select
                      value={donor.matchRatio}
                      onValueChange={(value) =>
                        updateArrayItem("matchingDonors", index, { ...donor, matchRatio: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Match ratio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1:1">1:1 - Dollar for dollar</SelectItem>
                        <SelectItem value="2:1">2:1 - Two dollars for every dollar</SelectItem>
                        <SelectItem value="3:1">3:1 - Three dollars for every dollar</SelectItem>
                        <SelectItem value="custom">Custom ratio</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea
                      placeholder="Matching conditions (e.g., 'Valid until end of month', 'First 100 donors only')"
                      value={donor.conditions}
                      onChange={(e) =>
                        updateArrayItem("matchingDonors", index, { ...donor, conditions: e.target.value })
                      }
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    addArrayItem("matchingDonors", { donorName: "", matchAmount: 0, matchRatio: "", conditions: "" })
                  }
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Matching Donor
                </Button>
              </CardContent>
            </Card>

            {/* Custom Questions */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5 text-red-600" />
                  <CardTitle>Custom Questions</CardTitle>
                </div>
                <CardDescription>Add questionnaires that donors must answer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.customQuestions.map((question, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Question #{index + 1}</h4>
                      <Button variant="outline" size="sm" onClick={() => removeArrayItem("customQuestions", index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Enter your question"
                      value={question.question}
                      onChange={(e) =>
                        updateArrayItem("customQuestions", index, { ...question, question: e.target.value })
                      }
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        value={question.type}
                        onValueChange={(value) =>
                          updateArrayItem("customQuestions", index, { ...question, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Question type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text Input</SelectItem>
                          <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                          <SelectItem value="checkbox">Checkbox</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`required-${index}`}
                          checked={question.required}
                          onCheckedChange={(checked) =>
                            updateArrayItem("customQuestions", index, { ...question, required: !!checked })
                          }
                        />
                        <Label htmlFor={`required-${index}`}>Required</Label>
                      </div>
                    </div>
                    {(question.type === "multiple-choice" || question.type === "checkbox") && (
                      <div className="space-y-2">
                        <Label>Options (one per line)</Label>
                        <Textarea
                          placeholder="Option 1\nOption 2\nOption 3"
                          value={question.options?.join("\n") || ""}
                          onChange={(e) =>
                            updateArrayItem("customQuestions", index, {
                              ...question,
                              options: e.target.value.split("\n").filter((opt) => opt.trim()),
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    addArrayItem("customQuestions", { question: "", type: "", required: false, options: [] })
                  }
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Custom Question
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Admin
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
          <p className="text-gray-600 mt-1">Build your conservative campaign to rally support and raise funds</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Content */}
        <Card className="mb-8">
          <CardContent className="p-8">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            {currentStep > 1 && (
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={saveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>

            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={submitCampaign} className="bg-green-600 hover:bg-green-700">
                Launch Campaign
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Draft Status */}
        {isDraft && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">✓ Draft saved successfully! You can continue editing anytime.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

import React, { useState } from 'react';
import { Business, CategoryType, BusinessType, Product } from '../../types';
import { CATEGORIES_LIST, POPULAR_LOCATIONS } from '../../data/mockData';
import {
  Sparkles,
  X,
  Send,
  CheckCircle2,
  Building,
  ArrowRight,
  Store,
  Layers,
  Clock,
  Box,
  DollarSign,
  Tag,
  RefreshCw,
  FileCheck
} from 'lucide-react';

interface AiOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishStorefront: (newBusiness: Business) => void;
}

export const AiOnboardingModal: React.FC<AiOnboardingModalProps> = ({
  isOpen,
  onClose,
  onPublishStorefront
}) => {
  const [step, setStep] = useState<'interview' | 'draft_preview'>('interview');
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);

  // Conversational Form Answers
  const [answers, setAnswers] = useState({
    businessName: 'Shree Krishna Precision Components',
    businessType: 'Manufacturer' as BusinessType,
    category: 'Industrial Supplies' as CategoryType,
    city: 'Faridabad (Haryana)',
    coreProduct: 'High-tensile CNC turned fasteners and automotive hex bolts (Grade 8.8 & 10.9)',
    minMoq: '500',
    deliveryDays: '7',
    startingPrice: '18',
    priceUnit: 'per piece',
    specifications: 'Cold forged alloy steel, zinc trivalent electroplated, thread pitch ISO metric M6 to M24',
    usp: 'In-house induction hardening and optical sorting with 50 PPM defect rate'
  });

  const [currentInput, setCurrentInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Structured Draft State (editable by seller before publishing)
  const [draft, setDraft] = useState({
    name: '',
    tagline: '',
    description: '',
    category: 'Industrial Supplies' as CategoryType,
    businessType: 'Manufacturer' as BusinessType,
    city: 'Faridabad',
    state: 'Haryana',
    startingPrice: 18,
    startingPriceUnit: 'per piece',
    minMoq: 500,
    averageDeliveryDays: 7,
    productionCapacity: '10,00,000 components / month',
    capabilities: [
      'Multi-axis CNC sliding head Swiss automatic lathes',
      'Optical profile projector and hardness testing lab',
      'Surface coating: Zinc-Nickel, Phosphating & Black Oxide',
      'Rapid prototype samples within 48 hours'
    ],
    certifications: ['ISO 9001:2015', 'IATF 16949 Certified'],
    flagshipProduct: {
      name: 'Grade 8.8 High-Tensile Zinc Coated Flange Bolts',
      description: 'Precision cold-headed alloy steel fastener engineered for heavy automotive suspension and machinery mounts.',
      price: 18,
      priceUnit: 'per piece',
      moq: 500,
      deliveryDays: 7,
      specifications: {
        'Material Grade': 'Alloy Steel Grade 8.8 (Tensile > 800 N/mm²)',
        'Thread Standard': 'ISO Metric Coarse M8 to M16',
        'Coating': 'RoHS Compliant Trivalent Blue Zinc (Salt Spray 120 hrs)',
        'Hardness': 'Rockwell HRC 22-32'
      } as Record<string, string>
    }
  });

  if (!isOpen) return null;

  const interviewQuestions = [
    {
      id: 'coreProduct',
      prompt: "What does your business primarily manufacture or sell?",
      placeholder: "e.g. We manufacture high-tensile fasteners and auto hex bolts",
      key: 'coreProduct' as const
    },
    {
      id: 'businessName',
      prompt: "What is your official trade or enterprise name?",
      placeholder: "e.g. Shree Krishna Precision Components",
      key: 'businessName' as const
    },
    {
      id: 'city',
      prompt: "Which industrial cluster or city are your premises located in?",
      placeholder: "e.g. Faridabad, Sonipat, Delhi NCR, Gurugram...",
      key: 'city' as const
    },
    {
      id: 'minMoq',
      prompt: "What is your minimum order quantity (MOQ) for bulk orders?",
      placeholder: "e.g. 500 pieces, 200 meters, 50 units...",
      key: 'minMoq' as const
    },
    {
      id: 'deliveryDays',
      prompt: "What is your standard production and dispatch turnaround time?",
      placeholder: "e.g. 7 to 10 working days",
      key: 'deliveryDays' as const
    },
    {
      id: 'specifications',
      prompt: "What are your core quality guarantees or technical specifications?",
      placeholder: "e.g. Cold forged alloy steel, zinc trivalent electroplated...",
      key: 'specifications' as const
    }
  ];

  const handleNextQuestion = () => {
    if (activeQuestionIdx < interviewQuestions.length - 1) {
      setActiveQuestionIdx(activeQuestionIdx + 1);
      setCurrentInput('');
    } else {
      generateDraft();
    }
  };

  const generateDraft = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const cityClean = answers.city.split('(')[0].trim() || 'Delhi NCR';
      setDraft({
        name: answers.businessName || 'Shree Krishna Precision Components',
        tagline: `Leading ${answers.category} & Bulk Supplier in ${cityClean}`,
        description: `Dedicated manufacturing plant and distribution facility specializing in ${answers.coreProduct}. Delivering high-grade compliance, custom tooling, and fast turnarounds across North India industrial corridors.`,
        category: answers.category,
        businessType: answers.businessType,
        city: cityClean,
        state: 'Haryana',
        startingPrice: Number(answers.startingPrice) || 25,
        startingPriceUnit: answers.priceUnit || 'per piece',
        minMoq: Number(answers.minMoq) || 200,
        averageDeliveryDays: Number(answers.deliveryDays) || 7,
        productionCapacity: '1,50,000 units / month',
        capabilities: [
          'Direct factory batch manufacturing',
          'Custom dimension and tolerance matching',
          'In-house QA batch test certificates',
          'Same-day sample dispatch on approval'
        ],
        certifications: ['ISO 9001:2015', 'MSME Udyam Verified'],
        flagshipProduct: {
          name: answers.coreProduct.slice(0, 50),
          description: `Custom manufactured with standard MOQ of ${answers.minMoq}. Turnaround within ${answers.deliveryDays} days.`,
          price: Number(answers.startingPrice) || 25,
          priceUnit: answers.priceUnit || 'per piece',
          moq: Number(answers.minMoq) || 200,
          deliveryDays: Number(answers.deliveryDays) || 7,
          specifications: {
            'Quality Guarantee': '100% factory inspected',
            'Technical Spec': answers.specifications || 'Standard Industrial Grade',
            'Cluster Proximity': cityClean
          }
        }
      });
      setIsGenerating(false);
      setStep('draft_preview');
    }, 1000);
  };

  const handlePublish = () => {
    const newBiz: Business = {
      id: `biz-${Date.now()}`,
      name: draft.name,
      slug: draft.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=160&auto=format&fit=crop&q=80',
      coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&auto=format&fit=crop&q=80',
      tagline: draft.tagline,
      description: draft.description,
      category: draft.category,
      businessType: draft.businessType,
      location: {
        city: draft.city,
        state: draft.state,
        district: `${draft.city} Industrial Hub`,
        pincode: '121001',
        address: `Plot 14-B, Sector 24 Industrial Area, ${draft.city}`
      },
      contact: {
        phone: '+91 98110 99882',
        email: `sales@${draft.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.in`,
        gstin: '06AAXCS9912E1Z2',
        udyamNo: 'UDYAM-HR-18-0099412'
      },
      establishedYear: 2018,
      employeeCount: '35-50 workers',
      verificationStatus: 'documents_submitted',
      verificationDocs: [
        { type: 'GSTIN Certificate', docNumber: '06AAXCS9912E1Z2', submittedAt: '2026-11-10' },
        { type: 'MSME Udyam Certificate', docNumber: 'UDYAM-HR-18-0099412', submittedAt: '2026-11-10' }
      ],
      rating: 4.8,
      reviewCount: 1,
      startingPrice: draft.startingPrice,
      startingPriceUnit: draft.startingPriceUnit,
      minMoq: draft.minMoq,
      averageDeliveryDays: draft.averageDeliveryDays,
      customisationAvailable: true,
      productionCapacity: draft.productionCapacity,
      capabilities: draft.capabilities,
      certifications: draft.certifications,
      products: [
        {
          id: `prod-${Date.now()}`,
          businessId: `biz-${Date.now()}`,
          name: draft.flagshipProduct.name,
          category: draft.category,
          description: draft.flagshipProduct.description,
          price: draft.flagshipProduct.price,
          priceUnit: draft.flagshipProduct.priceUnit,
          moq: draft.flagshipProduct.moq,
          deliveryDays: draft.flagshipProduct.deliveryDays,
          inStock: true,
          customisationAvailable: true,
          specifications: draft.flagshipProduct.specifications,
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
          tags: [draft.category, draft.city]
        }
      ],
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: 'Rohit Khandelwal',
          company: 'NCR Industrial Fleet',
          rating: 5,
          comment: 'New supplier listing on KhojSetu. Prompt response on MOQ terms.',
          date: '2026-11-10',
          verifiedBuyer: true
        }
      ],
      choiceLoopStats: {
        totalResponses: 1,
        reasonsBreakdown: {
          'Better price': 1,
          'Better quality': 0,
          'Faster delivery': 0,
          'Lower MOQ': 0,
          'Better ratings or trust': 0,
          'Other': 0
        }
      },
      isFeatured: true
    };

    onPublishStorefront(newBiz);
    onClose();
  };

  const currentQ = interviewQuestions[activeQuestionIdx];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        {/* Header */}
        <div className="bg-[#101B2D] text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#19B6A4]/20 flex items-center justify-center text-[#19B6A4] border border-[#19B6A4]/30">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight font-display">
                  AI-Assisted SME Onboarding
                </h3>
                <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-400/20 text-[#A7E8D5] uppercase">
                  Guided Flow
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Answer simple questions to generate a production-ready digital storefront draft
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'interview' ? (
            /* CONVERSATIONAL STEP-BY-STEP FLOW */
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>Question {activeQuestionIdx + 1} of {interviewQuestions.length}</span>
                  <span className="text-[#19B6A4] font-bold">
                    {Math.round(((activeQuestionIdx + 1) / interviewQuestions.length) * 100)}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#19B6A4] rounded-full transition-all duration-300"
                    style={{
                      width: `${((activeQuestionIdx + 1) / interviewQuestions.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Chat-style prompt */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#101B2D] text-[#19B6A4] flex items-center justify-center shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-100/80 text-slate-800 text-sm max-w-lg leading-relaxed font-medium">
                    {currentQ.prompt}
                  </div>
                </div>

                {/* Input area */}
                <div className="pl-11 space-y-3">
                  <textarea
                    rows={3}
                    value={answers[currentQ.key]}
                    onChange={(e) =>
                      setAnswers({ ...answers, [currentQ.key]: e.target.value })
                    }
                    placeholder={currentQ.placeholder}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-800 focus:outline-none focus:border-[#19B6A4] focus:bg-white transition-all"
                  />

                  {/* Category and Type selections on first question */}
                  {activeQuestionIdx === 0 && (
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Industry Category
                        </label>
                        <select
                          value={answers.category}
                          onChange={(e) =>
                            setAnswers({
                              ...answers,
                              category: e.target.value as CategoryType
                            })
                          }
                          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                        >
                          {CATEGORIES_LIST.map((c) => (
                            <option key={c.name} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Supplier Role
                        </label>
                        <select
                          value={answers.businessType}
                          onChange={(e) =>
                            setAnswers({
                              ...answers,
                              businessType: e.target.value as BusinessType
                            })
                          }
                          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                        >
                          <option value="Manufacturer">Manufacturer</option>
                          <option value="Wholesaler">Wholesaler</option>
                          <option value="Distributor">Distributor</option>
                          <option value="Retailer">Retailer</option>
                          <option value="Service Provider">Service Provider</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    {activeQuestionIdx > 0 ? (
                      <button
                        type="button"
                        onClick={() => setActiveQuestionIdx(activeQuestionIdx - 1)}
                        className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                      >
                        ← Back
                      </button>
                    ) : <span />}

                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white text-xs font-bold shadow-md shadow-[#19B6A4]/25 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>
                        {activeQuestionIdx === interviewQuestions.length - 1
                          ? 'Generate Storefront Draft'
                          : 'Continue'}
                      </span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* DRAFT REVIEW & EDIT STEP */
            <div className="space-y-6">
              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#19B6A4]" />
                  <span>
                    Structured Storefront Draft Generated! You can fine-tune all fields before publishing live.
                  </span>
                </div>
                <button
                  onClick={() => setStep('interview')}
                  className="text-xs font-bold text-[#19B6A4] hover:underline cursor-pointer"
                >
                  Edit Answers
                </button>
              </div>

              {/* Editable Fields */}
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={draft.tagline}
                    onChange={(e) => setDraft({ ...draft, tagline: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    AI-Enhanced Description
                  </label>
                  <textarea
                    rows={3}
                    value={draft.description}
                    onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Starting Price</label>
                    <input
                      type="number"
                      value={draft.startingPrice}
                      onChange={(e) => setDraft({ ...draft, startingPrice: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Price Unit</label>
                    <input
                      type="text"
                      value={draft.startingPriceUnit}
                      onChange={(e) => setDraft({ ...draft, startingPriceUnit: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Minimum MOQ</label>
                    <input
                      type="number"
                      value={draft.minMoq}
                      onChange={(e) => setDraft({ ...draft, minMoq: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Lead Time (Days)</label>
                    <input
                      type="number"
                      value={draft.averageDeliveryDays}
                      onChange={(e) =>
                        setDraft({ ...draft, averageDeliveryDays: Number(e.target.value) })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                    />
                  </div>
                </div>

                {/* Flagship Product Draft */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider block">
                    Flagship Catalogue Item (Auto-Created):
                  </span>
                  <div className="space-y-1">
                    <p className="font-bold text-sm text-[#101B2D]">
                      {draft.flagshipProduct.name}
                    </p>
                    <p className="text-slate-600 text-xs">
                      {draft.flagshipProduct.description}
                    </p>
                    <div className="flex gap-4 pt-1 text-[11px] text-slate-500 font-semibold">
                      <span>Rate: ₹{draft.startingPrice} {draft.startingPriceUnit}</span>
                      <span>MOQ: {draft.minMoq} units</span>
                      <span>Delivery: ~{draft.averageDeliveryDays} days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('interview')}
                  className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Adjust Interview Answers
                </button>

                <button
                  type="button"
                  onClick={handlePublish}
                  className="px-6 py-2.5 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white text-xs font-bold shadow-md shadow-[#19B6A4]/25 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Store size={14} />
                  <span>Publish Digital Storefront to Marketplace</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

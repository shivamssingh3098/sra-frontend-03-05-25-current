import React from "react";
import servicesData from "../data/services.json";

const UploadForm5 = () => {

    const serviceDescription =
        servicesData[0].services.find((service) => service.id === 5)
            ?.description || "";
    return (
        <div>
            <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
                <div className="w-full max-w-6xl bg-white rounded-lg shadow p-6">
                    {/* Header */}
                    <div className="bg-blue-900 text-white text-center p-2 rounded text-sm md:text-base font-semibold mb-6">
                        सेवा क्र. ५ {serviceDescription}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Aadhar Card Upload */}
                        <div className="space-y-2">
                            <label className="flex items-start text-sm font-medium text-gray-700">
                                <span className="text-red-500 mr-1">*</span>
                                ओळखपत्र
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    className="hidden"
                                    id="aadharCard"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                                <label
                                    htmlFor="aadharCard"
                                    className="flex items-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors group"
                                >
                                    <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-1 text-sm text-gray-500">
                                        <span className="font-medium">Choose from files</span>
                                        <p className="text-xs">PDF, JPG, JPEG or PNG (max. 2MB)</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* PAN Card Upload */}
                        <div className="space-y-2">
                            <label className="flex items-start text-sm font-medium text-gray-700">
                                <span className="text-red-500 mr-1">*</span>
                                इतर कागद पत्रे
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    className="hidden"
                                    id="panCard"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                                <label
                                    htmlFor="panCard"
                                    className="flex items-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors group"
                                >
                                    <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-1 text-sm text-gray-500">
                                        <span className="font-medium">Choose from files</span>
                                        <p className="text-xs">PDF, JPG, JPEG or PNG (max. 2MB)</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Signature Upload */}
                        <div className="space-y-2 ">
                            <label className="flex items-start text-sm font-medium text-gray-700">
                                <span className="text-red-500 mr-1">*</span>
                                स्वाक्षरी
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    className="hidden"
                                    id="signature"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                                <label
                                    htmlFor="signature"
                                    className="flex items-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors group"
                                >
                                    <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-1 text-sm text-gray-500">
                                        <span className="font-medium">Choose from files</span>
                                        <p className="text-xs">PDF, JPG, JPEG or PNG (max. 2MB)</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* etc Upload */}
                        <div className="space-y-2">
                            <label className="flex items-start text-sm font-medium text-gray-700">
                                <span className="text-red-500 mr-1">*</span>
                                इतर कागद पत्रे
                            </label>
                            <div className="relative">
                                <input type="file" className="hidden" id="etcitem" accept=".pdf,.jpg,.jpeg,.png" />
                                <label htmlFor="etcitem" className="flex items-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors group">
                                    <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 text-sm text-gray-500">
                                        <span className="font-medium">Choose from files</span>
                                        <p className="text-xs">PDF, JPG, JPEG or PNG (max. 2MB)</p>
                                    </div>
                                </label>
                            </div>
                        </div>


                        {/* File Upload Guidelines */}
                        <div className="md:col-span-2 mt-4 bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-medium text-blue-800 mb-2">
                                फाइल अपलोड मार्गदर्शक सूचना:
                            </h3>
                            <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                                <li>फाइल साइज 2MB पेक्षा कमी असावी</li>
                                <li>फक्त PDF, JPG, JPEG किंवा PNG फॉरमॅट स्वीकारले जातील</li>
                                <li>कागदपत्रे स्पष्ट आणि वाचनीय असावीत</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadForm5;
